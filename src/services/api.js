import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const forceDemoMode = import.meta.env.VITE_FORCE_DEMO_MODE === 'true';

// Validate that environment variables are genuinely present
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !forceDemoMode
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

/**
 * Fetch the exact registration count from Supabase using the secure RPC function.
 * If the table exists but RPC is not set up, it falls back to count: 'exact'.
 * If Supabase is unconfigured or unreachable, it falls back to Demo Mode count.
 */
export async function getRegistrationCount() {
  if (!isSupabaseConfigured || !supabase) {
    const demoRegistrations = JSON.parse(sessionStorage.getItem('nxtwave_demo_registrations') || '[]');
    return { count: demoRegistrations.length, isDemo: true };
  }

  try {
    // 1. Preferred: Call secure privacy-preserving PostgreSQL function
    const { data, error } = await supabase.rpc('get_registration_count');
    if (!error && typeof data === 'number') {
      return { count: data, isDemo: false };
    }

    // 2. Fallback: select with count: 'exact' and head: true (no body rows returned)
    const { count, error: countErr } = await supabase
      .from('registrations')
      .select('id', { count: 'exact', head: true });

    if (!countErr && typeof count === 'number') {
      return { count, isDemo: false };
    }

    // 3. Fallback to schema cache error check
    if (error?.code === 'PGRST205' || countErr?.code === 'PGRST205') {
      console.warn('Supabase table "registrations" not yet created. Using demo session count.');
      const demoRegistrations = JSON.parse(sessionStorage.getItem('nxtwave_demo_registrations') || '[]');
      return { count: demoRegistrations.length, isDemo: true, schemaPending: true };
    }

    throw error || countErr;
  } catch (err) {
    console.error('Error fetching registration count from Supabase:', err);
    const demoRegistrations = JSON.parse(sessionStorage.getItem('nxtwave_demo_registrations') || '[]');
    return { count: demoRegistrations.length, isDemo: true, error: err.message };
  }
}

/**
 * Trigger n8n Webhook with student registration payload
 * Supports both test URL and production URL automatically
 */
async function triggerN8nWebhook(payload) {
  const configuredUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  if (!configuredUrl) return;

  // Build candidate URLs (configured URL, and automatic production/test alternatives)
  const candidateUrls = [configuredUrl];
  if (configuredUrl.includes('/webhook-test/')) {
    candidateUrls.push(configuredUrl.replace('/webhook-test/', '/webhook/'));
  } else if (configuredUrl.includes('/webhook/')) {
    candidateUrls.push(configuredUrl.replace('/webhook/', '/webhook-test/'));
  }

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log(`✅ n8n webhook successfully triggered at: ${url}`);
        return;
      }
    } catch (err) {
      console.warn(`n8n webhook attempt note for ${url}:`, err.message);
    }
  }
}

/**
 * Submit student registration directly to Supabase PostgreSQL and trigger live n8n workflow.
 * Strict duplicate prevention is enforced via the unique_normalized_email constraint.
 */
export async function registerStudent(registrationData) {
  const normalizedEmail = (registrationData.email || '').trim().toLowerCase();

  const parsedGradYear = parseInt(registrationData.graduationYear, 10);
  const fullNameClean = (registrationData.fullName || '').trim();

  // Supabase PostgreSQL schema payload
  const dbPayload = {
    full_name: fullNameClean,
    email: (registrationData.email || '').trim(),
    college: (registrationData.college || '').trim(),
    branch: registrationData.branch,
    graduation_year: isNaN(parsedGradYear) ? 2025 : parsedGradYear,
  };

  // n8n expected payload (providing both camelCase & snake_case for n8n JS node compatibility)
  const n8nPayload = {
    name: fullNameClean,
    fullName: fullNameClean,
    full_name: fullNameClean,
    email: dbPayload.email,
    college: dbPayload.college,
    branch: dbPayload.branch,
    graduationYear: dbPayload.graduation_year,
    graduation_year: dbPayload.graduation_year,
    referralCode: registrationData.referralCode || '',
  };

  // 1. Submit to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('registrations')
      .insert([dbPayload]);

    if (error) {
      if (error.code === '23505' || error.message?.toLowerCase().includes('unique')) {
        throw new Error('This email is already registered for the workshop.');
      }
      if (error.code === 'PGRST205') {
        throw new Error('Database table "registrations" not found. Please execute supabase/schema.sql in your Supabase SQL Editor.');
      }
      throw new Error(error.message || 'Failed to complete registration.');
    }

    // Trigger n8n webhook asynchronously upon successful registration
    triggerN8nWebhook(n8nPayload).catch(console.error);

    return {
      success: true,
      isDemo: false,
      data: { email: dbPayload.email }
    };
  }

  // 2. Demo Mode Fallback: Use sessionStorage to simulate duplicate check and counting
  const stored = JSON.parse(sessionStorage.getItem('nxtwave_demo_registrations') || '[]');
  const isDuplicate = stored.some(r => r.email.toLowerCase() === normalizedEmail);

  if (isDuplicate) {
    throw new Error('This email is already registered for the workshop.');
  }

  stored.push({ ...dbPayload, id: `demo-${Date.now()}` });
  sessionStorage.setItem('nxtwave_demo_registrations', JSON.stringify(stored));

  // Trigger n8n webhook even in demo fallback
  triggerN8nWebhook(n8nPayload).catch(console.error);

  return {
    success: true,
    isDemo: true,
    data: { id: `demo-${Date.now()}` }
  };
}

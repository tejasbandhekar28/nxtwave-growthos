-- ==============================================================================
-- NxtWave GrowthOS — Fix Row-Level Security (RLS) Policies
-- Workshop: "Build Your First AI Project in 60 Minutes"
-- ==============================================================================

-- 1. Ensure table exists
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    normalized_email VARCHAR(255) GENERATED ALWAYS AS (LOWER(TRIM(email))) STORED,
    college VARCHAR(255) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    graduation_year INTEGER NOT NULL CHECK (graduation_year BETWEEN 2024 AND 2028),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Unique Email Constraint (prevents duplicates)
ALTER TABLE public.registrations
    DROP CONSTRAINT IF EXISTS unique_normalized_email;
ALTER TABLE public.registrations
    ADD CONSTRAINT unique_normalized_email UNIQUE (normalized_email);

-- 3. Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 4. Clean up any previous conflicting policies
DROP POLICY IF EXISTS "Allow public registration insert" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.registrations;
DROP POLICY IF EXISTS "Allow public insert" ON public.registrations;
DROP POLICY IF EXISTS "Allow anon insert" ON public.registrations;

-- 5. Create Permissive INSERT Policy for anon and authenticated users
CREATE POLICY "Allow public registration insert"
    ON public.registrations
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK (true);

-- 6. Grant INSERT permissions on table and sequence
GRANT INSERT ON public.registrations TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 7. Secure Function to Read Aggregate Count
CREATE OR REPLACE FUNCTION public.get_registration_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT COUNT(*)::integer FROM public.registrations;
$$;

GRANT EXECUTE ON FUNCTION public.get_registration_count() TO anon, authenticated, public;

-- 8. Realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'registrations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.registrations;
  END IF;
END $$;

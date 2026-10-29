# NxtWave GrowthOS — Live Registration Landing Page

A dedicated, responsive landing page for the NxtWave Growth Challenge promoting the free workshop: **“Build Your First AI Project in 60 Minutes”**.

Built using **React + Vite** with a **Neumorphic (Soft UI)** design system and a **live-updating Supabase Realtime registration counter**.

---

## Features

1. **Focused Landing Page Architecture:**
   - **Navbar:** Sticky header with NxtWave GrowthOS branding, section navigation, and 1-click CTA.
   - **Hero Section:** High-converting hero copy, 3 benefit badges (*100% Free Workshop*, *Beginner Friendly*, *Hands-on AI Learning*), and floating Neumorphic cards.
   - **Live Registration Counter:** Real-time database count, progress bar toward the 500-student goal, and active live connection indicator.
   - **What You'll Learn & Build:** 4 curriculum cards covering AI Fundamentals, practical project building, and hands-on LLM exploration.
   - **Student Registration Form:** Accessible form fields, input validation, email duplicate prevention at the PostgreSQL database level, loading states, and celebratory confetti.
   - **Final CTA & Footer:** Direct jump to registration with copyright and section anchors.

2. **Security & Privacy:**
   - **Zero Public Access to Personal Info:** Anonymous visitors can only query the aggregate registration count via a Postgres `SECURITY DEFINER` function (`get_registration_count()`). Student names, emails, and colleges are never readable by anonymous users.
   - **Database-Level Duplicate Prevention:** Unique constraint on `LOWER(TRIM(email))` prevents race conditions and spam submissions.
   - **No Secret Keys in Frontend:** Uses exclusively the client-side public anon key.

3. **Realtime & Fallback:**
   - Subscribes to Supabase Realtime table events to automatically increment the counter whenever a new student registers.
   - Includes a 10-second polling fallback to guarantee consistency even through network interruptions.

---

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create or edit your `.env` file (copied from `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Database Setup

1. Open your Supabase Dashboard: [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Open and run [`supabase/schema.sql`](file:///Users/tejasbandhekar/Documents/MCA%20/NxtWave%20GrowthOS/supabase/schema.sql).
4. This script sets up:
   - `public.registrations` table.
   - Unique constraint on `normalized_email`.
   - Row Level Security (RLS) allowing public inserts.
   - Privacy-safe `get_registration_count()` function.
   - Realtime publication on `public.registrations`.

---

## Vercel Deployment

1. Push your code to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repository.
3. Set the Environment Variables in project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**.

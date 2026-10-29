# Supabase Database Setup Guide

This project uses **Supabase PostgreSQL** for real-time registration storage, strict duplicate prevention, and referral leaderboard computations.

## Prerequisites
1. Create a free Supabase project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab in your Supabase dashboard.

## Setup Steps

1. Copy the contents of `supabase/schema.sql` and run it in the SQL Editor.
2. The schema creates:
   - `registrations` table with unique constraint on `normalized_email` (`LOWER(TRIM(email))`).
   - Unique constraint on `referral_code`.
   - Optimized indexes for analytics and channel attribution.
   - Row Level Security (RLS) policies allowing secure public inserts while protecting private contact details.
   - `get_referral_leaderboard()` function for referral counting based exclusively on confirmed registrations.

3. Obtain your Project API Credentials:
   - In Supabase, go to **Project Settings** > **API**.
   - Copy **Project URL** (`https://<project-ref>.supabase.co`).
   - Copy **anon public** key (`eyJhbGci...`).
   - **Never copy or use the `service_role` key in frontend client code.**

4. Add them to your `.env` file (copied from `.env.example`):
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. When configured, the application automatically switches from **Demo Mode** to **Live Mode**.

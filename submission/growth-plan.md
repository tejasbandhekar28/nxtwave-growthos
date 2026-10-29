# NxtWave Growth Plan: 500 Final-Year Engineers in 7 Days

**Workshop:** *“Build Your First AI Project in 60 Minutes”*  
**Target Goal:** 500 Confirmed Registrations  
**Duration:** 7-Day Sprint  
**Total Proposed Budget:** ₹2,000 INR  

---

### Slide 1: Executive Summary & The Problem
- **Target Audience:** Final-year (Class of 2025/2026) B.Tech/B.E. engineering students across Tier-1 and Tier-2 engineering colleges (VNR VJIET, CBIT, Vasavi, GRIET, etc.).
- **Urgent Problem:** Placement season is active. Engineering students possess theoretical coding fundamentals but lack verifiable, hands-on Generative AI / LLM portfolio projects on their resumes.
- **The Value Proposition:** A high-impact, zero-fluff 60-minute workshop where students write real code, connect LLM APIs, and deploy their first working AI application live.

---

### Slide 2: Acquisition Architecture & Channel Strategy
To achieve 500 registrations within a lean ₹2,000 budget, we rely on high-trust distribution and viral compounding:
1. **College Coding Clubs & Campus Reps (Target: 150+ students, ₹150 poster/creative spend):**
   - Direct outreach through official coding clubs, ACM/IEEE student chapters, and WhatsApp class representatives.
   - High conversion rate (>25%) due to existing peer trust.
2. **Viral Student Referral Engine (Target: 120+ students, ₹0 CPA):**
   - Instant unique referral code generated upon confirmation.
   - 1-click WhatsApp share links with pre-formatted invite text.
   - Achieves an average viral multiplier ($K \approx 2.71$).
3. **Engineering Student Communities (Target: 70+ students, ₹0 CPA):**
   - Organic AMAs and project breakdowns in active Discord, Telegram, and WhatsApp placement preparation groups.
4. **Targeted Micro-Paid Promotion (Target: 60+ students, ₹800 allocated):**
   - Hyper-targeted Meta & LinkedIn ads restricted to a 25km radius around key engineering campuses, targeting final-year CS/IT/ECE students.
5. **Direct / Organic Outreach (Target: ~50 students):**
   - Campus brand word of mouth and direct student-to-student sharing.

---

### Slide 3: Growth Funnel & Mathematical Model
- **Campaign Impressions / Reach:** ~5,000 targeted engineering students
- **Click-Through / Landing Page Visitors:** ~1,250 visitors (25% CTR)
- **Form Initiations:** ~420 students (33.6% intent)
- **Confirmed Registrations:** 500 students (including viral referral uplift)
- **Required Velocity:**
  $$\text{Required Daily Registrations} = \frac{\max(500 - \text{Confirmed}, 0)}{\text{Remaining Days}}$$
  - At Day 5 (342 confirmed), required pace is $\approx 79 \text{ students/day}$ over the final 2 days.

---

### Slide 4: Budget Allocation & Cost Accounting (₹2,000)
- **₹800 (40%):** Paid promotion sprint testing high-converting hooks on LinkedIn/Meta.
- **₹200 (10%):** WhatsApp creative banners, digital badges, and physical club noticeboard posters.
- **₹1,000 (50%):** Performance reserve — locked until Day 6. Deployed only if a registration gap exceeding 50 students remains.
- **Blended CPA Target:** Under ₹4.00 per confirmed student registration.

---

### Slide 5: Measurement, Fraud Prevention & Risk Mitigation
- **Strict Database Integrity:** Enforce unique normalized emails (`LOWER(TRIM(email))`) in Supabase PostgreSQL to prevent inflated registration numbers.
- **Self-Referral Prevention:** Disallow matching referrer and referee codes during registration.
- **Show-up Rate Protection:** Mitigate attrition through automated calendar invitations and WhatsApp reminder sequences at 24 hours, 2 hours, and 15 minutes before the session.


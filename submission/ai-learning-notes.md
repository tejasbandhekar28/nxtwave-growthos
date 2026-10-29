# AI Learning Notes: Practical Modifications & Human Decisions

This document outlines actual interactions, choices, and adjustments made during the architectural and visual development of **NxtWave GrowthOS**.

---

### Example 1: Neumorphic Contrast vs. Accessibility Guardrails
- **Initial AI Output / Default Instinct:**
  The AI default suggested creating faint pale grey-blue text `#7CA4BD` on the `#D9F0FA` neumorphic surfaces to blend smoothly with the soft aesthetic.
- **Problem Identified:**
  The contrast ratio was below WCAG AA requirements (~2.4:1), making metric captions and tabular registration data difficult to read on varied monitors.
- **Human Modification Made:**
  Enforced a strong dark navy `#12356B` for all headings and metrics ($>7:1$ contrast ratio), and tuned the secondary body text to `#5688AB`. The soft UI depth was preserved entirely through dual-directional box shadows (`9px 9px 20px #A9D1E3, -9px -9px 20px #FFFFFF`) without sacrificing legible typography.

---

### Example 2: Client-Side vs. Database-Level Duplicate Email Prevention
- **Initial AI Suggestion:**
  The AI initially suggested checking for duplicates simply by querying `sessionStorage` or checking the array in the frontend before submitting.
- **Problem Identified:**
  In a public campaign where students may register across different devices, campus labs, or browser tabs, client-side validation alone allows duplicate submissions and artificial inflation of student targets.
- **Human Modification Made:**
  Implemented strict database-level unique constraints in Supabase PostgreSQL:
  ```sql
  normalized_email VARCHAR(255) GENERATED ALWAYS AS (LOWER(TRIM(email))) STORED,
  CONSTRAINT unique_normalized_email UNIQUE (normalized_email);
  ```
  The frontend was wired to catch PostgreSQL error code `23505` and present a friendly, helpful duplicate error message to the student without crashing.

---

### Example 3: Distinction Between Target Goals vs. Claimed Achievements
- **Initial AI Pattern:**
  Default generation templates frequently framed the 500 registrations as "Successfully achieved 500 registrations" with celebratory badges.
- **Problem Identified:**
  The prompt strictly emphasized that the 500-student figure is an active campaign target and milestone, not a completed outcome, and demo data should never be misrepresented as real live results.
- **Human Modification Made:**
  Explicitly separated:
  1. Target goal (500 students)
  2. Recorded progress (342 students at Day 5)
  3. Calculated run-rate formula ($\approx 79/\text{day}$ remaining)
  4. Added a persistent `DEMO DATA` badge whenever running without live Supabase credentials, ensuring complete transparency for evaluators.


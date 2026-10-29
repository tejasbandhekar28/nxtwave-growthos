# n8n Automation Architecture & Workflows

## Existing Preserved Workflow
Your primary local registration workflow remains intact:
- **Webhook Endpoint**: `POST: nxtwave-register`
- **Validation Node**: JavaScript code evaluating email formatting, graduation year, and required student fields.
- **Conditional Branch**: `IF` (valid vs. invalid payload)
- **Response**: Immediate structured JSON reply (`200 OK` or `400 Bad Request`).

### Local vs Production Connectivity
> **Important**: A browser running on a user's machine can contact `http://localhost:5678` locally. However, once the frontend is hosted on **Vercel** (HTTPS), browser security and cloud isolation prevent it from accessing `localhost:5678` directly.

To link the live Vercel frontend with your local n8n instance:
1. **Option A (Local Testing Tunnel)**: Run a secure HTTPS tunnel:
   ```bash
   npx localtunnel --port 5678
   # Or using ngrok:
   ngrok http 5678
   ```
   Set `VITE_N8N_WEBHOOK_URL=https://<your-tunnel-domain>/webhook/nxtwave-register` in your environment.
2. **Option B (Hosted Cloud n8n)**: Deploy n8n on a secure cloud VM or n8n cloud, and use its persistent HTTPS webhook URL.

---

## Additional Workflows Provided
In `n8n/workflows/`, you will find two ready-to-import workflow definitions:

1. **`daily-campaign-summary.json`**:
   - Triggers automatically every 24 hours at midnight.
   - Queries confirmed registrations from Supabase.
   - Computes remaining registration count, daily pace, and referral share.
   - Produces a daily growth alert.

2. **`referral-analytics-sync.json`**:
   - Runs every 4 hours.
   - Aggregates verified student champions who referred at least one confirmed peer.
   - Computes real-time ranks without exposing private contact info.


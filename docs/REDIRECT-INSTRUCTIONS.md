# Redirect Setup Instructions for Max

## Overview
Set up redirects so that domino-dev.benabraham.ai points to the waitlist page while keeping the game accessible for internal development.

---

## Required Configuration

### 1. Main Domain Redirect
**domino-dev.benabraham.ai** → **comojugardomino.com/es/waitlist**

- Type: 302 (Temporary Redirect)
- This allows us to easily change the redirect target or remove it when we're ready to launch

### 2. Keep Game Accessible
The DominoLive game should remain accessible at:
**domino-dev.benabraham.ai/play**

This subpath should NOT redirect — it should continue to serve the game as it does now.

---

## Implementation Options

### Option A: Cloudflare Page Rules (if using Cloudflare)
1. Go to domino-dev.benabraham.ai domain in Cloudflare dashboard
2. Add a Page Rule:
   - URL pattern: `domino-dev.benabraham.ai/`
   - Setting: Forwarding URL (302 - Temporary Redirect)
   - Destination URL: `https://comojugardomino.com/es/waitlist`
3. Make sure the rule does NOT match `/play/*` paths

### Option B: Nginx Configuration
```nginx
server {
    server_name domino-dev.benabraham.ai;
    
    # Redirect root to waitlist
    location = / {
        return 302 https://comojugardomino.com/es/waitlist;
    }
    
    # Keep /play accessible
    location /play {
        # ... existing game configuration ...
    }
}
```

### Option C: Vercel/Netlify Redirects
In `vercel.json` or `netlify.toml`:

**vercel.json:**
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "https://comojugardomino.com/es/waitlist",
      "statusCode": 302
    }
  ]
}
```

**netlify.toml:**
```toml
[[redirects]]
  from = "/"
  to = "https://comojugardomino.com/es/waitlist"
  status = 302
```

---

## Important Notes

1. **Use 302, not 301**: A 302 (temporary) redirect is easier to undo. 301s get cached by browsers and are hard to reverse.

2. **Test /play**: After setting up, verify that domino-dev.benabraham.ai/play still works correctly for internal testing.

3. **When ready to launch**: Simply remove the redirect rule to make the main game available again.

---

## Waitlist API Note

The comojugardomino.com site is statically exported, so the `/api/waitlist` endpoint won't work in the static deployment. You'll need one of these solutions:

### Option 1: Cloudflare Worker (Recommended)
Create a simple Cloudflare Worker at `comojugardomino.com/api/waitlist` that stores emails in Cloudflare KV or D1 database.

### Option 2: External Service
Use a service like:
- **Formspree** (free tier available)
- **Airtable** (form submission webhook)
- **ConvertKit** (waitlist/email list)
- **Google Forms** embedded or API

### Option 3: Change to Serverless Deployment
Remove `output: "export"` from `next.config.mjs` and deploy to Vercel or Cloudflare Pages with Functions enabled.

---

Let me know if you need help implementing any of these options!

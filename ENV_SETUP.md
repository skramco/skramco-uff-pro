# Environment Variables Setup

This project requires the following environment variables to be configured.

## Required Environment Variables

### Resend API Key

The application uses [Resend](https://resend.com) to send email notifications when broker applications are submitted.

1. Sign up for a free account at https://resend.com
2. Generate an API key from your dashboard
3. Add the following to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_api_key_here
```

## Setup Instructions

1. Create a `.env.local` file in the root of your project:
   ```bash
   touch .env.local
   ```

2. Add your Resend API key:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key
   ```

3. Update the email recipient in `app/api/send-broker-application/route.ts`:
   ```typescript
   to: ['your-actual-email@uff.loans'], // Change this to your actual email
   ```

4. Restart your development server:
   ```bash
   pnpm dev
   ```

## Netlify Deployment

When deploying to Netlify, add the environment variable in your Netlify dashboard:

1. Go to Site Settings → Environment Variables
2. Add `RESEND_API_KEY` with your API key value
3. Redeploy your site

## Netlify Forms

Netlify Forms is automatically configured in the form with:
- `data-netlify="true"` attribute
- `name="broker-application"` attribute
- Hidden form-name field

Form submissions will appear in your Netlify dashboard under Forms.

## Email Configuration

The email is sent from: `applications@uff.loans`

**Important:** You need to verify this domain in your Resend dashboard before emails will be sent. Alternatively, use Resend's testing domain for development.

## Testing

To test the form submission:
1. Fill out the form at `/get-approved`
2. Complete the CAPTCHA
3. Submit the form
4. Check:
   - Netlify dashboard for form submission
   - Your email inbox for the notification
   - Browser console for any errors

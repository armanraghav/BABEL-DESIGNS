# Babel Essence Design

A Vite + React + TypeScript storefront for Babel Designs.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- React Query
- Supabase

## Local Development

```sh
npm install
npm run dev
```

## Build and Test

```sh
npm run lint
npm run test
npm run build
```

## Supabase Setup

This project uses Supabase for:

- Catalog data (`collections`, `products`)
- Consultancy submissions (`consultancy_requests`)
- Cart checkout requests (`orders`, `order_items`)
- Newsletter subscriptions (`studio_dispatch_subscribers`)
- Payments via Razorpay (`orders`, `order_items`)

### 1. Environment variables

Copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. Database schema

Run these scripts in Supabase SQL Editor:

1. `supabase/schema.sql`
2. `supabase/seed.sql` (optional sample data)

### 3. Deploy edge function for subscribe emails

Use Supabase CLI:

```sh
supabase functions deploy send-studio-dispatch-confirmation
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set STUDIO_DISPATCH_FROM_EMAIL="Babel Designs <hello@yourdomain.com>"
supabase secrets set STUDIO_DISPATCH_REPLY_TO="yourgmail@gmail.com"
```

Notes:
- `RESEND_API_KEY` is required for auto-generated confirmation emails.
- `STUDIO_DISPATCH_FROM_EMAIL` is optional. If omitted, it falls back to `onboarding@resend.dev`.
- `STUDIO_DISPATCH_REPLY_TO` is optional. Set this to your Gmail if you want user replies in Gmail.
- For Gmail deliverability, keep `STUDIO_DISPATCH_FROM_EMAIL` on a verified custom domain (not `@gmail.com`).

### 4. Start the app

```sh
npm run dev
```

If env vars are missing, catalog pages fall back to local demo data. Checkout and consultancy submission require Supabase configuration.

## Razorpay Setup

### 1. Frontend env

Set this in `.env`:

- `VITE_RAZORPAY_KEY_ID`

### 2. Supabase Edge Function secrets

Set these in your Supabase project:

```sh
supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxxx
supabase secrets set RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Deploy payment functions

```sh
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
supabase functions deploy mark-order-payment-failed
supabase functions deploy razorpay-webhook
```

### 4. Apply latest schema

Run `supabase/schema.sql` again in SQL Editor so the `orders` table includes payment columns.

### 5. Configure webhook in Razorpay dashboard

- Webhook URL: `https://<your-project-ref>.functions.supabase.co/razorpay-webhook`
- Events: `payment.captured`, `payment.failed`
- Secret: set and keep same value in Supabase:

```sh
supabase secrets set RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

## Admin Dashboard Setup

Deploy admin API function:

```sh
supabase functions deploy admin-dashboard
supabase functions deploy admin-update-order-status
supabase functions deploy admin-manage-catalog
supabase secrets set ADMIN_DASHBOARD_TOKEN=your_strong_admin_token
```

Then open `/admin` and enter the same token.

## Analytics Setup

Set optional analytics env vars in `.env`:

- `VITE_POSTHOG_KEY`
- `VITE_POSTHOG_HOST` (optional, default `https://app.posthog.com`)
- `VITE_GA_MEASUREMENT_ID`

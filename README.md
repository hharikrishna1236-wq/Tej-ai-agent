# TEJ AI

Personal AI assistant dashboard for TEJ WEB STUDIO.
Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase (Auth, Postgres, Storage).

## Status
- Step 2: dashboard UI: done
- Step 3: Supabase auth, chat history, profile, settings: done
- AI replies (OpenAI): not connected yet (Step 4)

## Run locally
1. `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in the values.
3. `npm run dev`, then open http://localhost:3000

## Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (publishable key)
- `NEXT_PUBLIC_SITE_URL`

Never commit `.env.local` or any secret key.

## Database
SQL is in `supabase/migrations/`. Run once in the Supabase SQL Editor.
`supabase/tests/rls_isolation_test.sql` is an optional security test.

## Deploy (Netlify)
Build command `npm run build`. Leave "Publish directory" empty. Add the 3 environment variables above.

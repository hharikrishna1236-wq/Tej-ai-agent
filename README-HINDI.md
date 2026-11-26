# TEJ AI: kaise chalaye (aasan steps)

## Step A. Supabase tables (AAPKE PROJECT MEIN PEHLE SE BAN CHUKI HAIN, ise skip karo)
1. supabase.com par login karo, apna project kholo.
2. Left menu mein "SQL Editor" dabao.
3. `supabase/migrations/20261126000001_tej_ai_core.sql` file kholo, pura copy karo, SQL Editor mein paste karo, "Run" dabao.
4. Phir `20261126000002_tej_ai_avatars_storage.sql` ke saath bhi yahi karo.

## Step B. Supabase mein website ka address do
Authentication -> URL Configuration:
- Site URL: https://aiagent.netlify.app
- Redirect URLs mein add karo: https://aiagent.netlify.app/auth/callback

## Step C. Netlify mein 3 settings daalo
Site configuration -> Environment variables:
- NEXT_PUBLIC_SUPABASE_URL = https://ncpxwalevafzzpkyaeny.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY = (aapki sb_publishable_ wali key)
- NEXT_PUBLIC_SITE_URL = https://aiagent.netlify.app

Build settings mein "Publish directory" KHALI rakho.

## Step D. Files GitHub par daalo
Is folder ki saari files apne GitHub repo mein upload karo (purani files replace ho jayengi).
Netlify apne aap naya deploy karega. 2 se 4 minute baad https://aiagent.netlify.app kholo.

## Step E. Apna account banao
/signup par account banao. Phir Supabase -> Authentication -> Sign In / Providers mein
"Allow new users to sign up" band kar do, taki aur koi account na bana sake.

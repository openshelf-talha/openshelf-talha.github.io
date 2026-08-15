# OpenShelf Private Studio

- No public navigation link.
- `admin.html` and `studio.html` are `noindex,nofollow`.
- Login requires Supabase Auth email/password.
- Login also requires the user UUID to exist in `public.admin_users`.
- Apps table writes and Storage upload/update/delete are protected with RLS.
- Never put a service-role key in the browser.

## One-time setup
1. In Supabase Authentication > Users, use/create your admin account.
2. Copy its UUID.
3. Run `SUPABASE-ADMIN-SECURITY.sql` in SQL Editor, replacing `YOUR_USER_UUID` in the INSERT.
4. Keep the `apps` bucket public only if public downloads are intended; file writes remain admin-only.
5. Deploy this folder to GitHub Pages. Open `/studio.html` directly when you need the Studio.

Hiding the URL is not the security boundary; Supabase Auth + RLS is.

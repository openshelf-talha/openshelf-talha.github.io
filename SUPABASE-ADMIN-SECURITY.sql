-- OpenShelf Private Admin Studio security
create table if not exists public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz not null default now());
alter table public.admin_users enable row level security;
drop policy if exists "admins can read own admin record" on public.admin_users;
create policy "admins can read own admin record" on public.admin_users for select to authenticated using (user_id = auth.uid());
-- After creating your Auth user, run: insert into public.admin_users(user_id) values ('YOUR_USER_UUID');

alter table public.apps enable row level security;
drop policy if exists "public can read apps" on public.apps;
create policy "public can read apps" on public.apps for select using (true);
drop policy if exists "admins can insert apps" on public.apps;
create policy "admins can insert apps" on public.apps for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
drop policy if exists "admins can update apps" on public.apps;
create policy "admins can update apps" on public.apps for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = auth.uid())) with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
drop policy if exists "admins can delete apps" on public.apps;
create policy "admins can delete apps" on public.apps for delete to authenticated using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

drop policy if exists "admins can upload app files" on storage.objects;
create policy "admins can upload app files" on storage.objects for insert to authenticated with check (bucket_id = 'apps' and exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
drop policy if exists "admins can update app files" on storage.objects;
create policy "admins can update app files" on storage.objects for update to authenticated using (bucket_id = 'apps' and exists (select 1 from public.admin_users a where a.user_id = auth.uid())) with check (bucket_id = 'apps' and exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
drop policy if exists "admins can delete app files" on storage.objects;
create policy "admins can delete app files" on storage.objects for delete to authenticated using (bucket_id = 'apps' and exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

-- Run this in the Supabase SQL editor.
-- It adds the tables and Row Level Security policies used by the website.

create table if not exists public."Residents" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  unit text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

create table if not exists public."Insurance" (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  period text not null,
  amount text not null,
  deadline text not null,
  contact text not null,
  created_at timestamptz not null default now()
);

create table if not exists public."Maintenance" (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  time text not null,
  number text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.building (
  id uuid primary key default gen_random_uuid(),
  building text not null,
  committee text not null,
  manager_name text not null,
  manager_phone text not null,
  manager_email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public."Residents" enable row level security;
alter table public."Insurance" enable row level security;
alter table public."Maintenance" enable row level security;
alter table public.building enable row level security;
alter table public.contact_requests enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Users can view their admin status" on public.admin_users;
create policy "Users can view their admin status"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Authenticated users can view residents" on public."Residents";
create policy "Authenticated users can view residents"
on public."Residents"
for select
to authenticated
using (true);

drop policy if exists "Anyone can view insurance" on public."Insurance";
create policy "Anyone can view insurance"
on public."Insurance"
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage residents" on public."Residents";
create policy "Admins can manage residents"
on public."Residents"
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can manage insurance" on public."Insurance";
create policy "Admins can manage insurance"
on public."Insurance"
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can view maintenance" on public."Maintenance";
create policy "Anyone can view maintenance"
on public."Maintenance"
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage maintenance" on public."Maintenance";
create policy "Admins can manage maintenance"
on public."Maintenance"
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can view building info" on public.building;
create policy "Anyone can view building info"
on public.building
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage building info" on public.building;
create policy "Admins can manage building info"
on public.building
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can submit contact requests" on public.contact_requests;
create policy "Anyone can submit contact requests"
on public.contact_requests
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can manage contact requests" on public.contact_requests;
create policy "Admins can manage contact requests"
on public.contact_requests
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- After creating your Supabase Auth user, promote it with:
-- insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_ID');

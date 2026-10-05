create type public.app_role as enum ('admin','moderator','user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id=_user_id and role=_role) $$;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create table public.stream_events (
  id bigint generated always as identity primary key,
  channel_id text not null check (char_length(channel_id) between 1 and 100),
  channel_name text check (channel_name is null or char_length(channel_name) <= 120),
  session_id text not null check (char_length(session_id) between 8 and 64),
  event text not null check (event in ('start','ok','fail','buffer','heartbeat')),
  value_ms integer check (value_ms is null or (value_ms >= 0 and value_ms <= 600000)),
  created_at timestamptz not null default now()
);
create index stream_events_created_idx on public.stream_events (created_at desc);
create index stream_events_channel_idx on public.stream_events (channel_id, created_at desc);
grant insert on public.stream_events to anon, authenticated;
grant select on public.stream_events to authenticated;
grant all on public.stream_events to service_role;
alter table public.stream_events enable row level security;
create policy "Anyone can report stream events" on public.stream_events for insert to anon, authenticated with check (true);
create policy "Admins read stream events" on public.stream_events for select to authenticated using (public.has_role(auth.uid(),'admin'));

create or replace function public.stream_health_summary(_hours integer default 24)
returns table (channel_id text, channel_name text, viewers_now bigint, starts bigint, ok bigint, fails bigint, buffer_events bigint, buffer_ms bigint, avg_start_ms numeric, last_seen timestamptz)
language plpgsql stable security definer set search_path = public
as $$
begin
  if not public.has_role(auth.uid(),'admin') then raise exception 'not authorized'; end if;
  return query
  select e.channel_id,
    max(e.channel_name),
    count(distinct e.session_id) filter (where e.created_at > now() - interval '90 seconds' and e.event in ('heartbeat','ok','buffer')),
    count(*) filter (where e.event='start'),
    count(*) filter (where e.event='ok'),
    count(*) filter (where e.event='fail'),
    count(*) filter (where e.event='buffer'),
    coalesce(sum(e.value_ms) filter (where e.event='buffer'),0)::bigint,
    round(avg(e.value_ms) filter (where e.event='ok')),
    max(e.created_at)
  from public.stream_events e
  where e.created_at > now() - make_interval(hours => least(greatest(_hours,1),168))
  group by e.channel_id
  order by 3 desc, 6 desc;
end $$;
revoke execute on function public.stream_health_summary(integer) from anon;
grant execute on function public.stream_health_summary(integer) to authenticated;
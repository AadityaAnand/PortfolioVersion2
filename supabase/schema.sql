create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.thought_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  display_date date not null default current_date,
  category text not null check (category in ('Technical', 'Life', 'Fun')),
  tags text[] not null default '{}',
  excerpt text not null,
  content text not null,
  cover_image text,
  body_images text[] not null default '{}',
  read_time text not null default '3 min',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.thought_posts
add column if not exists body_images text[] not null default '{}';

drop trigger if exists set_thought_posts_updated_at on public.thought_posts;
create trigger set_thought_posts_updated_at
before update on public.thought_posts
for each row
execute procedure public.set_updated_at();

create table if not exists public.thought_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.thought_posts(id) on delete cascade,
  author text not null,
  body text not null,
  is_hidden boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.thought_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.thought_posts(id) on delete cascade,
  viewer_token text not null,
  reaction_type text not null check (reaction_type in ('useful', 'interesting', 'curious')),
  created_at timestamptz not null default timezone('utc', now()),
  unique (post_id, viewer_token, reaction_type)
);

alter table public.thought_posts enable row level security;
alter table public.thought_comments enable row level security;
alter table public.thought_reactions enable row level security;

drop policy if exists "Published posts are visible to everyone" on public.thought_posts;
create policy "Published posts are visible to everyone"
on public.thought_posts
for select
to anon, authenticated
using (published = true);

drop policy if exists "Authenticated users can manage thought posts" on public.thought_posts;
create policy "Authenticated users can manage thought posts"
on public.thought_posts
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Visible comments can be read publicly" on public.thought_comments;
create policy "Visible comments can be read publicly"
on public.thought_comments
for select
to anon, authenticated
using (
  is_hidden = false
  and exists (
    select 1
    from public.thought_posts
    where thought_posts.id = thought_comments.post_id
      and thought_posts.published = true
  )
);

drop policy if exists "Public can add comments to published posts" on public.thought_comments;
create policy "Public can add comments to published posts"
on public.thought_comments
for insert
to anon, authenticated
with check (
  char_length(trim(author)) > 0
  and char_length(trim(body)) > 0
  and exists (
    select 1
    from public.thought_posts
    where thought_posts.id = thought_comments.post_id
      and thought_posts.published = true
  )
);

drop policy if exists "Authenticated users can moderate comments" on public.thought_comments;
create policy "Authenticated users can moderate comments"
on public.thought_comments
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Reaction counts are visible publicly" on public.thought_reactions;
create policy "Reaction counts are visible publicly"
on public.thought_reactions
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.thought_posts
    where thought_posts.id = thought_reactions.post_id
      and thought_posts.published = true
  )
);

drop policy if exists "Public can add reactions to published posts" on public.thought_reactions;
create policy "Public can add reactions to published posts"
on public.thought_reactions
for insert
to anon, authenticated
with check (
  char_length(trim(viewer_token)) > 0
  and exists (
    select 1
    from public.thought_posts
    where thought_posts.id = thought_reactions.post_id
      and thought_posts.published = true
  )
);

drop policy if exists "Public can remove reactions from published posts" on public.thought_reactions;
create policy "Public can remove reactions from published posts"
on public.thought_reactions
for delete
to anon, authenticated
using (
  exists (
    select 1
    from public.thought_posts
    where thought_posts.id = thought_reactions.post_id
      and thought_posts.published = true
  )
);

insert into storage.buckets (id, name, public)
values ('thought-covers', 'thought-covers', true)
on conflict (id) do nothing;

drop policy if exists "Thought covers are public" on storage.objects;
create policy "Thought covers are public"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'thought-covers');

drop policy if exists "Authenticated users can upload thought covers" on storage.objects;
create policy "Authenticated users can upload thought covers"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'thought-covers');

drop policy if exists "Authenticated users can update thought covers" on storage.objects;
create policy "Authenticated users can update thought covers"
on storage.objects
for update
to authenticated
using (bucket_id = 'thought-covers')
with check (bucket_id = 'thought-covers');

drop policy if exists "Authenticated users can delete thought covers" on storage.objects;
create policy "Authenticated users can delete thought covers"
on storage.objects
for delete
to authenticated
using (bucket_id = 'thought-covers');

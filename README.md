# Aditya Anand Portfolio

Premium portfolio frontend built with:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase for Thoughts CMS, auth, and storage

## What is in this project

- Premium single-page portfolio
- Resume-backed AI assistant UI
- Case-study style experience and project sections
- Thoughts section backed by Supabase-ready content services
- Private `/admin` route for writing and publishing posts

## Project Structure

```text
src/
  components/
    admin/
    assistant/
    layout/
    sections/
    thoughts/
    ui/
  data/
  lib/
    services/
    supabase/
  pages/
  types/
supabase/
  schema.sql
public/
  assets/
```

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Deploying to Vercel

The frontend is designed for Vercel. The included `vercel.json` keeps `/admin` working by rewriting it back to the SPA entry.

## Supabase Setup

### 1. Create a Supabase project

You will need:

- Project URL
- Anon/public key

Put them in:

- local `.env`
- Vercel project environment variables

Use `.env.example` as the template.

Required env vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET`

### 2. Run the schema

Paste `supabase/schema.sql` into the Supabase SQL editor and run it.

That creates:

- `thought_posts`
- `thought_comments`
- `thought_reactions`
- `thought-covers` storage bucket

### 3. Create your admin user

This app uses Supabase Auth password login in the admin UI.

Recommended setup:

1. Disable public signups in Supabase Auth
2. Create your own user manually from the Supabase dashboard
3. Sign in at `/admin`

That keeps the writing UI private while still letting the public site read published posts.

## Writing Thoughts

Open:

- `/admin`

From there you can:

- sign in
- create a new post
- edit drafts
- publish posts
- upload a cover image
- delete posts

The editor supports:

- title
- slug
- category: `Technical`, `Life`, `Fun`
- excerpt
- tags
- date
- markdown content
- featured toggle
- published toggle

## How the Thoughts data works

### Public site

The public Thoughts section:

- loads published posts from Supabase when configured
- falls back to `src/data/posts.ts` if Supabase is not configured

### Admin

The admin route:

- authenticates with Supabase Auth
- reads all posts from Supabase
- writes drafts and published posts to `thought_posts`
- uploads images to Supabase Storage

### Comments and reactions

The portfolio still has a clean interaction service boundary:

- `src/lib/services/thoughts-service.ts`
- `src/lib/services/supabase-thoughts-service.ts`
- `src/lib/services/local-thoughts-service.ts`

Comments and reactions are wired for Supabase as a starter implementation. If you later want stronger abuse protection or moderation, the next step would be moving public writes behind an Edge Function or serverless API.

## AI Assistant

The assistant is still structured so it can later switch from mock replies to a real API:

- prompts and content in `src/data/assistant.ts`
- reply logic in `src/lib/assistant-service.ts`
- UI in `src/components/assistant/ChatPanel.tsx`

## Legacy Files

The repo still includes the earlier Django portfolio in:

- `core/`
- `contact/`
- `portfoliov2/`

The Vite app at the repo root is the active frontend.

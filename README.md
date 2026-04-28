# Aaditya Anand Portfolio

AI-first portfolio rebuilt with:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion

The current app is designed to position Aaditya as a Forward Deployed Engineer, AI Engineer, and Full Stack / Backend Systems Engineer.

## What is in this project

- Premium single-page portfolio with product-style interaction
- Mock AI assistant UI with clean service boundaries for future API integration
- Story-driven experience and project case studies
- Thoughts / Field Notes section with markdown content
- Reactions and comments architecture, currently backed by `localStorage`
- Clean content layer under `src/data`

## Project Structure

```text
src/
  components/
    assistant/
    layout/
    sections/
    thoughts/
    ui/
  data/
    assistant.ts
    experience.ts
    posts.ts
    projects.ts
    site.ts
    skills.ts
  lib/
    assistant-service.ts
    services/
  pages/
  types/
public/
  assets/
```

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Deploying to GitHub Pages

The site deploys automatically via GitHub Actions on every push to `main`.

Live URL: **https://aadityaanand.github.io/PortfolioVersion2/**

### First-time setup

In the GitHub repo go to **Settings → Pages** and set **Source** to **GitHub Actions** (not "Deploy from a branch"). After that, every push to `main` triggers `.github/workflows/deploy.yml` which builds the Vite app and publishes the `dist/` folder.

### Environment variables

If you later connect Supabase or an AI backend, add these as repository secrets/variables in **Settings → Secrets and variables → Actions**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ASSISTANT_API_URL`

Use `.env.example` as the template.

## Updating Portfolio Content

Most portfolio content lives in `src/data`.

### Main site content

- `src/data/site.ts`
  - hero text
  - nav items
  - contact links
  - story summary

### Experience

- `src/data/experience.ts`
  - story-driven experience entries
  - context / challenge / action / thinking / outcome

### Projects

- `src/data/projects.ts`
  - case studies
  - stack
  - architecture bullets
  - links
  - AI assistant follow-up prompts

### Skills

- `src/data/skills.ts`
  - grouped skill clusters

## Adding Thoughts / Posts

Posts are stored in:

- `src/data/posts.ts`

Each post supports:

- `title`
- `date`
- `category`
- `tags`
- `excerpt`
- `content`
- `coverImage`
- `readTime`

The `content` field is markdown and renders through `react-markdown`.

### Example post shape

```ts
{
  id: "example-post",
  title: "An example note",
  date: "2026-04-27",
  category: "AI Engineering",
  tags: ["ai", "systems"],
  excerpt: "Short summary",
  readTime: "4 min",
  content: `
## Heading

Write markdown here.
  `,
}
```

## Comments and Reactions

The Thoughts reader is already separated behind a service layer:

- `src/lib/services/thoughts-service.ts`
- `src/lib/services/local-thoughts-service.ts`
- `src/lib/services/supabase-thoughts-service.ts`

### Current behavior

- comments are stored in `localStorage`
- reactions are stored in `localStorage`
- this is useful for UI development and interaction design

### Future Supabase integration

Replace the `LocalThoughtsService` usage with a real Supabase-backed implementation.

Suggested future tables:

- `thought_posts`
- `thought_comments`
- `thought_reactions`

Suggested future fields:

- comments: `id`, `post_id`, `author`, `body`, `created_at`, `is_hidden`
- reactions: `id`, `post_id`, `reaction_type`, `session_id`, `created_at`

That leaves room for moderation, delete flows, and basic abuse controls later.

## Future AI Assistant Integration

The assistant UI is intentionally split into:

- prompts and canned replies in `src/data/assistant.ts`
- resolution logic in `src/lib/assistant-service.ts`
- UI in `src/components/assistant/ChatPanel.tsx`

To connect a real backend later:

1. create an API endpoint or serverless function
2. send the prompt from `ChatPanel`
3. replace `getMockAssistantReply()` with a real fetch call
4. optionally build retrieval from:
   - posts
   - projects
   - experience stories
   - skills

The current data model is already structured to support retrieval, prompt assembly, or a future RAG layer.

## Notes on Legacy Files

This repository still contains the previous Django portfolio implementation in legacy folders such as:

- `core/`
- `contact/`
- `portfoliov2/`

The new Vite app is now the primary frontend. Those older files remain in the repo as historical source material and can be removed later if you want to fully clean the project.

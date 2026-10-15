# Coople public jobs

A Next.js application for browsing public job opportunities from Coople.

## Features

- Server-rendered job list with client-side pagination using TanStack Query.
  The Load more button fetches the next page of 30 jobs; duplicate jobs are
  merged by ID.
- Job details with location, pay, shift dates, and requirements.
- Favorites that can be toggled from the list and details pages and are saved
  in browser localStorage.
- Loading, empty, and error states with manual retry actions, including failed
  refreshes of an empty list and a not-found page for upstream HTTP 404 responses.
- Date formatting using the browser locale after mounting.

## Routes and data flow

The server client calls the Coople public jobs API at
`https://www.coople.com/ch/resources/api/work-assignments/public-jobs`.
DTOs describe upstream responses, and mappers convert them into application
models. Fetch requests and the local API route use `no-store`.
No API credentials or environment variables are currently required; loading
jobs requires network access to Coople.

## Requirements and installation

Use Node.js 20.9 or later and npm. Dependencies are pinned in `package-lock.json`.

```bash
npm ci
```

Run commands from the application root (`job-listing/`).

## Development and production

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build and serve the production application:

```bash
npm run build
npm start
```

## Available checks

```bash
npm run typecheck
npm run lint
npm run build
```

The TypeScript check generates Next.js route types before running `tsc --noEmit`.
Linting uses ESLint with the Next.js configuration. The production build also
checks that the application compiles. No automated test suite is configured yet.

## Structure and architecture

The project groups code by feature and keeps shared code at the `src/` level.

- `src/app/` handles routing, server-side data loading, and feature composition.
- Shared components, hooks, contexts, providers, types, utilities, and integrations
  belong in `src/components/`, `src/hooks/`, `src/contexts/`, `src/providers/`,
  `src/types/`, `src/utils/`, and `src/lib/`, respectively.
- Code that belongs to a specific feature stays in `src/features/<feature>/`,
  with local `components/`, `hooks/`, `contexts/`, `providers/`, `types/`, or
  `utils/` directories as needed. A feature provider stays with its feature
  even when it is connected in the root layout.

The project uses TypeScript, the Next.js App Router, React, and TanStack Query.
Component styles use CSS Modules, with Tailwind CSS configured through
Turbopack for global styles. Cache Components, partial prefetching, and the
React Compiler are enabled in `next.config.ts`. Global styles use system fonts
and do not fetch external fonts. The `@/*` import alias resolves to `src/*`.

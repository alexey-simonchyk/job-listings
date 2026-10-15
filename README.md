# Coople public jobs

A Next.js application for browsing public job opportunities from Coople.
The project currently provides a temporary home page and the structure for
future implementation. API integration, data transfer objects, job pages,
and favorites are not implemented.

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

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  features/
    job-list/
      components/
    job-details/
      components/
  components/
  hooks/
  contexts/
  lib/
    coople/
```

- `app/` owns routing, server-side data loading, and feature composition.
- `features/<feature>/` contains code specific to that feature. Add local
  `components/`, `hooks/`, `contexts/`, `types.ts`, `utils.ts`, or other files
  only when needed.
- Top-level `components/`, `hooks/`, and `contexts/` contain shared code only.
- `lib/coople/` is reserved for the shared Coople integration.
- Empty directories are preserved with `.gitkeep` files. No placeholder
  components or abstractions are required.

The project uses TypeScript, the Next.js App Router, and Tailwind CSS through
its existing Turbopack configuration. Global styles use system fonts and do
not fetch external fonts. The `@/*` import alias resolves to `src/*`.

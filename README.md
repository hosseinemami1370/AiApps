# AIFolder (MVP)
Next.js (App Router, SSR) + Tailwind v4. Languages: /en, /fa (RTL).

    npm install && npm run dev        # mock data (default)

## Data source
Set in `.env.local` (see `.env.example`):
- `DATA_SOURCE=mock` — built-in sample data (default)
- `DATA_SOURCE=api` — Java backend described by `openapi.yaml` (`API_BASE_URL`, `API_KEY`)

All data access goes through `src/lib/repo.ts` (switch) → `src/lib/api.ts` (server-side fetch client).
`node scripts/fake-api.mjs` is a tiny stand-in for the Java API (port 8080, key `dev`) for local testing.

## Tests
`npm run test:ssr` (curl, server running) · `npm run test:e2e` · `npm run lighthouse`
Note: blog pages still use mock data (`src/lib/blog.ts`).

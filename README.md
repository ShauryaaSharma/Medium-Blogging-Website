# Medium Blogging Website

coded with hands for practise

A full-stack Medium clone — write, publish, and read blog posts, with JWT auth and a shared validation layer across the frontend and backend.

**Live:** https://c4050f27.medium-frontend-6zs.pages.dev/

## Tech Stack

**Frontend** (`frontend/`)
- React 19 + TypeScript, bundled with Vite
- React Router v7 for client-side routing
- Tailwind CSS v4 for styling
- Axios for API calls
- Deployed on Cloudflare Pages

**Backend** (`backend/`)
- Hono — lightweight web framework running on Cloudflare Workers
- Prisma ORM (`prisma-client` generator, `workerd` runtime) over Neon serverless Postgres, via Prisma Accelerate for connection pooling
- JWT auth (`hono/jwt`) for signup/signin and route protection
- CORS via `hono/cors`
- Deployed with Wrangler to Cloudflare Workers

**Common** (`common/`)
- Shared Zod schemas for request validation (signup, signin, publish/update blog)
- Published to npm as `shaurya-zod-medium`; consumed by both `backend` and `frontend` so validation logic and inferred types stay in sync across the stack

## Project Structure

```
medium/
├── backend/    # Cloudflare Workers API (Hono + Prisma + Neon)
├── common/     # Shared Zod validation schemas (npm package)
└── frontend/   # React + Vite client
```

## Getting Started

Each package is installed and run independently:

```
cd backend && npm install && npm run dev      # Worker on 127.0.0.1:8787
cd frontend && npm install && npm run dev     # Vite on localhost:5173
```

The backend needs a `.env` with `DIRECT_URL` (Neon Postgres) and Cloudflare `vars` for `DATABASE_URL` (Prisma Accelerate) and `JWT_SECRET` — see `backend/wrangler.jsonc`. The frontend reads the API base URL from `VITE_BACKEND_URL`.

## Deployment

- Backend: `npm run deploy` (from `backend/`) — ships to Cloudflare Workers via Wrangler
- Frontend: `npx wrangler pages deploy dist` (from `frontend/`, after `npm run build`) — ships to Cloudflare Pages

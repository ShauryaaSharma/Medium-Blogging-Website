# Medium Blogging Website

A full-stack Medium clone, write, publish, and read blog posts, with JWT auth and a shared validation layer across the frontend and backend.

**Live:** https://c4050f27.medium-frontend-6zs.pages.dev/

## Tech Stack

**Backend** (`backend/`)
- Cloudflare Workers 
- Wrangler 
- Hono 
- Neon Postgres
- Prisma Accelerate
- Prisma ORM 
- JWT 

**Common** (`common/`)
- Zod — shared request validation
- npm published as `shaurya-zod-medium`

**Frontend** (`frontend/`)
- React 19 + TypeScript — Vite
- React Router v7
- Tailwind CSS v4
- Axios
- Cloudflare Pages

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
cd backend && npm install && npm run dev ( OR npx wrangler dev)      # Worker on 127.0.0.1:8787 
cd frontend && npm install && npm run dev                            # Vite on localhost:5173
```

The backend needs a `.env` with `DIRECT_URL` (Neon Postgres) and Cloudflare `vars` for `DATABASE_URL` (Prisma Accelerate) and `JWT_SECRET`, see `backend/wrangler.jsonc`. The frontend reads the API base URL from `VITE_BACKEND_URL`.

## Deployment

- Backend: `npm run deploy` (from `backend/`), ships to Cloudflare Workers via Wrangler
- Frontend: `npx wrangler pages deploy dist` (from `frontend/`, after `npm run build`), ships to Cloudflare Pages

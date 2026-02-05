# Muddy Mug Bakers & Brewers

A website for **Muddy Mug Bakers & Brewers** — a café, bakery, and barista/bakery/bartending
training centre at Mahendra Pool, Pokhara, Nepal.

This is a real business's website, not a template. Where business information (menu
prices, course fees, hours, testimonials, etc.) hasn't been verified yet, the site says so
honestly instead of inventing it — see [Content status](#content-status) below.

## Tech stack

**Frontend** — React 19, Vite, React Router 7, plain CSS with a small design-token system
(`src/styles/tokens.css`). No CSS framework, no component library.

**Backend** — Node.js, Express, MongoDB (Atlas) via Mongoose, JWT-based admin
authentication, bcrypt password hashing, Helmet, rate limiting.

**Testing** — Vitest (backend so far; frontend testing is a planned next step).

## Project structure

```
.
├── src/                      # Frontend (Vite root)
│   ├── api/client.js         # Thin fetch wrapper, used by every page that calls the API
│   ├── components/
│   │   ├── admin/            # Admin-only components (EnquiryList, RequireAdminAuth)
│   │   └── layout/            # Header, Footer, Layout (public site chrome)
│   ├── constants/
│   │   └── placeholderImages.js  # Centralized temporary stock imagery — see below
│   ├── context/               # AdminAuthContext (admin session state)
│   ├── hooks/usePageMeta.js   # Per-page <title> / meta description
│   ├── pages/                 # One file per route
│   └── styles/tokens.css      # Design tokens (colors, type, spacing) — provisional, see below
│
└── backend/
    ├── config/                # env.js (environment config), db.js (Mongoose connection)
    ├── controllers/
    ├── middleware/             # errorHandler, notFound, requireAdminAuth, rate limiters
    ├── models/                 # Admin, Enquiry
    ├── routes/
    ├── validators/             # Hand-rolled input validation (+ Vitest unit tests alongside)
    └── utils/seedAdmin.js      # CLI script to create/update an admin login
```

## Getting started

Prerequisites: Node.js 18+, npm, and a MongoDB Atlas connection string (or local MongoDB).

```bash
# Install both projects' dependencies
npm install
cd backend && npm install && cd ..

# Configure environment variables (see below), then run both dev servers
npm run dev              # frontend — http://localhost:5173
cd backend && npm run dev  # backend — http://localhost:4000
```

The frontend's Vite dev server proxies `/api/*` requests to the backend (see
`vite.config.js`), so no CORS configuration is needed in development.

### Environment variables

Both the frontend and backend read from a local `.env` file (gitignored). Copy the
`.env.example` in each location and fill in real values:

**`backend/.env`** (copy from `backend/.env.example`)

| Variable | Required | Notes |
|---|---|---|
| `PORT` | No | Defaults to `4000` |
| `NODE_ENV` | No | Defaults to `development` |
| `CORS_ORIGIN` | No | Defaults to `http://localhost:5173` |
| `MONGODB_URI` | **Yes** | MongoDB Atlas (or local) connection string. Server refuses to start without it. |
| `JWT_SECRET` | **Yes**, for admin login | Any long random string. Generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `JWT_EXPIRY` | No | Defaults to `7d` |

**`.env`** (root, copy from `.env.example`)

| Variable | Required | Notes |
|---|---|---|
| `VITE_API_URL` | No | Leave empty in development — requests go through the Vite proxy. Set to the deployed backend URL in production. |

## Available scripts

**Frontend** (run from the project root):

| Command | Does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |

**Backend** (run from `backend/`):

| Command | Does |
|---|---|
| `npm run dev` / `npm start` | Start the API server |
| `npm test` | Run the Vitest suite |
| `npm run seed:admin -- <username> <password>` | Create or update an admin login |

## Admin access

There's no public registration — admin accounts only exist via the seed script:

```bash
cd backend
npm run seed:admin -- your-username "a-strong-password"
```

Then sign in at `/admin/login`. The dashboard (`/admin/dashboard`) currently manages
contact-form enquiries: view, change status (new/read/archived), and delete.

## API overview

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/health` | — | Health check |
| POST | `/api/enquiries` | — | Public contact-form submission (rate-limited, honeypot spam check) |
| POST | `/api/admin/auth/login` | — | Admin login, returns a JWT (rate-limited) |
| GET | `/api/admin/auth/me` | Admin JWT | Verify the current session |
| GET | `/api/admin/enquiries` | Admin JWT | List enquiries |
| PATCH | `/api/admin/enquiries/:id/status` | Admin JWT | Update an enquiry's status |
| DELETE | `/api/admin/enquiries/:id` | Admin JWT | Delete an enquiry |

## Content status

This project follows one rule strictly: **no fabricated business information.** Course
fees, durations, certificates, menu prices, business hours, ratings, and testimonials are
never invented. Where real data hasn't been confirmed yet, the corresponding page says so
plainly (e.g. the Menu and Courses pages) instead of showing fake content.

**Placeholder imagery:** pages that need photos currently use temporary stock images from
Unsplash, centralized in `src/constants/placeholderImages.js` and clearly marked as
placeholders in their `alt` text — never presented as real photos of the business. Swapping
in real photography means editing that one file; no page markup needs to change.

**Design tokens:** the color palette and typography in `src/styles/tokens.css` are a
reasonable starting point chosen with no visual reference for the business's actual
branding (no logo or photos were available when it was written). Update the tokens there
once real brand assets are provided.

## Development approach

This project has been built issue-by-issue: one focused change per commit, tested against
the real backend and a real MongoDB database (not mocked) before being considered done,
with dead ends (like unused React contexts or duplicate components from an earlier
prototype) removed rather than left in place. Commit history reflects that — each commit
message describes one real, complete piece of work.

## Status

Not yet deployed. The public site, contact form, and admin enquiry management are complete
and working end-to-end. Remaining work depends on real business assets (photos, logo,
confirmed pricing/hours) and a hosting decision.

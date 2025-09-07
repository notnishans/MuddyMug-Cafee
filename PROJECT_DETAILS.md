# MuddyMug-Cafee — Project Overview

Hi — this is a friendly, hand-written style project summary describing what MuddyMug-Cafee is, how it works, and what it's built for. Treat this as the single-file guide for contributors and curious learners.

---

## What this is

MuddyMug-Cafee is a small demo/prototype application for a cafe. It is a learning-oriented project that demonstrates a full-stack flow with:

- A React + Vite frontend (client-side UI)
- A minimal Express backend (simple REST API)
- File-based persistence for quick demos (`backend/data/*.json`)

The app is intended as a lightweight playground for features such as table booking, browsing a menu, adding items to a cart, and placing orders. It is explicitly a dummy project — convenient to extend, test, and learn from.

---

## Main goals

- Provide a simple menu + cart + order flow.
- Demonstrate basic auth (register/login) in a prototype style.
- Persist data to JSON files for quick iteration without a database.
- Serve as a base to extend with order history, user-associated orders, and proper DB integration later.

---

## Features implemented (what works now)

- Table booking UI (basic booking form in `HomePage`).
- Menu browsing and add-to-cart (`MenuPage` component).
- Cart UI and confirm-order button in the frontend.
- Backend endpoints for auth and order creation:
  - `POST /api/auth/register` — register a new user.
  - `POST /api/auth/login` — login and receive a simple token.
  - `POST /api/orders` — persist an order to `backend/data/orders.json`.
  - `GET /api/health` — simple health check.
- The Vite dev server proxies `/api` calls to the Express backend in development.

---

## Where to look (key files)

- Frontend entry: `src/main.jsx`
- Frontend app: `src/App.jsx`
- Home & booking: `src/pages/HomePage.jsx`
- Menu component: `src/components/MenuPage.jsx`
- Reusable UI: `src/components/CustomButton.jsx`, `src/components/CustomField.jsx`
- Auth Context: `src/context/AuthContext.jsx`, `src/context/useAuthContext.jsx`
- Backend server: `backend/server.js`
- Backend data (dev only): `backend/data/users.json`, `backend/data/orders.json`
- Extra docs (if present): `PROJECT_OVERVIEW.md`, `README.md` (may be empty or replaced)

---

## How the frontend works (brief flow)

1. User opens the site (Vite served at `http://localhost:5173` by default).
2. The app provides a login/register flow that stores a tiny token in `localStorage` for demo authentication.
3. The `HomePage` contains two main tabs: Tables and Menu. The `Menu` tab mounts `MenuPage`.
4. `MenuPage` shows a list of menu items, each with an Add button. Adding an item updates a `cart` state held by the parent (`HomePage`).
5. The cart UI shows selected items and a `Confirm Order` button. When clicked, the frontend sends a `POST /api/orders` with the payload:

```json
{ "bookings": [ ... ], "cart": [ ... ], "total": 12.34 }
```

6. On success the backend returns a success object with an `orderId` and the frontend can clear the cart or show confirmation.

---

## How the backend works (brief flow)

- The backend is a small Express app in `backend/server.js`.
- It reads/writes JSON files from `backend/data/` for persistence.
- Passwords are handled with `scryptSync` + salt (demo-level security) and compared with timing-safe checks.
- `POST /api/orders` appends order objects to `backend/data/orders.json`. Orders currently are not associated with user accounts (future step).
- There is no production-ready error handling or input sanitization yet — this is a dev prototype.

---

## How to run locally (quick commands)

Prerequisites: Node.js (LTS), npm.

From the project root (`MuddyMug-Cafee`):

```powershell
# install frontend deps
npm install
# install backend deps
cd backend
npm install
```

Start backend (runs on port 4000 by default):

```powershell
cd backend
npm run dev
```

Start frontend (Vite):

```powershell
cd ..
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies `/api` to the backend so frontend fetches should work without CORS changes.

---

## Example quick test (manual end-to-end)

1. Start both servers.
2. Register a user (or use anonymous flows if available).
3. Click `Menu`, add items to cart, then `Confirm Order`.
4. Inspect `backend/data/orders.json` — you should see the saved order with a generated `orderId`.

Alternatively from PowerShell you can POST an order (example):

```powershell
$body = '{"bookings":[],"cart":[{"id":101,"name":"Test Coffee","price":3.5,"quantity":2}],"total":7.0}'
Invoke-RestMethod -Uri 'http://localhost:4000/api/orders' -Method POST -ContentType 'application/json' -Body $body
```

---

## Limitations & Known issues

- File-based JSON persistence is not safe for concurrent writes in production.
- Orders are not yet linked to authenticated users.
- Input validation and sanitization are minimal.
- Some CSS files may use `//` comments which can cause build warnings — prefer `/* ... */` in CSS.
- There may be duplicate or leftover files such as `src/components/menu-page.tsx` which should be reviewed and removed if unused.

---

## Suggested next steps (pick one)

- Add `GET /api/orders` and return orders for the logged-in user (requires associating orders with user IDs).
- Link persisted orders to user accounts so each user can view their order history.
- Add server-side validation for incoming requests.
- Replace file storage with a small SQLite/Postgres DB for resilience.
- Add unit/integration tests and a CI pipeline.
- Clean up duplicate frontend files and CSS comment issues.

Tell me which of these you want next and I will prepare a plan and implement step-by-step after you confirm.

---

Thanks — if you want the same content written in a shorter `README.md`, or want a more informal handwritten note style (even friendlier), say so and I will create/replace that file next.

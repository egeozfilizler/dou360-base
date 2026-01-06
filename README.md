# DOU360 Base

Full-stack project for the DOU360 experience: a Vite + React + TypeScript frontend with Tailwind/shadcn-ui, and an Express/MongoDB API for email-verified authentication.

## Stack
- Frontend: React 18, React Router, React Query, Vite, TypeScript, Tailwind CSS, shadcn-ui, motion animations
- Backend: Express 5, MongoDB via Mongoose, JWT auth, nodemailer (Gmail), bcryptjs
- Tooling: ESLint, nodemon for API dev, PostCSS/Tailwind build tooling

## Project Structure
- client/ — Vite React app (pages for landing, blog, map, auth; theming, toasts, UI components under components/ui)
- server/ — Express API (`/api/auth` routes for verification, signup, signin) with MongoDB models
- README.md — this file

## Prerequisites
- Node.js 18+ and npm (or pnpm/yarn if preferred)
- MongoDB connection string
- Gmail SMTP credentials (SMTP user + app password) for sending verification codes

## Setup
1) Install dependencies
```sh
cd client && npm install
cd ../server && npm install
```

2) Run locally (two terminals)
- API: `cd server && npm run dev`
- Web: `cd client && npm run dev` (Vite serves on 5173 by default)

## API Notes (server)
Base path: `/api/auth`
- POST `/send-code` — body `{ email }`; sends a 6-digit code via Gmail. Duplicate emails are rejected. Code expires after 10 minutes.
- POST `/signup` — body `{ fullName, email, password, code }`; validates code, hashes password, creates user, deletes code.
- POST `/signin` — body `{ email, password }`; returns `{ token, user }` with a 30d JWT.

## Scripts
- client: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`
- server: `npm run dev` (nodemon)

## Deployment
- Build frontend: `cd client && npm run build` (outputs `dist/`)
- Serve API from `server/index.js` with your preferred process manager; configure env vars as above.

## Tips
- Auth email domain restriction for `@dogus.edu.tr` is present but commented in the API; uncomment when enforcing institution-only signups.
- The client uses theme toggling, toast notifications, and motion-heavy sections; keep `index.css` view-transition overrides intact for smoother animations.

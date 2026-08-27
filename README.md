# Pledge / Contribution Site

A small Next.js app where people read a mission statement and pledge a financial
contribution. Pledges are commitments of intent. **No payment is taken or
processed anywhere in this app.**

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Prisma + SQLite/libSQL via the `@prisma/adapter-libsql` driver adapter (a local file in dev, a hosted [Turso](https://turso.tech) database in production)
- Zod for validation, Axios for client to API calls
- Resend for pledge confirmation emails (optional)

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values below
npx prisma migrate dev # creates prisma/dev.db and applies the schema
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env` and fill these in:

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | `file:./prisma/dev.db` for local dev. `libsql://<db>-<org>.turso.io` in production (see Deployment below). |
| `TURSO_AUTH_TOKEN` | Only in production | Leave empty for local dev (a local file needs no token). Required once `DATABASE_URL` points at Turso. |
| `ADMIN_PASSWORD` | Yes, to use `/admin` | Plain-text shared password for the `/admin` pledge dashboard. Pick something you wouldn't mind rotating. |
| `ADMIN_SECRET` | Yes, to use `/admin` | Signs the admin session cookie (HMAC). Use a long random string, e.g. `openssl rand -hex 32`. |
| `RESEND_API_KEY` | No | From [resend.com](https://resend.com). If left empty, pledge confirmation emails are skipped and logged to the console instead; the pledge still succeeds. |
| `EMAIL_FROM` | No | Sender shown on confirmation emails, e.g. `Pledges <pledges@yourdomain.org>`. Only matters if `RESEND_API_KEY` is set. |
| `NEXT_PUBLIC_SITE_NAME` | No | Used in the footer and confirmation email copy. |

`.env` is gitignored. Never commit real secrets.

## Routes

- `/`: landing page with mission statement, live stats bar, and pledge CTA (opens a modal)
- `/thank-you`: confirmation page after a successful pledge
- `/contact`: contact details
- `/admin/login`: enter `ADMIN_PASSWORD` to sign in
- `/admin`: list of all pledges plus totals and a CSV export (protected, redirects to `/admin/login` if not signed in)

## API

- `POST /api/pledges`: validates and creates a pledge, sends a confirmation email (best-effort)
- `GET /api/stats`: `{ totalRaised, contributorCount, averageContribution }`, computed live from the database
- `POST /api/admin/login` / `POST /api/admin/logout`: admin session cookie
- `GET /api/admin/pledges/export`: CSV export of all pledges (protected)

## Database

Dev uses a local SQLite file at `prisma/dev.db` (gitignored), read through the
libSQL driver adapter. Useful commands:

```bash
npx prisma migrate dev     # create/apply migrations during development
npx prisma studio          # browse the data in a GUI
```

**Important:** `prisma migrate deploy` only understands `file:`/`postgresql:`/etc.
URLs, it can't parse a `libsql://` URL, so it cannot be used to apply migrations
to Turso directly (running it against a Turso `DATABASE_URL` fails with
`P1013: The provided database string is invalid`). Schema changes have to be
applied to Turso by hand, see below.

## Deployment (Vercel + Turso)

The app deploys cleanly to Vercel (it's a stock Next.js app), but Vercel's
serverless functions don't have a persistent filesystem, so the local SQLite
file can't be the production database. Turso (hosted libSQL, SQLite-compatible)
is a drop-in swap since the schema and adapter already speak libSQL:

1. Create a database: `turso db create pledge-site` (via the [Turso CLI](https://docs.turso.tech/cli/installation))
2. Get the connection details: `turso db show pledge-site --url` and `turso db tokens create pledge-site`
3. Apply the schema by running the migration SQL directly against it (not `prisma migrate deploy`, see above):
   ```bash
   turso db shell pledge-site < prisma/migrations/<timestamp>_init/migration.sql
   ```
   Repeat for any new migration file whenever the schema changes.
4. In Vercel's project settings, set `DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, and (optionally) `RESEND_API_KEY` / `EMAIL_FROM` / `NEXT_PUBLIC_SITE_NAME`. Double-check they're checked for every environment (Production/Preview) you actually deploy to, and that saving them is followed by a redeploy (Vercel doesn't retroactively apply env var changes to an existing deployment).
5. Deploy

No code changes needed between environments, only which `DATABASE_URL` /
`TURSO_AUTH_TOKEN` are set.

## Out of scope

Flagged in the original brief but not built. Ask if you want any of these:

- **Payment processing.** This is a pledge tracker, not a checkout. No Stripe/etc.
- **Admin dashboard.** A password-protected `/admin` list view with CSV export is included; nothing beyond that (no editing or deleting pledges).
- **Email confirmations.** Included via Resend, but optional. The app works fully without an API key.

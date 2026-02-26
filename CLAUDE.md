# CLAUDE.md

This file provides guidance to Claude Code when working with the Solid Steel Management website.

## Commands

### Development
- `pnpm dev` — Dev server on port 3005
- `pnpm build` — Production build (strict — no ignoreBuildErrors)
- `pnpm start` — Production server on port 3005
- `pnpm lint` — ESLint

### Testing
- `pnpm test` — Run all Playwright tests
- `pnpm test:ui` — Interactive Playwright UI mode
- `pnpm test:debug` — Debug tests step by step
- `pnpm test:report` — Show HTML test report

Tests are in `/tests`, base URL `http://localhost:3005`, dev server auto-starts.

## Tech Stack
- **Framework**: Next.js 15.5 with App Router, React 19, TypeScript 5
- **Package Manager**: pnpm (never commit package-lock.json)
- **UI**: shadcn/ui (Radix UI) + Tailwind CSS 3.4
- **Auth**: iron-session 8 (admin panel only)
- **Storage**: Vercel Blob for project/company images
- **Forms**: React Hook Form + Zod (quote-request, proforma-budget), manual state (contact)
- **CRM**: Groundhogg (WordPress at crm.solidsteelmgt.ca) via webhooks
- **Icons**: lucide-react
- **Charts**: recharts

## Project Structure

### Pages (`/app`)
- `/` — Home (hero video, services, featured projects)
- `/about` — Company info, team, partner logos
- `/contact` — Contact form → Groundhogg CRM
- `/projects/gallery` — Filterable project gallery
- `/projects/[slug]` — Individual project detail
- `/case-studies` — Case study listing
- `/case-studies/[slug]` — Individual case study
- `/quote-request` — Detailed quote request form
- `/proforma-budget-consultation` — Budget consultation form
- `/privacy-policy`, `/terms` — Legal pages
- `/contact/thank-you` — Static post-submission page

### Admin (`/app/my-admin`)
- `/my-admin` — Dashboard (protected by iron-session)
- `/my-admin/login` — Admin login
- `/my-admin/projects` — CRUD for projects
- `/my-admin/case-studies` — CRUD for case studies

### API Routes (`/app/api`)
- `/api/admin/login`, `/api/admin/logout` — Auth
- `/api/admin/projects/[id]` — Project CRUD
- `/api/admin/case-studies/[id]` — Case study CRUD
- `/api/contact` — Contact form (JSON + form-encoded)
- `/api/quote-request` — Quote form (JSON, Zod validated)
- `/api/proforma-budget` — Budget form (JSON, Zod validated)
- `/api/blob/projects/[slug]/images` — Blob image management

### Key Directories
- `/data` — Static TypeScript data files (projects.ts, case-studies.ts)
- `/lib` — Utilities: admin-auth.ts, admin-data.ts, blob.ts, projects.ts
- `/hooks` — Custom hooks: useProjectImages, use-toast
- `/components` — All UI components (shadcn/ui in /components/ui/)
- `/public/images` — Static assets (logo, hero, partner logos, OG images)

## Environment Variables

### Required (Vercel Dashboard)
- `SECRET_COOKIE_PASSWORD` — iron-session encryption (32+ chars)
- `ADMIN_PASSWORD` — Admin panel password
- `GROUNDHOGG_WEBHOOK_CONTACT_URL` — Contact form CRM webhook
- `GROUNDHOGG_WEBHOOK_QUOTE_URL` — Quote/budget form CRM webhook

### Optional
- `ADMIN_USERNAME` — Admin username (defaults to checking password only)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob access (auto-provisioned)
- `NEXT_PUBLIC_BLOB_BASE_URL` — Blob base URL override
- `NEXT_PUBLIC_DEBUG` — Enable debug mode

## Form Architecture

All 3 forms (contact, quote-request, proforma-budget) share this pattern:

1. **React path** (primary): `onSubmit` → `e.preventDefault()` → `fetch('/api/...')` → inline success
2. **Native fallback**: `<form action="/api/..." method="POST">` → server handles form-encoded → 303 redirect to thank-you
3. **Bot protection**: Honeypot field `_hp_check` (intentionally obscure name — never use `company_url`, `website`, or other names browsers might autofill)
4. **CRM integration**: API routes POST to Groundhogg webhook URLs, which create contacts and trigger funnel automations

### Honeypot field naming
The honeypot field MUST use an obscure name like `_hp_check` that browsers won't autofill. Previous names (`company_url`, `website`) caused browser autofill to trigger the honeypot check, silently blocking every real user submission.

## Security

### CSP Headers (next.config.mjs)
Strict Content-Security-Policy with allowlists for:
- `script-src`: self, unsafe-inline/eval, vercel.live
- `img-src`: self, data, blob, vercel.live, *.public.blob.vercel-storage.com
- `connect-src`: self, vercel.live, blob storage
- `form-action`: self
- `object-src`: none

### Other Headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` with includeSubDomains
- `Permissions-Policy`: camera, mic, geolocation all blocked

## Next.js 15 / React 19 Gotchas
- `params` in route handlers and pages are `Promise<{...}>` — must `await`
- `cookies()` returns a Promise — must `await`
- Client components using params need `React.use(params)` (not await)
- Radix UI packages must be latest versions for React 19 compatibility
- `ignoreBuildErrors` is OFF — all TypeScript errors must be fixed

## Deployment
- **Platform**: Vercel (auto-deploy from GitHub `main` branch)
- **Project**: `solidsteel` (prj_NLZayF6dEVC2ZDaLI0LoGpCvfbMj)
- **Team**: systemsaholic-5e0024de
- **Domains**: solidsteelmgt.ca, www.solidsteelmgt.ca
- **Region**: iad1 (US East)
- Push to `main` → Vercel auto-builds and deploys

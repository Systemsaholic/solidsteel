# Solid Steel Management — Website Onboarding & Tech Profile

**Client:** Solid Steel Management
**Contact:** Al Guertin (`al@gaponline.com`)
**Phone:** (613) 231-8639
**Email:** info@solidsteelmgt.ca
**Website:** https://solidsteelmgt.ca
**Onboarded:** 2026-02-23

---

## Hosting & Infrastructure

| Component | Details |
|-----------|---------|
| **Hosting** | Vercel (auto-deploy from GitHub) |
| **Framework** | Next.js 15.5, React 19, TypeScript 5 |
| **Package Manager** | pnpm |
| **Vercel Project** | `solidsteel` (prj_NLZayF6dEVC2ZDaLI0LoGpCvfbMj) |
| **Vercel Team** | systemsaholic-5e0024de |
| **GitHub Repo** | Systemsaholic/solidsteel |
| **Local Path** | `/home/ubuntu/WebDev-AI/clients/solidsteel/` |
| **Region** | iad1 (US East / Virginia) |
| **Domains** | solidsteelmgt.ca, www.solidsteelmgt.ca |
| **Old WordPress** | solidsteelmgt.ca on cPanel (user: `solidsteelmgt`) — DNS switched to Vercel |
| **CRM** | Groundhogg at crm.solidsteelmgt.ca (WordPress on cPanel) |

---

## Domains & DNS

| Domain | Target | Status |
|--------|--------|--------|
| solidsteelmgt.ca | Vercel (cname.vercel-dns.com) | Live |
| www.solidsteelmgt.ca | Vercel (cname.vercel-dns.com) | Live |
| crm.solidsteelmgt.ca | cPanel (syshost02.systemsaholic.net) | Live — Groundhogg CRM |

**DNS managed at:** Registrar (not Cloudflare)

---

## CRM Integration (Groundhogg)

| Component | Details |
|-----------|---------|
| **CRM URL** | https://crm.solidsteelmgt.ca |
| **Platform** | Groundhogg Pro on WordPress |
| **Contact Webhook** | `GROUNDHOGG_WEBHOOK_CONTACT_URL` env var on Vercel |
| **Quote Webhook** | `GROUNDHOGG_WEBHOOK_QUOTE_URL` env var on Vercel |

### Forms → CRM Flow
1. User submits form on solidsteelmgt.ca (contact, quote-request, or proforma-budget)
2. API route validates data server-side (Zod schemas for quote/proforma)
3. API route POSTs JSON to Groundhogg webhook URL
4. Groundhogg creates contact, triggers funnel automations (auto-reply emails)
5. User sees inline success card or redirect to /contact/thank-you

### Bot Protection
- **Honeypot field** `_hp_check` on all 3 forms — intentionally obscure name to avoid browser autofill
- Server-side honeypot validation in all API routes (also checks legacy names `company_url`, `website`)
- No reCAPTCHA (removed — was causing form submission failures)

---

## Environment Variables (Vercel Dashboard)

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_COOKIE_PASSWORD` | Yes | iron-session encryption key (32+ chars) |
| `ADMIN_PASSWORD` | Yes | Admin panel login password |
| `GROUNDHOGG_WEBHOOK_CONTACT_URL` | Yes | Contact form webhook to CRM |
| `GROUNDHOGG_WEBHOOK_QUOTE_URL` | Yes | Quote + proforma webhook to CRM |
| `BLOB_READ_WRITE_TOKEN` | Auto | Vercel Blob storage (auto-provisioned) |
| `ADMIN_USERNAME` | No | Admin username override |
| `NEXT_PUBLIC_BLOB_BASE_URL` | No | Blob URL override |
| `NEXT_PUBLIC_DEBUG` | No | Debug mode |

---

## Admin Panel

| Field | Value |
|-------|-------|
| **URL** | https://solidsteelmgt.ca/my-admin |
| **Login** | https://solidsteelmgt.ca/my-admin/login |
| **Auth** | iron-session (cookie: `solid-steel-admin-session`) |
| **Features** | CRUD for projects & case studies, image upload via Blob |

---

## Image Storage (Vercel Blob)

| Detail | Value |
|--------|-------|
| **Base URL** | 5v8oej1w91asigpe.public.blob.vercel-storage.com |
| **Structure** | `projects/{slug}/hero-{timestamp}.{ext}` |
| **Company assets** | `company/{type}/{name}.{ext}` |
| **Access** | Public read, write via BLOB_READ_WRITE_TOKEN |

---

## SEO & Analytics

| Component | Details |
|-----------|---------|
| **GSC Property** | sc-domain:solidsteelmgt.ca |
| **Google Drive** | Folder ID: 1fHFT4pBbkJIMJB7jtZSaWZRU5LJGGIVJ |
| **Structured Data** | GeneralContractor JSON-LD on all pages |
| **Sitemap** | /sitemap.xml (auto-generated) |
| **Robots** | /robots.txt (admin + API routes blocked) |
| **Analytics** | GA4: G-Y3Y9D5L2PT (gtag.js, afterInteractive) |

---

## Security Headers

All pages served with:
- `Content-Security-Policy` — strict allowlist (self, Vercel, Blob storage)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` with includeSubDomains
- `Permissions-Policy` — camera, mic, geolocation blocked
- `Referrer-Policy: strict-origin-when-cross-origin`

---

## Pages

| Page | Path | Type |
|------|------|------|
| Home | `/` | Static (hero video, services, featured projects) |
| About | `/about` | Static (team, partners) |
| Contact | `/contact` | Static + client form |
| Projects Gallery | `/projects/gallery` | Static (filterable gallery) |
| Project Detail | `/projects/[slug]` | Dynamic |
| Case Studies | `/case-studies` | Static |
| Case Study Detail | `/case-studies/[slug]` | Dynamic |
| Quote Request | `/quote-request` | Static + client form |
| Budget Consultation | `/proforma-budget-consultation` | Static + client form |
| Privacy Policy | `/privacy-policy` | Static |
| Terms of Service | `/terms` | Static |
| Thank You | `/contact/thank-you` | Static |

---

## Content Data

| Type | Count | Storage |
|------|-------|---------|
| **Projects** | 5 | `/data/projects.ts` (TypeScript file, editable via admin) |
| **Case Studies** | 2 | `/data/case-studies.ts` (TypeScript file, editable via admin) |
| **Project Images** | Per-project | Vercel Blob storage |

### Current Projects
1. Greystone Village Retirement Residence — 153,000 sqft, Design Build
2. Pro-Xcavation Headquarters — 12,000 sqft
3. Marc Forget Transport Facility — 8,000 sqft
4. Embrun Ford Dealership — 6,000 sqft, 6-bay commercial garage addition
5. C&C Welding Compound — Custom metal fabrication facility

---

## Key Lessons & Gotchas

1. **Honeypot naming**: Never use `company_url`, `website`, or other names browsers autofill. Use obscure names like `_hp_check`.
2. **reCAPTCHA Enterprise**: Was removed — it silently blocked form submissions on unregistered domains. Honeypot is primary bot defense.
3. **React hydration**: The site is statically prerendered. Forms have both React `onSubmit` and native HTML `action/method` fallback.
4. **Next.js 15 params**: All route handlers and pages use `Promise<{}>` params with `await`.
5. **pnpm lockfile**: Always run `pnpm install` after modifying package.json. Never commit `package-lock.json` in a pnpm project.
6. **Build strictness**: `ignoreBuildErrors` is OFF. All TypeScript errors must be resolved before deploy.

---

## Deployment Workflow

```bash
# 1. Make changes
cd /home/ubuntu/WebDev-AI/clients/solidsteel/
git checkout -b fix/description

# 2. Build locally to verify
pnpm build

# 3. Commit and push
git add <files>
git commit -m "description"
git push origin main   # or create PR for review

# 4. Vercel auto-deploys from main
# 5. Verify via Vercel MCP: get_deployment, web_fetch_vercel_url
# 6. Check runtime logs for errors: get_runtime_logs
```

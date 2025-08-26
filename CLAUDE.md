# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Run the development server on port 3005 (Next.js)
- `npm run build` - Build the production application
- `npm run start` - Start the production server on port 3005
- `npm run lint` - Run linting

### Testing
- `npm run test` - Run all Playwright tests
- `npm run test:ui` - Run tests in interactive UI mode
- `npm run test:debug` - Debug tests step by step
- `npm run test:report` - Show HTML test report

**Test Configuration:**
- Tests are located in `/tests` directory
- Base URL: `http://localhost:3005`
- Dev server starts automatically when running tests
- Playwright MCP integration enabled for enhanced test automation

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui components (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom components
- **Authentication**: Iron Session for admin authentication
- **File Storage**: Vercel Blob for image storage
- **Forms**: React Hook Form with Zod validation

### Project Structure

#### Core Application (`/app`)
- **Public Pages**: Home, About, Contact, Projects, Case Studies
- **Admin Section** (`/my-admin`): Protected admin dashboard for managing projects and case studies
- **API Routes** (`/api`): 
  - Admin authentication endpoints
  - CRUD operations for projects and case studies
  - File upload handling via Vercel Blob
  - Contact form submissions

#### Key Features
1. **Dynamic Content Management**: Admin can create, edit, and delete projects and case studies
2. **Image Management**: Integrated with Vercel Blob for storing project images
3. **Protected Admin Routes**: Session-based authentication using iron-session
4. **Form Handling**: Multiple contact forms (quote requests, proforma budgets, newsletters)

#### Data Flow
- Static data files in `/data` for initial content
- Admin operations persist to Vercel Blob storage
- Project and case study images are dynamically loaded from Blob storage
- Forms submit to API routes for processing

#### Environment Variables Required
- `SECRET_COOKIE_PASSWORD` - For iron-session encryption
- `ADMIN_PASSWORD` - Admin login password
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage access

#### Path Aliases
- `@/*` maps to root directory
- Components use `@/components`, `@/lib`, `@/hooks` conventions

### Important Configuration Notes
- TypeScript and ESLint errors are ignored during build (see next.config.mjs)
- Images are unoptimized and support Vercel Blob storage domains
- No middleware configuration found
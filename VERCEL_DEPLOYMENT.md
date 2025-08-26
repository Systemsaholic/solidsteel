# Vercel Deployment Guide for Solid Steel Management

This guide explains how to deploy the Solid Steel Management website to Vercel.

## Prerequisites

- Vercel account (free tier works)
- GitHub/GitLab/Bitbucket account for repository hosting
- All images committed to the repository (we're using local images)

## Deployment Steps

### 1. Push Code to Repository

Ensure all files are committed, including:
- All images in `/public` directory
- `.env.example` file (but NOT `.env.local`)

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js framework

### 3. Configure Environment Variables

In Vercel dashboard, add the following environment variables:

```bash
# Required - Generate a secure 32+ character password
SECRET_COOKIE_PASSWORD=your-super-secure-password-here

# Required - Set your admin password
ADMIN_PASSWORD=your-secure-admin-password

# Optional - Only if using Vercel Blob Storage later
# BLOB_READ_WRITE_TOKEN=vercel_blob_your_token_here
```

**Security Tips:**
- Use a password generator for `SECRET_COOKIE_PASSWORD` (minimum 32 characters)
- Example command: `openssl rand -base64 32`
- Use a strong password for `ADMIN_PASSWORD`

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll get a production URL like `your-project.vercel.app`

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `solidsteelmgt.ca`)
3. Follow Vercel's DNS configuration instructions

## Post-Deployment

### Access Admin Panel

- Admin URL: `https://your-domain.com/my-admin`
- Use the password you set in `ADMIN_PASSWORD`

### Important URLs

- Main site: `https://your-domain.com`
- Admin login: `https://your-domain.com/my-admin/login`
- Projects management: `https://your-domain.com/my-admin/projects`
- Case studies management: `https://your-domain.com/my-admin/case-studies`

## Troubleshooting

### Images Not Loading

Since we're using local images:
1. Ensure all images are in the `/public` directory
2. Check that images are committed to Git
3. Verify image paths in data files start with `/`

### Admin Login Issues

1. Check environment variables are set correctly in Vercel
2. Ensure `SECRET_COOKIE_PASSWORD` is at least 32 characters
3. Try clearing browser cookies for the domain

### Build Failures

1. Check Vercel build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. TypeScript and ESLint errors are ignored by default

## Future Migration to Blob Storage

When ready to migrate to Vercel Blob Storage:

1. Enable Blob Storage in Vercel dashboard
2. Get `BLOB_READ_WRITE_TOKEN` from Storage settings
3. Add token to environment variables
4. Upload images through admin panel
5. Update data files with blob URLs

## Monitoring

- Check Vercel dashboard for:
  - Build logs
  - Function logs
  - Analytics
  - Error tracking

## Support

For issues specific to:
- Vercel deployment: Check [Vercel docs](https://vercel.com/docs)
- Next.js: Check [Next.js docs](https://nextjs.org/docs)
- This project: Review `/CLAUDE.md` for architecture details
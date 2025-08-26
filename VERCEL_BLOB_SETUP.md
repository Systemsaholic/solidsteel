# Vercel Blob Storage Setup Guide

This guide will help you set up Vercel Blob storage to fix the broken images on your site.

## Step 1: Get Your Vercel Blob Token

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create one if you haven't deployed yet)
3. Navigate to the **Storage** tab
4. Click **Create Database** → **Blob**
5. Give it a name (e.g., "solidsteel-images")
6. Select your region (choose closest to your users)
7. Click **Create**
8. Once created, click on your Blob store
9. Go to the **.env.local** tab
10. Copy the `BLOB_READ_WRITE_TOKEN` value

## Step 2: Add Token to Your Environment

1. Open `.env.local` in your project
2. Uncomment and update the line:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_YOUR_TOKEN_HERE
   ```

## Step 3: Run the Migration Script

Once you have the token set up, run the migration script to upload all images:

```bash
node scripts/migrate-images.mjs
```

This will:
- Upload all local images to Vercel Blob
- Create organized folder structure in Blob storage
- Generate `image-url-mapping.json` with old → new URL mappings

## Step 4: Update Data Files

After migration completes, I'll help you update the data files with the new Blob URLs.

## Step 5: Test

Run the Playwright tests again to verify all images load:

```bash
pnpm exec playwright test images.spec.ts
```

## Benefits of Vercel Blob

- **Automatic CDN**: Images served from Vercel's global CDN
- **Optimization**: Automatic image optimization and resizing
- **No Git bloat**: Images don't increase repository size
- **Easy management**: Upload new images through admin panel
- **Cost effective**: Generous free tier included

## Troubleshooting

If you see "BLOB_READ_WRITE_TOKEN is not set":
- Make sure you saved `.env.local` after adding the token
- Restart your dev server after adding the token
- Token should start with `vercel_blob_rw_`

If uploads fail:
- Check your Vercel dashboard for storage quota
- Ensure token has read/write permissions
- Check network connectivity
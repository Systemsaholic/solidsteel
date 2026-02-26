import { put, del, list } from "@vercel/blob"

export interface UploadResult {
  url: string
  pathname: string
  contentType: string
  contentDisposition: string
}

export interface BlobFile {
  url: string
  pathname: string
  size: number
  uploadedAt: Date
}

/**
 * Upload a file to Vercel Blob storage
 */
export async function uploadToBlob(
  file: File | Buffer,
  filename: string,
  options?: {
    access?: "public" | "private"
  },
): Promise<UploadResult> {
  try {
    const blob = await put(filename, file, {
      access: options?.access || "public",
    })

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType || "",
      contentDisposition: blob.contentDisposition || "",
    }
  } catch (error) {
    console.error("Error uploading to blob:", error)
    throw new Error("Failed to upload file to blob storage")
  }
}

/**
 * Delete a file from Vercel Blob storage
 */
export async function deleteFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting from blob:", error)
    throw new Error("Failed to delete file from blob storage")
  }
}

/**
 * List files in Vercel Blob storage
 */
export async function listBlobFiles(options?: {
  limit?: number
  prefix?: string
  cursor?: string
}): Promise<{ blobs: BlobFile[]; hasMore: boolean; cursor?: string }> {
  try {
    const result = await list(options)

    return {
      blobs: result.blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
      hasMore: result.hasMore,
      cursor: result.cursor,
    }
  } catch (error) {
    console.error("Error listing blob files:", error)
    throw new Error("Failed to list blob files")
  }
}

/**
 * Generate optimized image URL with query parameters
 */
export function getOptimizedImageUrl(
  blobUrl: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: "auto" | "webp" | "avif" | "png" | "jpg"
  },
): string {
  if (!options) return blobUrl

  const url = new URL(blobUrl)

  if (options.width) url.searchParams.set("w", options.width.toString())
  if (options.height) url.searchParams.set("h", options.height.toString())
  if (options.quality) url.searchParams.set("q", options.quality.toString())
  if (options.format) url.searchParams.set("f", options.format)

  return url.toString()
}

/**
 * Upload project image with standardized naming
 */
export async function uploadProjectImage(
  file: File,
  projectSlug: string,
  imageType: "hero" | "gallery" | "thumbnail",
): Promise<UploadResult> {
  const timestamp = Date.now()
  const extension = file.name.split(".").pop() || "jpg"
  const filename = `projects/${projectSlug}/${imageType}-${timestamp}.${extension}`

  return uploadToBlob(file, filename)
}

/**
 * Upload company asset (logos, team photos, etc.)
 */
export async function uploadCompanyAsset(
  file: File,
  assetType: "logo" | "team" | "partner" | "general",
  assetName?: string,
): Promise<UploadResult> {
  const timestamp = Date.now()
  const extension = file.name.split(".").pop() || "jpg"
  const name = assetName || `asset-${timestamp}`
  const filename = `company/${assetType}/${name}.${extension}`

  return uploadToBlob(file, filename)
}

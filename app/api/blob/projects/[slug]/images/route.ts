import { type NextRequest, NextResponse } from "next/server"
import { listBlobFiles } from "@/lib/blob"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug: projectSlug } = await params

    // List all files in the project folder
    // Note: folder names are case-sensitive in blob storage
    // Try both lowercase and uppercase folder names
    let result = await listBlobFiles({
      prefix: `projects/${projectSlug}/`,
      limit: 100,
    })

    // If no results with lowercase, try uppercase
    if (result.blobs.length === 0) {
      result = await listBlobFiles({
        prefix: `Projects/${projectSlug}/`,
        limit: 100,
      })
    }

    // Filter for image files and format response
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"]
    const images = result.blobs
      .filter((blob) => {
        const extension = blob.pathname.toLowerCase().split(".").pop()
        return extension && imageExtensions.includes(`.${extension}`)
      })
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split("/").pop() || "",
        uploadedAt: blob.uploadedAt,
        size: blob.size,
      }))

    const response = NextResponse.json({
      success: true,
      images,
      count: images.length,
    })
    // Cache for 1 hour — image list rarely changes
    response.headers.set("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
    return response
  } catch (error) {
    console.error("Error fetching project images:", error)
    return NextResponse.json({ error: "Failed to fetch project images" }, { status: 500 })
  }
}

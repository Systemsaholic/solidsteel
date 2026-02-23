import { type NextRequest, NextResponse } from "next/server"
import { uploadToBlob } from "@/lib/blob"

export const maxDuration = 60 // Maximum function duration: 60 seconds

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = "video" // Fixed folder — no user input

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type - allow common video formats
    const allowedTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
      }, { status: 400 })
    }

    // Validate file size (max 100MB for videos)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB` 
      }, { status: 400 })
    }

    // Use the specific filename expected by the hero component
    const filename = `${folder}/builders-on-the-construction-2023-11-27-05-02-01-utc.mp4`

    const result = await uploadToBlob(file, filename)

    return NextResponse.json({
      success: true,
      url: result.url,
      pathname: result.pathname,
    })
  } catch (error) {
    console.error("Video upload error:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({
      error: "Failed to upload video"
    }, { status: 500 })
  }
}
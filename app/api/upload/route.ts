import { type NextRequest, NextResponse } from "next/server"
import { uploadToBlob } from "@/lib/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const allowedFolders = ["general", "quote-requests", "proforma-consultations", "projects"]
    const requestedFolder = (formData.get("folder") as string) || "general"
    const folder = allowedFolders.includes(requestedFolder) ? requestedFolder : "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    const timestamp = Date.now()
    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "avif"]
    const rawExtension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "")
    const extension = allowedExtensions.includes(rawExtension) ? rawExtension : "jpg"
    const filename = `${folder}/${timestamp}.${extension}`

    const result = await uploadToBlob(file, filename)

    return NextResponse.json({
      success: true,
      url: result.url,
      pathname: result.pathname,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

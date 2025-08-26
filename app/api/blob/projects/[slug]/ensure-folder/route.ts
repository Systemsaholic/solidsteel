import { type NextRequest, NextResponse } from "next/server"
import { uploadToBlob } from "@/lib/blob"

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const projectSlug = params.slug

    // Create a placeholder file to ensure the folder exists
    // This is a common pattern in blob storage systems
    const placeholderContent = new Blob([""], { type: "text/plain" })

    await uploadToBlob(placeholderContent, `Projects/${projectSlug}/.placeholder`, { access: "public" })

    return NextResponse.json({
      success: true,
      message: `Folder created for project: ${projectSlug}`,
    })
  } catch (error) {
    console.error("Error ensuring project folder:", error)
    return NextResponse.json({ error: "Failed to create project folder" }, { status: 500 })
  }
}

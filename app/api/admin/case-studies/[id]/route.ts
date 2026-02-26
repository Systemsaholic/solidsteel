import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/admin-auth"
import { readCaseStudiesFile, writeCaseStudiesFile, generateSlug } from "@/lib/admin-data"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const caseStudies = await readCaseStudiesFile()
    const caseStudy = caseStudies.find((cs) => cs.id === id)

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    return NextResponse.json(caseStudy)
  } catch (error) {
    console.error("Error fetching case study:", error)
    return NextResponse.json({ error: "Failed to fetch case study" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const caseStudyData = await request.json()
    const caseStudies = await readCaseStudiesFile()

    const caseStudyIndex = caseStudies.findIndex((cs) => cs.id === id)
    if (caseStudyIndex === -1) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    const updatedCaseStudy = {
      ...caseStudies[caseStudyIndex],
      ...caseStudyData,
      slug: generateSlug(caseStudyData.title),
      updatedAt: new Date().toISOString(),
    }

    caseStudies[caseStudyIndex] = updatedCaseStudy
    await writeCaseStudiesFile(caseStudies)

    return NextResponse.json(updatedCaseStudy)
  } catch (error) {
    console.error("Error updating case study:", error)
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()
    const { id } = await params
    const caseStudies = await readCaseStudiesFile()

    const caseStudyIndex = caseStudies.findIndex((cs) => cs.id === id)
    if (caseStudyIndex === -1) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 })
    }

    caseStudies.splice(caseStudyIndex, 1)
    await writeCaseStudiesFile(caseStudies)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting case study:", error)
    return NextResponse.json({ error: "Failed to delete case study" }, { status: 500 })
  }
}

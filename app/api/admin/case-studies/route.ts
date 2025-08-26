import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/admin-auth"
import { readCaseStudiesFile, writeCaseStudiesFile, generateSlug } from "@/lib/admin-data"
import type { CaseStudy } from "@/data/case-studies"

export async function GET() {
  try {
    await requireAuth()
    const caseStudies = await readCaseStudiesFile()
    return NextResponse.json(caseStudies)
  } catch (error) {
    console.error("Error fetching case studies:", error)
    return NextResponse.json({ error: "Failed to fetch case studies" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const caseStudyData = await request.json()

    const caseStudies = await readCaseStudiesFile()

    const newCaseStudy: CaseStudy = {
      ...caseStudyData,
      id: Date.now().toString(),
      slug: generateSlug(caseStudyData.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    caseStudies.push(newCaseStudy)
    await writeCaseStudiesFile(caseStudies)

    return NextResponse.json(newCaseStudy, { status: 201 })
  } catch (error) {
    console.error("Error creating case study:", error)
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 })
  }
}

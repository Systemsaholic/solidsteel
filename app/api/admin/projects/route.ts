import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/admin-auth"
import { readProjectsFile, writeProjectsFile, generateSlug } from "@/lib/admin-data"
import type { Project } from "@/data/projects"

export async function GET() {
  try {
    await requireAuth()
    const projects = await readProjectsFile()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const projectData = await request.json()

    const projects = await readProjectsFile()

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      slug: generateSlug(projectData.title),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.push(newProject)
    await writeProjectsFile(projects)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

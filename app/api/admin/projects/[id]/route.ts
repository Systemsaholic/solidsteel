import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/admin-auth"
import { readProjectsFile, writeProjectsFile, generateSlug } from "@/lib/admin-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const projects = await readProjectsFile()
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const projectData = await request.json()
    const projects = await readProjectsFile()

    const projectIndex = projects.findIndex((p) => p.id === params.id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const updatedProject = {
      ...projects[projectIndex],
      ...projectData,
      slug: generateSlug(projectData.title),
      updatedAt: new Date().toISOString(),
    }

    projects[projectIndex] = updatedProject
    await writeProjectsFile(projects)

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth()
    const projects = await readProjectsFile()

    const projectIndex = projects.findIndex((p) => p.id === params.id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    projects.splice(projectIndex, 1)
    await writeProjectsFile(projects)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}

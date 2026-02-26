"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import type { Project } from "@/data/projects"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">Manage your construction projects</p>
        </div>
        <Link href="/my-admin/projects/new">
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Project</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Badge variant={project.featured ? "default" : "secondary"}>
                    {project.featured ? "Featured" : "Standard"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="outline">{project.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge
                    variant={
                      project.status === "completed"
                        ? "success"
                        : project.status === "in-progress"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye size={14} />
                      </Button>
                    </Link>
                    <Link href={`/my-admin/projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit size={14} />
                      </Button>
                    </Link>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No projects found</p>
            <Link href="/my-admin/projects/new">
              <Button>Add Your First Project</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

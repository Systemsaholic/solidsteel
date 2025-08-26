"use client"

import { CardDescription } from "@/components/ui/card"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/data/projects"
import type { CaseStudy } from "@/data/case-studies"
import { projects } from "@/data/projects"
import { caseStudies } from "@/data/case-studies"
import { Briefcase, FileText } from "lucide-react"

export default function AdminDashboard() {
  const [projectData, setProjectData] = useState<Project[]>([])
  const [caseStudyData, setCaseStudyData] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const projectCount = projects.length
  const caseStudyCount = caseStudies.length

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [projectsRes, caseStudiesRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/case-studies"),
      ])

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjectData(projectsData)
      }

      if (caseStudiesRes.ok) {
        const caseStudiesData = await caseStudiesRes.json()
        setCaseStudyData(caseStudiesData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Case Studies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Featured Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectData.filter((p) => p.featured).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Published Case Studies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caseStudyData.filter((cs) => cs.published).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your construction projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{projectData.length} total projects</span>
              <Link href="/my-admin/projects/new">
                <Button size="sm">Add Project</Button>
              </Link>
            </div>
            <div className="space-y-2">
              {projectData.slice(0, 3).map((project) => (
                <div key={project.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-600">{project.category}</div>
                  </div>
                  <Link href={`/my-admin/projects/${project.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/my-admin/projects">
              <Button variant="outline" className="w-full bg-transparent">
                View All Projects
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Studies</CardTitle>
            <CardDescription>Manage your case studies and success stories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{caseStudyData.length} total case studies</span>
              <Link href="/my-admin/case-studies/new">
                <Button size="sm">Add Case Study</Button>
              </Link>
            </div>
            <div className="space-y-2">
              {caseStudyData.slice(0, 3).map((caseStudy) => (
                <div key={caseStudy.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">{caseStudy.title}</div>
                    <div className="text-sm text-gray-600">{caseStudy.published ? "Published" : "Draft"}</div>
                  </div>
                  <Link href={`/my-admin/case-studies/${caseStudy.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <Link href="/my-admin/case-studies">
              <Button variant="outline" className="w-full bg-transparent">
                View All Case Studies
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

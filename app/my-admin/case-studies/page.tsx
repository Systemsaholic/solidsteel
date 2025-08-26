"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import type { CaseStudy } from "@/data/case-studies"

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/admin/case-studies")
      if (response.ok) {
        const data = await response.json()
        setCaseStudies(data)
      }
    } catch (error) {
      console.error("Error fetching case studies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return

    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCaseStudies(caseStudies.filter((cs) => cs.id !== id))
      }
    } catch (error) {
      console.error("Error deleting case study:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
          <p className="text-gray-600 mt-2">Manage your project case studies</p>
        </div>
        <Link href="/my-admin/case-studies/new">
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Case Study</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((caseStudy) => (
          <Card key={caseStudy.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.subtitle}</CardDescription>
                </div>
                <Badge variant={caseStudy.featured ? "default" : "secondary"}>
                  {caseStudy.featured ? "Featured" : "Standard"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Project:</span>
                  <span className="font-medium">{caseStudy.projectSlug}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Published:</span>
                  <span>{new Date(caseStudy.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Metrics:</span>
                  <span>{caseStudy.keyMetrics.length} metrics</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lessons:</span>
                  <span>{caseStudy.lessonsLearned.length} lessons</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    <Link href={`/case-studies/${caseStudy.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye size={14} />
                      </Button>
                    </Link>
                    <Link href={`/my-admin/case-studies/${caseStudy.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit size={14} />
                      </Button>
                    </Link>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(caseStudy.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {caseStudies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No case studies found</p>
            <Link href="/my-admin/case-studies/new">
              <Button>Add Your First Case Study</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

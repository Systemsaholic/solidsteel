"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { getAllProjects } from "@/lib/projects"
import type { CaseStudy } from "@/data/case-studies"
import type { Project } from "@/data/projects"

interface CaseStudyFormProps {
  caseStudy?: CaseStudy
  isEditing?: boolean
}

export function CaseStudyForm({ caseStudy, isEditing = false }: CaseStudyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [formData, setFormData] = useState({
    title: caseStudy?.title || "",
    subtitle: caseStudy?.subtitle || "",
    projectSlug: caseStudy?.projectSlug || "",
    projectOverview: caseStudy?.projectOverview || "",
    challengesFaced: caseStudy?.challengesFaced?.join("\n") || "",
    solutionsApproach: caseStudy?.solutionsImplemented?.approach || "",
    solutionsStrategies: caseStudy?.solutionsImplemented?.strategies?.join("\n") || "",
    solutionsExecution: caseStudy?.solutionsImplemented?.execution || "",
    solutionsExecutionDetails: caseStudy?.solutionsImplemented?.executionDetails?.join("\n") || "",
    resultsAchieved: caseStudy?.resultsAchieved?.join("\n") || "",
    conclusion: caseStudy?.conclusion || "",
    featured: caseStudy?.featured || false,
    heroImage: caseStudy?.heroImage || "",
    galleryImages: caseStudy?.galleryImages || [],
    metaDescription: caseStudy?.metaDescription || "",
    keywords: caseStudy?.keywords?.join("\n") || "",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const allProjects = getAllProjects()
      setProjects(allProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const caseStudyData = {
        ...formData,
        challengesFaced: formData.challengesFaced.split("\n").filter((c) => c.trim()),
        solutionsImplemented: {
          approach: formData.solutionsApproach,
          strategies: formData.solutionsStrategies.split("\n").filter((s) => s.trim()),
          execution: formData.solutionsExecution,
          executionDetails: formData.solutionsExecutionDetails.split("\n").filter((d) => d.trim()),
        },
        resultsAchieved: formData.resultsAchieved.split("\n").filter((r) => r.trim()),
        keywords: formData.keywords.split("\n").filter((k) => k.trim()),
        technologiesUtilized: [],
        lessonsLearned: [],
        keyMetrics: [],
        testimonials: [],
      }

      const url = isEditing ? `/api/admin/case-studies/${caseStudy?.id}` : "/api/admin/case-studies"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseStudyData),
      })

      if (response.ok) {
        router.push("/my-admin/case-studies")
      } else {
        console.error("Error saving case study")
      }
    } catch (error) {
      console.error("Error saving case study:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (url: string) => {
    if (!formData.heroImage) {
      setFormData({ ...formData, heroImage: url })
    } else {
      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, url],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Core case study details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Case Study Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectSlug">Related Project</Label>
            <Select
              value={formData.projectSlug}
              onValueChange={(value) => setFormData({ ...formData, projectSlug: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.slug} value={project.slug}>
                    {project.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
            />
            <Label htmlFor="featured">Featured Case Study</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Detailed project description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectOverview">Project Overview</Label>
            <Textarea
              id="projectOverview"
              value={formData.projectOverview}
              onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
              rows={6}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Challenges & Solutions</CardTitle>
          <CardDescription>Project challenges and implemented solutions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challengesFaced">Challenges Faced (one per line)</Label>
            <Textarea
              id="challengesFaced"
              value={formData.challengesFaced}
              onChange={(e) => setFormData({ ...formData, challengesFaced: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solutionsApproach">Solutions Approach</Label>
            <Textarea
              id="solutionsApproach"
              value={formData.solutionsApproach}
              onChange={(e) => setFormData({ ...formData, solutionsApproach: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solutionsStrategies">Solutions Strategies (one per line)</Label>
            <Textarea
              id="solutionsStrategies"
              value={formData.solutionsStrategies}
              onChange={(e) => setFormData({ ...formData, solutionsStrategies: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solutionsExecution">Solutions Execution</Label>
            <Textarea
              id="solutionsExecution"
              value={formData.solutionsExecution}
              onChange={(e) => setFormData({ ...formData, solutionsExecution: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solutionsExecutionDetails">Execution Details (one per line)</Label>
            <Textarea
              id="solutionsExecutionDetails"
              value={formData.solutionsExecutionDetails}
              onChange={(e) => setFormData({ ...formData, solutionsExecutionDetails: e.target.value })}
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results & Conclusion</CardTitle>
          <CardDescription>Project outcomes and conclusions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resultsAchieved">Results Achieved (one per line)</Label>
            <Textarea
              id="resultsAchieved"
              value={formData.resultsAchieved}
              onChange={(e) => setFormData({ ...formData, resultsAchieved: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conclusion">Conclusion</Label>
            <Textarea
              id="conclusion"
              value={formData.conclusion}
              onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
              rows={6}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO & Marketing</CardTitle>
          <CardDescription>Search engine optimization and marketing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (one per line)</Label>
            <Textarea
              id="keywords"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>Upload case study images</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload onUpload={handleImageUpload} folder="case-studies" maxFiles={10} />
          {formData.heroImage && (
            <div className="mt-4">
              <Label>Hero Image</Label>
              <p className="text-sm text-gray-600">{formData.heroImage}</p>
            </div>
          )}
          {formData.galleryImages.length > 0 && (
            <div className="mt-4">
              <Label>Gallery Images</Label>
              <ul className="text-sm text-gray-600">
                {formData.galleryImages.map((img, index) => (
                  <li key={index}>{img}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={() => router.push("/my-admin/case-studies")}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Update Case Study" : "Create Case Study"}
        </Button>
      </div>
    </form>
  )
}

"use client"

import { use, useState, useEffect } from "react"
import { CaseStudyForm } from "@/components/admin/case-study-form"
import type { CaseStudy } from "@/data/case-studies"

export default function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCaseStudy()
  }, [])

  const fetchCaseStudy = async () => {
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`)
      if (response.ok) {
        const data = await response.json()
        setCaseStudy(data)
      }
    } catch (error) {
      console.error("Error fetching case study:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!caseStudy) {
    return <div>Case study not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Case Study</h1>
        <p className="text-gray-600 mt-2">Update case study information</p>
      </div>
      <CaseStudyForm caseStudy={caseStudy} isEditing />
    </div>
  )
}

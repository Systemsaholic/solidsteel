import { CaseStudyForm } from "@/components/admin/case-study-form"

export default function NewCaseStudyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Case Study</h1>
        <p className="text-gray-600 mt-2">Create a detailed case study</p>
      </div>
      <CaseStudyForm />
    </div>
  )
}

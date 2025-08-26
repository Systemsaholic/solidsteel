import { ProjectForm } from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
        <p className="text-gray-600 mt-2">Create a new construction project</p>
      </div>
      <ProjectForm />
    </div>
  )
}

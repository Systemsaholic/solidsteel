'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { getAllProjects } from "@/lib/projects"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"

export default function ProjectsPage() {
  const projects = getAllProjects()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleProjectNavigation = (slug: string) => {
    setIsNavigating(true)
    router.push(`/projects/${slug}`)

    // Reset navigation state after delay
    setTimeout(() => {
      setIsNavigating(false)
    }, 500)
  }

  return (
    <>
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
      )}

      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Our Projects</h1>
            <p className="text-xl text-blue-100">Explore our portfolio of completed commercial construction projects</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <EnhancedProjectCard 
                key={project.id} 
                project={project} 
                onNavigate={handleProjectNavigation} 
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

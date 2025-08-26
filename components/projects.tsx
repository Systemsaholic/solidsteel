"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getAllProjects, getProjectsByCategory, getProjectCategories } from "@/lib/projects"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const allProjects = getAllProjects()
  const categories = getProjectCategories()

  const categoryOptions = [
    { id: "all", name: "All Projects" },
    ...categories.map((cat) => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
  ]

  const filteredProjects = activeCategory === "all" ? allProjects : getProjectsByCategory(activeCategory as any)

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

      <section id="projects" className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-700 mb-3 sm:mb-4">Our Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4 sm:px-0">
              Our work speaks for itself. Explore our portfolio of completed commercial construction projects that
              showcase our commitment to quality, safety, and lasting value.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0">
            {categoryOptions.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={cn(
                  "text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3",
                  activeCategory === category.id
                    ? "bg-blue-900 text-white hover:bg-blue-800"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900",
                )}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <EnhancedProjectCard key={project.id} project={project} onNavigate={handleProjectNavigation} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

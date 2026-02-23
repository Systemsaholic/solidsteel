"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useProjectImages } from "@/hooks/useProjectImages"
import type { Project } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { projectHasCaseStudy } from "@/lib/case-studies"
import { useRouter } from "next/navigation"

interface EnhancedProjectCardProps {
  project: Project
  onNavigate: (slug: string) => void
}

export function EnhancedProjectCard({ project, onNavigate }: EnhancedProjectCardProps) {
  const { heroImage, isLoading } = useProjectImages(project.slug)
  const hasCaseStudy = projectHasCaseStudy(project.slug)
  const router = useRouter()
  
  // Prioritize blob storage images (heroImage) over static fallbacks
  const imageSource = heroImage || project.image || "/placeholder.svg?height=400&width=600&query=construction project"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition duration-300 group">
      <div className="relative h-64 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <Image
            src={imageSource}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            quality={75}
          />
        )}
        {/* Status badge */}
        {project.status && (
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              project.status === 'completed' ? 'bg-green-100 text-green-800' :
              project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        {/* Project details */}
        {(project.location || project.squareFootage) && (
          <div className="text-sm text-gray-500 mb-3 space-y-1">
            {project.location && <div>📍 {project.location}</div>}
            {project.squareFootage && <div>📐 {project.squareFootage}</div>}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-900 font-medium capitalize">{project.category}</span>
          <button
            onClick={() => onNavigate(project.slug)}
            className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors duration-200"
          >
            View Details →
          </button>
        </div>
        {hasCaseStudy && (
          <Button
            onClick={() => router.push(`/case-studies/${project.slug}`)}
            variant="secondary"
            className="w-full mt-2"
          >
            View Case Study →
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

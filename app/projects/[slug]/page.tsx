"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Building, Loader2, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects"
import { useProjectImages } from "@/hooks/useProjectImages"
import { GalleryModal } from "@/components/gallery-modal"
import type { Project } from "@/data/projects"
import { projectHasCaseStudy } from "@/lib/case-studies"

type Props = {
  params: Promise<{ slug: string }>
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params)
  const [project, setProject] = useState<Project | null>(() => getProjectBySlug(slug) || null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>(() => {
    const p = getProjectBySlug(slug)
    return p ? getRelatedProjects(p.slug, 3) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const router = useRouter()

  // Get dynamic images for this project from blob storage
  const { heroImage, galleryImages, isLoading: imagesLoading, error: imagesError } = useProjectImages(slug)

  // Scroll to top and load project data when slug changes
  useEffect(() => {
    // Scroll to top immediately when navigating to a new project
    window.scrollTo({ top: 0, behavior: "smooth" })
    
    const foundProject = getProjectBySlug(slug)

    if (foundProject) {
      setProject(foundProject)
      setRelatedProjects(getRelatedProjects(foundProject.slug, 3))
    } else {
      setProject(null)
      setRelatedProjects([])
    }

    setIsLoading(false)
  }, [slug])

  // Handle navigation with loading state
  const handleNavigation = (href: string) => {
    setIsNavigating(true)
    router.push(href)

    // Reset navigation state after a delay
    setTimeout(() => {
      setIsNavigating(false)
    }, 500)
  }

  // Loading state
  if (isLoading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  const hasCaseStudy = project ? projectHasCaseStudy(project.slug) : false

  // Use only blob storage images - no fallbacks
  const displayHeroImage = heroImage
  const displayGalleryImages = galleryImages
  
  // Combine hero image with gallery for modal viewing
  const allImages = displayHeroImage ? [displayHeroImage, ...displayGalleryImages] : displayGalleryImages
  
  const handleImageClick = (index: number, includeHero: boolean = false) => {
    // If clicking gallery image, adjust index to account for hero image being first
    const modalIndex = includeHero ? 0 : index + 1
    setSelectedImageIndex(modalIndex)
    setGalleryModalOpen(true)
  }
  
  const handleGalleryNavigate = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
    <>
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col max-w-4xl">
            <button
              onClick={() => handleNavigation("/projects")}
              className="flex items-center text-blue-100 hover:text-white mb-6 transition-colors duration-200 w-fit"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Projects
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-blue-50">{project.title}</h1>

            {/* Project Meta Information */}
            <div className="flex flex-wrap gap-6 text-blue-100">
              {project.location && (
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>{project.location}</span>
                </div>
              )}
              {project.completionDate && (
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>Completed: {project.completionDate}</span>
                </div>
              )}
              {project.squareFootage && (
                <div className="flex items-center">
                  <Building size={18} className="mr-2" />
                  <span>{project.squareFootage}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8 cursor-pointer group"
                onClick={() => handleImageClick(0, true)}
              >
                {imagesLoading ? (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  </div>
                ) : displayHeroImage ? (
                  <>
                    <Image
                      src={displayHeroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                      <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
              </div>

              {/* Gallery Grid — show first 6, lazy load */}
              {!imagesLoading && displayGalleryImages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {displayGalleryImages.slice(0, 6).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-[120px] md:h-[150px] rounded-lg overflow-hidden group cursor-pointer"
                        onClick={() => handleImageClick(index)}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} gallery ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 22vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          quality={60}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                          <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {displayGalleryImages.length > 6 && (
                    <button
                      onClick={() => { setSelectedImageIndex(0); setGalleryModalOpen(true) }}
                      className="text-sm text-blue-700 hover:text-blue-900 font-medium mt-3"
                    >
                      View all {displayGalleryImages.length + 1} photos →
                    </button>
                  )}
                </div>
              )}

              {/* Loading skeleton */}
              {imagesLoading && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="h-[120px] md:h-[150px] bg-gray-200 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {/* Project Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-blue-700 mb-4">Project Overview</h2>
                  <p className="text-gray-700">{project.description}</p>
                </div>

                {/* Challenge & Solution - Only show if both exist */}
                {project.challenge && project.solution && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700 mb-3">The Challenge</h3>
                      <p className="text-gray-700">{project.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Solution</h3>
                      <p className="text-gray-700">{project.solution}</p>
                    </div>
                  </div>
                )}

                {/* Results - Only show if exists */}
                {project.results && (
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Results</h3>
                    <p className="text-gray-700">{project.results}</p>
                  </div>
                )}

                {/* Key Features - Only show if exists */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700 mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="text-blue-900 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-100 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Project Details</h3>
                <div className="space-y-4 mb-6">
                  {project.client && (
                    <div>
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Project Type</p>
                    <p className="font-medium capitalize">{project.category}</p>
                  </div>
                  {project.squareFootage && (
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium">{project.squareFootage}</p>
                    </div>
                  )}
                  {project.completionDate && (
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium">{project.completionDate}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => handleNavigation("/#contact")}
                    className="w-full bg-blue-900 hover:bg-blue-800"
                  >
                    Request Similar Project
                  </Button>
                  <Button onClick={() => handleNavigation("/projects")} variant="outline" className="w-full">
                    View More Projects
                  </Button>
                  {hasCaseStudy && project && (
                    <Button
                      onClick={() => handleNavigation(`/case-studies/${project.slug}`)}
                      className="w-full bg-yellow-600 hover:bg-yellow-500 text-white"
                    >
                      View Detailed Case Study
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        images={allImages}
        currentIndex={selectedImageIndex}
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        onNavigate={handleGalleryNavigate}
        title={project?.title}
      />

      {/* Related Projects - Only show if there are related projects */}
      {relatedProjects.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <Card key={relatedProject.id} className="overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={relatedProject.image || "/placeholder.svg?height=300&width=400&query=construction project"}
                      alt={relatedProject.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-blue-700 mb-2">{relatedProject.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProject.description}</p>
                    <Button
                      onClick={() => handleNavigation(`/projects/${relatedProject.slug}`)}
                      className="w-full"
                      variant="outline"
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

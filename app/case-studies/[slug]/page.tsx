"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GalleryModal } from "@/components/gallery-modal"
import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/case-studies"
import { getProjectBySlug } from "@/lib/projects"
import { useProjectImages } from "@/hooks/useProjectImages"
import { CaseStudyHeader } from "@/components/case-study/case-study-header"
import { RelatedCaseStudyCard } from "@/components/case-study/related-case-study-card"
import { CaseStudyOverview } from "@/components/case-study/case-study-overview"
import { CaseStudyChallenges } from "@/components/case-study/case-study-challenges"
import { CaseStudySolutions } from "@/components/case-study/case-study-solutions"
import { CaseStudyTechnologies } from "@/components/case-study/case-study-technologies"
import { CaseStudyResults } from "@/components/case-study/case-study-results"
import { CaseStudyLessons } from "@/components/case-study/case-study-lessons"
import { CaseStudyMetrics } from "@/components/case-study/case-study-metrics"
import { CaseStudyTestimonials } from "@/components/case-study/case-study-testimonials"
import type { CaseStudy } from "@/data/case-studies"

type Props = {
  params: Promise<{ slug: string }>
}

export default function CaseStudyPage({ params }: Props) {
  const { slug } = use(params)
  const [isNavigating, setIsNavigating] = useState(false)
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const router = useRouter()

  // Get case study data directly without loading state
  const caseStudy = getCaseStudyBySlug(slug)
  const relatedCaseStudies = caseStudy ? getRelatedCaseStudies(caseStudy.slug, 3) : []

  const handleNavigation = (href: string) => {
    setIsNavigating(true)
    router.push(href)
    setTimeout(() => setIsNavigating(false), 500)
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Case Study Not Found</h1>
          <p className="text-gray-600">The requested case study could not be found.</p>
        </div>
      </div>
    )
  }

  const project = getProjectBySlug(caseStudy.projectSlug)
  
  // Use the project images hook to get images from blob storage
  const { heroImage: blobHeroImage, galleryImages: blobGalleryImages, isLoading: imagesLoading } = useProjectImages(caseStudy.projectSlug)
  
  // Use blob images if available, otherwise fall back to case study data
  const heroImage = blobHeroImage || caseStudy.heroImage || "/placeholder.svg"
  const galleryImages = blobGalleryImages.length > 0 ? blobGalleryImages : caseStudy.galleryImages
  
  // Combine hero image with gallery for modal viewing
  const allImages = heroImage ? [heroImage, ...galleryImages] : galleryImages
  
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
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      <CaseStudyHeader caseStudy={caseStudy} />

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
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <>
                    <Image
                      src={heroImage}
                      alt={caseStudy.title}
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
                )}
              </div>

              {/* Gallery */}
              {!imagesLoading && galleryImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-12">
                  {galleryImages.slice(0, 3).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-[120px] rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => handleImageClick(index)}
                    >
                      <Image
                        src={image}
                        alt={`${caseStudy.title} gallery ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 33vw, 22vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        quality={60}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                        <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-12">
                <CaseStudyOverview caseStudy={caseStudy} />
                <CaseStudyChallenges caseStudy={caseStudy} />
                <CaseStudySolutions caseStudy={caseStudy} />
                <CaseStudyTechnologies caseStudy={caseStudy} />
                <CaseStudyResults caseStudy={caseStudy} />
                <CaseStudyLessons caseStudy={caseStudy} />
                <CaseStudyMetrics caseStudy={caseStudy} />
                <CaseStudyTestimonials caseStudy={caseStudy} />

                {/* Conclusion */}
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">Conclusion</h2>
                  <p className="text-gray-700">{caseStudy.conclusion}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-gray-100 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Case Study Details</h3>
                <div className="space-y-4 mb-6">
                  {project?.client && (
                    <div>
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  )}
                  {project?.location && (
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Project Type</p>
                    <p className="font-medium capitalize">{project?.category || "N/A"}</p>
                  </div>
                  {project?.squareFootage && (
                    <div>
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium">{project.squareFootage}</p>
                    </div>
                  )}
                  {project?.completionDate && (
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium">{project.completionDate}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="font-medium">{caseStudy.publishedDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={() => handleNavigation("/#contact")}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-white"
                  >
                    Request Similar Project
                  </Button>
                  {project && (
                    <Button
                      onClick={() => handleNavigation(`/projects/${project.slug}`)}
                      variant="outline"
                      className="w-full"
                    >
                      View Project Details
                    </Button>
                  )}
                  <Button onClick={() => handleNavigation("/case-studies")} variant="outline" className="w-full">
                    View More Case Studies
                  </Button>
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
        title={caseStudy?.title}
      />

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">Related Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCaseStudies.map((relatedCaseStudy) => (
                <RelatedCaseStudyCard
                  key={relatedCaseStudy.id}
                  caseStudy={relatedCaseStudy}
                  onNavigate={handleNavigation}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

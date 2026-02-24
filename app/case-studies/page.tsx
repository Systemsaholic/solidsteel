"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, AlertTriangle, CheckCircle, Clock, Award } from "lucide-react"
import { getAllCaseStudies, getFeaturedCaseStudies } from "@/lib/case-studies"
import { getProjectBySlug } from "@/lib/projects"
import { useProjectImages } from "@/hooks/useProjectImages"
import type { CaseStudy } from "@/data/case-studies"

// Metadata moved to layout or could be set via generateMetadata for dynamic content

// Component to handle image loading with blob storage
function CaseStudyImage({ caseStudy, size }: { caseStudy: CaseStudy; size: "large" | "small" }) {
  const { heroImage, isLoading } = useProjectImages(caseStudy.projectSlug)
  const imageSource = heroImage || caseStudy.heroImage || "/placeholder.svg"

  if (isLoading) {
    return <div className="w-full h-full bg-gray-200 animate-pulse" />
  }

  return (
    <Image
      src={imageSource}
      alt={caseStudy.title}
      fill
      sizes={size === "large" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
      className="object-cover"
      loading={size === "large" ? "eager" : "lazy"}
      quality={60}
    />
  )
}

export default function CaseStudiesPage() {
  const featuredCaseStudies = getFeaturedCaseStudies(1)
  const allCaseStudies = getAllCaseStudies()

  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Case Studies</h1>
            <p className="text-xl text-blue-100 mb-8">
              Real-world examples of how we successfully rescue and complete troubled construction projects. Each case
              study provides detailed insights into our approach, challenges overcome, and results achieved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-blue-800 px-3 py-1 rounded-full">Detailed Project Analysis</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full">Proven Recovery Methods</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full">Client Testimonials</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full">Lessons Learned</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Featured Case Study */}
          {featuredCaseStudies.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">Featured Case Study</h2>
              {featuredCaseStudies.map((caseStudy) => {
                const project = getProjectBySlug(caseStudy.projectSlug)
                return (
                  <Card key={caseStudy.id} className="overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <CaseStudyImage caseStudy={caseStudy} size="large" />
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="flex items-center mb-4">
                          <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                            <AlertTriangle size={14} className="mr-1" />
                            Distressed Takeover
                          </span>
                          {project && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full ml-2 capitalize">
                              {project.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-blue-700 mb-2">{caseStudy.title}</h3>
                        <p className="text-xl text-gray-500 mb-6">{caseStudy.subtitle}</p>
                        <p className="text-gray-700 mb-6 line-clamp-3">{caseStudy.projectOverview}</p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <Clock className="mx-auto text-blue-700 mb-1" size={20} />
                            <div className="text-lg font-bold text-blue-700">6 Months</div>
                            <div className="text-xs text-gray-600">To Completion</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="mx-auto text-blue-700 mb-1" size={20} />
                            <div className="text-lg font-bold text-blue-700">100%</div>
                            <div className="text-xs text-gray-600">Success Rate</div>
                          </div>
                        </div>

                        <Button asChild className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                          <Link href={`/case-studies/${caseStudy.slug}`} className="flex items-center justify-center">
                            Read Full Case Study
                            <ArrowRight size={16} className="ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {/* All Case Studies */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">All Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCaseStudies.map((caseStudy) => {
                const project = getProjectBySlug(caseStudy.projectSlug)
                return (
                  <Card key={caseStudy.id} className="overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <CaseStudyImage caseStudy={caseStudy} size="small" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          Case Study
                        </span>
                        {project && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full ml-2 capitalize">
                            {project.category}
                          </span>
                        )}
                        {caseStudy.featured && <Award className="text-yellow-500 ml-2" size={16} />}
                      </div>
                      <h3 className="text-xl font-bold text-blue-700 mb-2">{caseStudy.title}</h3>
                      <p className="text-gray-500 mb-3">{caseStudy.subtitle}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{caseStudy.projectOverview}</p>

                      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <span>{project?.location || "Location Confidential"}</span>
                        <span>{caseStudy.publishedDate.toLocaleDateString()}</span>
                      </div>

                      <Button asChild className="w-full bg-transparent" variant="outline">
                        <Link href={`/case-studies/${caseStudy.slug}`}>View Case Study</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-red-50 rounded-lg p-8 max-w-4xl mx-auto mt-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Facing a Troubled Construction Project?</h3>
                <p className="text-gray-700 mb-6">
                  Don't let a distressed project become a complete loss. Our specialized team can assess your situation
                  and provide a clear recovery path forward. We offer confidential consultations to evaluate your
                  options.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Prompt and thorough project assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Confidential project evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Strategic recovery planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Transparent cost and timeline projections</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3">
                <Button asChild size="lg" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white">
                  <Link href="/#contact">Request Project Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

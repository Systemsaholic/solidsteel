import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { CaseStudy } from "@/data/case-studies"
import { getProjectBySlug } from "@/lib/projects"

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy
}

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const project = getProjectBySlug(caseStudy.projectSlug)

  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col max-w-4xl">
          <Link
            href="/case-studies"
            className="flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Case Studies
          </Link>

          <div className="flex items-center mb-4 gap-2">
            <Badge className="bg-red-100 text-red-800">Detailed Case Study</Badge>
            {project && <Badge className="bg-blue-100 text-blue-800 capitalize">{project.category}</Badge>}
            {caseStudy.featured && <Badge className="bg-yellow-500 text-white">Featured</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">{caseStudy.title}</h1>
          <p className="text-xl text-blue-100 mb-6">{caseStudy.subtitle}</p>

          <div className="flex flex-wrap gap-6 text-blue-100">
            {project?.location && (
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                <span>{project.location}</span>
              </div>
            )}
            {project?.completionDate && (
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>Completed: {project.completionDate}</span>
              </div>
            )}
            {project?.squareFootage && (
              <div className="flex items-center">
                <Building size={18} className="mr-2" />
                <span>{project.squareFootage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

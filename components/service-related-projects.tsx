import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/data/projects"

interface ServiceRelatedProjectsProps {
  serviceSlugs: string[]
}

export function ServiceRelatedProjects({ serviceSlugs }: ServiceRelatedProjectsProps) {
  const relatedProjects = projects.filter(
    (p) => p.serviceSlugs?.some((s) => serviceSlugs.includes(s))
  )

  if (relatedProjects.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Related Projects</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            See how we've delivered results for clients with similar needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {relatedProjects.slice(0, 3).map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <Card className="card-hover h-full overflow-hidden">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                    {project.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {project.location}
                      </span>
                    )}
                    {project.completionDate && (
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {project.completionDate}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

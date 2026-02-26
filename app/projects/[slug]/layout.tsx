import type React from "react"
import type { Metadata } from "next"
import { getProjectBySlug } from "@/lib/projects"

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Project Case Study`,
    description: project.description,
    keywords: [
      `${project.category} construction`,
      "commercial construction project",
      "construction case study",
      ...(project.location ? [`construction ${project.location}`] : []),
    ],
    openGraph: {
      title: `${project.title} | Solid Steel Management Project`,
      description: project.description,
      url: `https://solidsteelmgt.ca/projects/${project.slug}`,
      images: [
        {
          url: project.image || "/placeholder.svg?height=630&width=1200",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default function ProjectLayout({ children }: Props) {
  return <>{children}</>
}

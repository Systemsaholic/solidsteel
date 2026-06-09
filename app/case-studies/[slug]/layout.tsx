import type React from "react"
import type { Metadata } from "next"
import { getCaseStudyBySlug } from "@/lib/case-studies"
import { getProjectBySlug } from "@/lib/projects"
import { truncateDescription } from "@/lib/seo"

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    }
  }

  const project = getProjectBySlug(caseStudy.projectSlug)
  const description = truncateDescription(`${caseStudy.subtitle}. ${caseStudy.projectOverview}`)

  return {
    title: `${caseStudy.title} | Case Study`,
    description,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title: `${caseStudy.title} | Solid Steel Management Case Study`,
      description,
      url: `https://solidsteelmgt.ca/case-studies/${caseStudy.slug}`,
      images: [
        {
          url: project?.image || "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
  }
}

export default function CaseStudyLayout({ children }: Props) {
  return <>{children}</>
}

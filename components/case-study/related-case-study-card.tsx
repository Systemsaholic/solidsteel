"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProjectImages } from "@/hooks/useProjectImages"
import type { CaseStudy } from "@/data/case-studies"

interface RelatedCaseStudyCardProps {
  caseStudy: CaseStudy
  onNavigate: (href: string) => void
}

export function RelatedCaseStudyCard({ caseStudy, onNavigate }: RelatedCaseStudyCardProps) {
  const { heroImage, isLoading } = useProjectImages(caseStudy.projectSlug)
  
  // Use blob image if available, otherwise fall back to case study data
  const imageSource = heroImage || caseStudy.heroImage || "/placeholder.svg"
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition duration-300">
      <div className="h-48 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={imageSource}
            alt={caseStudy.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-blue-900 mb-1">{caseStudy.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{caseStudy.subtitle}</p>
        <Button
          onClick={() => onNavigate(`/case-studies/${caseStudy.slug}`)}
          className="w-full mt-2"
          variant="outline"
        >
          View Case Study
        </Button>
      </CardContent>
    </Card>
  )
}
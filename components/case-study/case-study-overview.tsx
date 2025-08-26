import { Card, CardContent } from "@/components/ui/card"
import type { CaseStudy } from "@/data/case-studies"

interface CaseStudyOverviewProps {
  caseStudy: CaseStudy
}

export function CaseStudyOverview({ caseStudy }: CaseStudyOverviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Project Overview</h2>
        <p className="text-gray-700 leading-relaxed">{caseStudy.projectOverview}</p>
      </div>

      {caseStudy.timeline && caseStudy.timeline.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Project Timeline</h3>
          <div className="space-y-4">
            {caseStudy.timeline.map((phase, index) => (
              <Card key={index} className="border-l-4 border-blue-900">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-blue-900">{phase.phase}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{phase.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{phase.description}</p>

                  {phase.challenges && phase.challenges.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-red-700 mb-1">Key Challenges:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {phase.challenges.map((challenge, idx) => (
                          <li key={idx}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {phase.outcomes && phase.outcomes.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Outcomes:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {phase.outcomes.map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import { CheckCircle } from "lucide-react"
import type { CaseStudy } from "@/data/case-studies"

interface CaseStudyResultsProps {
  caseStudy: CaseStudy
}

export function CaseStudyResults({ caseStudy }: CaseStudyResultsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Results Achieved</h2>
      <div className="bg-green-50 rounded-lg p-6">
        <ul className="space-y-3">
          {caseStudy.resultsAchieved.map((result, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-700">{result}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

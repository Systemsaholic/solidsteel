import { CheckCircle } from "lucide-react"
import type { CaseStudy } from "@/data/case-studies"

interface CaseStudySolutionsProps {
  caseStudy: CaseStudy
}

export function CaseStudySolutions({ caseStudy }: CaseStudySolutionsProps) {
  const { solutionsImplemented } = caseStudy

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Solutions Implemented</h2>
        <p className="text-gray-700 mb-6">{solutionsImplemented.approach}</p>

        <h3 className="text-xl font-semibold text-blue-900 mb-3">Strategic Approach</h3>
        <ul className="space-y-3 mb-8">
          {solutionsImplemented.strategies.map((strategy, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-blue-900 mr-3 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-700">{strategy}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Execution</h3>
        <p className="text-gray-700 mb-6">{solutionsImplemented.execution}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutionsImplemented.executionDetails.map((detail, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 flex items-start">
                <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={18} />
                {detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

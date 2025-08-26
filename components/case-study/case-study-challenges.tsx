import { XCircle } from "lucide-react"
import type { CaseStudy } from "@/data/case-studies"

interface CaseStudyChallengesProps {
  caseStudy: CaseStudy
}

export function CaseStudyChallenges({ caseStudy }: CaseStudyChallengesProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Challenges Faced</h2>
      <div className="bg-red-50 rounded-lg p-6">
        <ul className="space-y-3">
          {caseStudy.challengesFaced.map((challenge, index) => (
            <li key={index} className="flex items-start">
              <XCircle className="text-red-600 mr-3 mt-1 flex-shrink-0" size={18} />
              <span className="text-gray-700">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

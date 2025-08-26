import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Wrench, Zap, Shield, Hammer, Cog, HardHat } from "lucide-react"
import type { CaseStudy, CaseStudyTechnology } from "@/data/case-studies"

interface CaseStudyTechnologiesProps {
  caseStudy: CaseStudy
}

function getTechnologyIcon(category: CaseStudyTechnology["category"]) {
  switch (category) {
    case "structural":
      return <Hammer className="text-blue-900" size={24} />
    case "mechanical":
      return <Cog className="text-blue-900" size={24} />
    case "electrical":
      return <Zap className="text-blue-900" size={24} />
    case "safety":
      return <Shield className="text-blue-900" size={24} />
    case "materials":
      return <Wrench className="text-blue-900" size={24} />
    case "equipment":
      return <HardHat className="text-blue-900" size={24} />
    default:
      return <Wrench className="text-blue-900" size={24} />
  }
}

function getCategoryColor(category: CaseStudyTechnology["category"]) {
  switch (category) {
    case "structural":
      return "bg-blue-100 text-blue-800"
    case "mechanical":
      return "bg-green-100 text-green-800"
    case "electrical":
      return "bg-yellow-100 text-yellow-800"
    case "safety":
      return "bg-red-100 text-red-800"
    case "materials":
      return "bg-purple-100 text-purple-800"
    case "equipment":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function CaseStudyTechnologies({ caseStudy }: CaseStudyTechnologiesProps) {
  if (!caseStudy.technologiesUtilized || caseStudy.technologiesUtilized.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Technologies Utilized</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudy.technologiesUtilized.map((technology, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getTechnologyIcon(technology.category)}
                  <h3 className="text-lg font-semibold text-blue-900 ml-3">{technology.name}</h3>
                </div>
                <Badge className={getCategoryColor(technology.category)}>{technology.category}</Badge>
              </div>

              <p className="text-gray-700 mb-3">{technology.description}</p>

              {technology.impact && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1">Impact:</p>
                  <p className="text-sm text-blue-800">{technology.impact}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

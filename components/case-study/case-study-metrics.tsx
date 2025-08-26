import { Card, CardContent } from "@/components/ui/card"
import { Clock, DollarSign, Award, Shield, TrendingUp, Users } from "lucide-react"
import type { CaseStudy, CaseStudyMetric } from "@/data/case-studies"

interface CaseStudyMetricsProps {
  caseStudy: CaseStudy
}

function getMetricIcon(category: CaseStudyMetric["category"]) {
  switch (category) {
    case "timeline":
      return <Clock className="text-blue-900" size={24} />
    case "budget":
      return <DollarSign className="text-blue-900" size={24} />
    case "quality":
      return <Award className="text-blue-900" size={24} />
    case "safety":
      return <Shield className="text-blue-900" size={24} />
    case "performance":
      return <TrendingUp className="text-blue-900" size={24} />
    case "stakeholder":
      return <Users className="text-blue-900" size={24} />
    default:
      return <TrendingUp className="text-blue-900" size={24} />
  }
}

export function CaseStudyMetrics({ caseStudy }: CaseStudyMetricsProps) {
  if (!caseStudy.keyMetrics || caseStudy.keyMetrics.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Key Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudy.keyMetrics.map((metric, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-center mb-3">{getMetricIcon(metric.category)}</div>
              <div className="text-2xl font-bold text-blue-900 mb-2">{metric.value}</div>
              <div className="text-gray-900 font-medium mb-2">{metric.label}</div>
              {metric.description && <div className="text-sm text-gray-600">{metric.description}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

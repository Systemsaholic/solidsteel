import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Building, DollarSign, Shield, Wrench } from "lucide-react"
import type { CaseStudy, CaseStudyLesson } from "@/data/case-studies"

interface CaseStudyLessonsProps {
  caseStudy: CaseStudy
}

function getLessonIcon(category: CaseStudyLesson["category"]) {
  switch (category) {
    case "technical":
      return <Wrench className="text-blue-900" size={20} />
    case "management":
      return <Users className="text-blue-900" size={20} />
    case "financial":
      return <DollarSign className="text-blue-900" size={20} />
    case "regulatory":
      return <Building className="text-blue-900" size={20} />
    case "safety":
      return <Shield className="text-blue-900" size={20} />
    default:
      return <Lightbulb className="text-blue-900" size={20} />
  }
}

function getAudienceColor(audience: CaseStudyLesson["audience"]) {
  switch (audience) {
    case "client":
      return "bg-blue-100 text-blue-800"
    case "industry":
      return "bg-green-100 text-green-800"
    case "both":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getCategoryColor(category: CaseStudyLesson["category"]) {
  switch (category) {
    case "technical":
      return "bg-orange-100 text-orange-800"
    case "management":
      return "bg-blue-100 text-blue-800"
    case "financial":
      return "bg-green-100 text-green-800"
    case "regulatory":
      return "bg-red-100 text-red-800"
    case "safety":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function CaseStudyLessons({ caseStudy }: CaseStudyLessonsProps) {
  if (!caseStudy.lessonsLearned || caseStudy.lessonsLearned.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Lessons Learned</h2>
      <div className="space-y-6">
        {caseStudy.lessonsLearned.map((lesson, index) => (
          <Card key={index} className="border-l-4 border-blue-900">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  {getLessonIcon(lesson.category)}
                  <h3 className="text-lg font-semibold text-blue-900 ml-3">{lesson.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Badge className={getAudienceColor(lesson.audience)}>
                    {lesson.audience === "both" ? "Client & Industry" : lesson.audience}
                  </Badge>
                  <Badge className={getCategoryColor(lesson.category)}>{lesson.category}</Badge>
                </div>
              </div>
              <p className="text-gray-700">{lesson.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import type { CaseStudy } from "@/data/case-studies"

interface CaseStudyTestimonialsProps {
  caseStudy: CaseStudy
}

export function CaseStudyTestimonials({ caseStudy }: CaseStudyTestimonialsProps) {
  if (!caseStudy.testimonials || caseStudy.testimonials.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Client Testimonials</h2>
      <div className="space-y-6">
        {caseStudy.testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-blue-50">
            <CardContent className="p-6">
              <Quote className="text-blue-900 mb-4" size={32} />
              <blockquote className="text-gray-700 italic text-lg mb-4">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.position}</p>
                  {testimonial.company && <p className="text-gray-500 text-sm">{testimonial.company}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

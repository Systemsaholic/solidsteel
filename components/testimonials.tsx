import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Solid Steel Management delivered our warehouse project on time and on budget. Their attention to detail and quality of work exceeded our expectations.",
      author: "Michael Johnson",
      position: "Operations Director, LogiTech Distribution",
    },
    {
      quote:
        "We've worked with Solid Steel on three separate projects. Their team's expertise in commercial construction is unmatched in the industry.",
      author: "Sarah Williams",
      position: "Facility Manager, AutoFleet Services",
    },
    {
      quote:
        "The team at Solid Steel Management understood our unique requirements and delivered a custom solution that perfectly met our needs.",
      author: "David Chen",
      position: "CEO, Pacific Manufacturing",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with Solid Steel
            Management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition duration-300">
              <CardContent className="p-8">
                <Quote className="text-blue-900 mb-4 h-8 w-8" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-blue-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

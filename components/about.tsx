import { CheckCircle, Award, Shield, Clock, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function About() {
  const credentials = [
    "General Liability & Builders Risk Insurance",
    "WSIB Certified | Health & Safety Committee",
    "Working at Heights Certified",
    "Crane & Hoisting Certification",
    "WHMIS & Safety Awareness Training",
  ]

  const highlights = [
    {
      icon: <Award className="text-yellow-500" size={24} />,
      value: "25+",
      label: "Years of Industry Experience",
    },
    {
      icon: <Users className="text-blue-900" size={24} />,
      value: "100+",
      label: "Projects Completed Nationwide",
    },
    {
      icon: <TrendingUp className="text-green-600" size={24} />,
      value: "$200M+",
      label: "in Construction Value Delivered",
    },
    {
      icon: <Clock className="text-blue-900" size={24} />,
      value: "100%",
      label: "On-Time Completion Rate",
    },
    {
      icon: <Shield className="text-green-600" size={24} />,
      value: "0",
      label: "Lost-Time Incidents (LTIR = 0)",
    },
    {
      icon: <CheckCircle className="text-yellow-500" size={24} />,
      value: "100%",
      label: "Client Satisfaction",
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-blue-50">
            Why Choose Solid Steel Management?
          </h2>
          <p className="text-blue-100 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
            Since our founding, Solid Steel Management has been guided by one principle: build with integrity. We
            deliver every project with the strength, structure, and dependability our name implies — whether steel is
            part of the blueprint or not.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-100">Credentials & Certifications</h3>
            <div className="space-y-3 sm:space-y-4">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="text-yellow-500 mr-3 mt-1 flex-shrink-0" size={18} />
                  <span className="text-blue-100 text-sm sm:text-base leading-relaxed">{credential}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-100">Performance Highlights</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((highlight, index) => (
                <Card key={index} className="bg-blue-800 hover:bg-blue-700 transition duration-300 border-0">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="flex justify-center mb-2">{highlight.icon}</div>
                    <div className="text-lg sm:text-2xl font-bold text-yellow-500 mb-1">{highlight.value}</div>
                    <div className="text-blue-100 text-xs sm:text-sm leading-tight">{highlight.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-yellow-600 hover:bg-yellow-500 text-white px-6 sm:px-8 py-3 w-full sm:w-auto">
            <Link href="/about">Learn More About Our Company</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

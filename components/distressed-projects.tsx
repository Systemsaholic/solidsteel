import { AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DistressedProjects() {
  const capabilities = [
    {
      icon: <AlertTriangle size={24} className="text-secondary" />,
      title: "Project Assessment",
      description: "Comprehensive evaluation of project status, challenges, and recovery options",
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "Team Restructuring",
      description: "Strategic team realignment and resource optimization for project success",
    },
    {
      icon: <Clock size={24} className="text-secondary" />,
      title: "Schedule Recovery",
      description: "Accelerated timelines and milestone management to get projects back on track",
    },
    {
      icon: <CheckCircle size={24} className="text-primary" />,
      title: "Quality Assurance",
      description: "Rigorous quality control to ensure all work meets or exceeds industry standards",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Turnaround Projects / Distressed Construction Takeovers
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Some projects don't go according to plan — that's where we come in. Our team specializes in taking over
            distressed or delayed construction projects, offering strategic recovery and expert management to bring
            troubled builds back on track, whether due to financial, legal, or technical setbacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <Card key={index} className="bg-white card-hover">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{capability.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">{capability.title}</h3>
                <p className="text-gray-600 text-sm">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">When Projects Need a Lifeline</h3>
              <p className="text-gray-700 mb-6">
                Construction projects can face unexpected challenges that threaten completion. Whether it's contractor
                abandonment, budget overruns, design issues, or regulatory complications, we step in with the expertise
                and resources needed to salvage your investment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-700">Rapid project assessment and recovery planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-700">Financial restructuring and budget optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-700">Legal and regulatory compliance management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-700">Quality remediation and construction completion</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary text-white p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Project Rescue & Turnaround</h4>
              <p className="mb-6">
                Don't let a troubled project become a total loss. Our specialized turnaround team can assess your
                situation and provide a strategic recovery path forward within 48 hours.
              </p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/#contact">Get Project Recovery Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

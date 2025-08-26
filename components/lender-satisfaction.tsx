import { FileText, Shield, TrendingUp, CheckCircle, Calculator } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LenderSatisfaction() {
  const capabilities = [
    {
      icon: <Calculator size={24} className="text-secondary" />,
      title: "Lender-Optimized Budget Creation",
      description: "Expert development of proforma budgets structured to meet financial institution requirements",
    },
    {
      icon: <FileText size={24} className="text-primary" />,
      title: "Financial Transparency",
      description: "Detailed reporting and documentation that satisfies lender oversight requirements",
    },
    {
      icon: <Shield size={24} className="text-secondary" />,
      title: "Risk Mitigation",
      description: "Comprehensive risk assessment and management to protect lender investments",
    },
    {
      icon: <TrendingUp size={24} className="text-primary" />,
      title: "Value Optimization",
      description: "Strategic construction management that maximizes asset value for all stakeholders",
    },
  ]

  const lenderBenefits = [
    "Expert creation of lender-friendly proforma budgets with appropriate contingencies",
    "Detailed cost breakdowns and progress reporting aligned with draw schedules",
    "Proactive communication of any budget variances with mitigation strategies",
    "Compliance with all lender requirements and construction loan covenants",
    "Regular third-party inspections and quality assurance documentation",
    "Accelerated project timelines to minimize carrying costs and interest expenses",
    "Value engineering solutions that enhance project ROI without compromising quality",
  ]

  return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
            Creating & Delivering Proforma Budgets That Lenders Approve
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto text-lg">
            When financing is critical to your project's success, you need more than just execution—you need expertise
            in creating budgets that lenders understand and favor. Solid Steel Management excels at developing
            sophisticated proforma budgets structured specifically to meet lender requirements, increasing your approval
            chances while ensuring realistic projections we can deliver on. From initial concept to final completion, we
            speak the financial language that opens doors with lending institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {capabilities.map((capability, index) => (
            <Card key={index} className="bg-white card-hover border-t-4 border-green-600">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{capability.icon}</div>
                <h3 className="text-lg font-semibold mb-3 text-blue-700">{capability.title}</h3>
                <p className="text-gray-600 text-sm">{capability.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-6">Why Lenders Choose Solid Steel Management</h3>
            <p className="text-gray-700 mb-6">
              Financial institutions and private lenders trust us because we understand what they're looking for before
              the first dollar is approved. We don't just execute budgets—we help create them with the structure,
              contingencies, and detailed breakdowns that lending institutions require. Our proforma budgets are
              designed from the ground up to align with lending guidelines while remaining achievable in real-world
              construction conditions.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're a bank, credit union, private lender, or institutional investor, our approach to budget
              development and construction management provides the confidence and control you need to approve financing
              with peace of mind.
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-700 mb-4">Our Financial Accountability Promise</h4>
              <ul className="space-y-3">
                {lenderBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-primary text-white">
              <CardContent className="p-6 md:p-8">
                <h4 className="text-xl font-semibold mb-4 text-white">For Lenders: Proforma Budget Validation</h4>
                <p className="mb-6">
                  Need confidence in a client's construction budget? Our third-party validation service gives you peace
                  of mind that the proforma budget represents a sound investment. Get a Solid Partnership with
                  construction experts who understand what lenders need to see.
                </p>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/proforma-budget-consultation">Request Budget Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">Specialized Lender Services</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Lender-optimized proforma budget development and structuring</li>
                <li>• Pre-construction budget validation and feasibility analysis</li>
                <li>• Construction loan draw schedule coordination and management</li>
                <li>• Third-party inspection coordination and compliance reporting</li>
                <li>• Distressed asset recovery and workout construction management</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">From Budget Creation to Project Completion</h3>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            When construction financing is on the line, you need a partner who understands the financial side as well as
            the construction side. Our expertise in creating lender-approved proforma budgets, combined with our
            systematic approach to project execution, ensures that your construction loan performs exactly as
            projected—from initial approval through final completion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/#contact">Discuss Your Lending Requirements</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
            >
              <Link href="/case-studies">View Our Track Record</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { ProformaBudgetForm } from "@/components/proforma-budget-form"
import { Calculator, FileText, Clock, TrendingUp, CheckCircle, DollarSign } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proforma Budget Consultation | Cost Planning",
  description:
    "Get proforma budget analysis for your commercial construction project. Expert cost planning, financial projections, and budget optimization.",
  alternates: { canonical: "/proforma-budget-consultation" },
  keywords: [
    "proforma budget consultation",
    "construction cost planning",
    "commercial construction budget",
    "project financial analysis",
    "construction cost estimation",
    "budget optimization Ontario",
    "construction financial planning",
  ],
  openGraph: {
    title: "Proforma Budget Consultation | Solid Steel Management",
    description: "Get expert proforma budget analysis and cost planning for your construction project.",
    url: "https://solidsteelmgt.ca/proforma-budget-consultation",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proforma Budget Consultation - Solid Steel Management",
      },
    ],
  },
}

export default function ProformaBudgetConsultationPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Proforma Budget Consultation</h1>
            <p className="text-xl text-blue-100 mb-8">
              Get comprehensive financial planning and budget analysis for your construction project. Our expert team
              provides detailed proforma budgets, cost optimization strategies, and financial projections to help you
              make informed decisions and secure project financing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Calculator className="text-yellow-500" size={24} />
                <span className="text-blue-100">Detailed Cost Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="text-yellow-500" size={24} />
                <span className="text-blue-100">Financial Projections</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="text-yellow-500" size={24} />
                <span className="text-blue-100">Comprehensive Reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="text-yellow-500" size={24} />
                <span className="text-blue-100">Budget Optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-yellow-500" size={24} />
                <span className="text-blue-100">5-Day Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-yellow-500" size={24} />
                <span className="text-blue-100">Financing Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ProformaBudgetForm />
            </div>

            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">What You'll Receive</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Detailed Cost Breakdown</p>
                      <p className="text-gray-700 text-sm">
                        Line-by-line analysis of all project costs including materials, labor, equipment, and overhead.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Financial Projections</p>
                      <p className="text-gray-700 text-sm">
                        Cash flow analysis, payment schedules, and financial milestones throughout the project.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Risk Assessment</p>
                      <p className="text-gray-700 text-sm">
                        Identification of potential cost variables and contingency recommendations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Optimization Strategies</p>
                      <p className="text-gray-700 text-sm">
                        Recommendations for cost savings and value engineering opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Perfect For</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Securing project financing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Investment planning and ROI analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Board presentations and approvals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Budget planning and allocation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Feasibility studies</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-2" size={16} />
                    <span className="text-gray-700">Distressed project evaluation</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Consultation Process</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-900">Initial Review</p>
                    <p className="text-gray-700 text-sm">24-hour project assessment and consultation scheduling</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Data Collection</p>
                    <p className="text-gray-700 text-sm">Detailed project analysis and site evaluation if required</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Report Preparation</p>
                    <p className="text-gray-700 text-sm">Comprehensive proforma budget development and review</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Presentation</p>
                    <p className="text-gray-700 text-sm">Detailed walkthrough of findings and recommendations</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Need Immediate Help?</h3>
                <p className="text-gray-700 mb-4">
                  For urgent budget consultations or complex project evaluations, contact our team directly:
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:+16132318639"
                    className="block text-blue-900 hover:text-blue-700 font-medium transition-colors"
                  >
                    📞 (613) 231-8639
                  </a>
                  <a
                    href="mailto:budget@solidsteelmgt.ca"
                    className="block text-blue-900 hover:text-blue-700 font-medium transition-colors"
                  >
                    ✉️ budget@solidsteelmgt.ca
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

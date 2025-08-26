import { QuoteRequestForm } from "@/components/quote-request-form"
import { CheckCircle, FileText, Clock, DollarSign } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request a Quote | Get Your Project Estimate",
  description:
    "Request a detailed quote for your commercial construction project. Our team will review your requirements and provide a comprehensive proposal tailored to your needs.",
  keywords: [
    "construction quote request",
    "commercial construction estimate",
    "project proposal request",
    "construction cost estimate",
    "building quote Ontario",
    "construction consultation",
  ],
  openGraph: {
    title: "Request a Quote | Solid Steel Management",
    description: "Get a detailed quote for your commercial construction project.",
    url: "https://solidsteelmgt.ca/quote-request",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Request a Quote - Solid Steel Management",
      },
    ],
  },
}

export default function QuoteRequestPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Request a Quote</h1>
            <p className="text-xl text-blue-100 mb-8">
              Ready to bring your construction project to life? Share your project details with us, and our experienced
              team will provide you with a comprehensive proposal tailored to your specific needs and timeline.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <FileText className="text-yellow-500" size={24} />
                <span className="text-blue-100">Detailed Project Analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="text-yellow-500" size={24} />
                <span className="text-blue-100">Transparent Pricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-yellow-500" size={24} />
                <span className="text-blue-100">48-Hour Response</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-yellow-500" size={24} />
                <span className="text-blue-100">No Obligation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <QuoteRequestForm />
            </div>

            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Project Review</p>
                      <p className="text-gray-700 text-sm">
                        Our team reviews your project details and requirements within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Initial Consultation</p>
                      <p className="text-gray-700 text-sm">
                        We schedule a consultation to discuss your vision and clarify project scope.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-900 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Detailed Proposal</p>
                      <p className="text-gray-700 text-sm">
                        You receive a comprehensive proposal with timeline, costs, and project approach.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Need Immediate Assistance?</h3>
                <p className="text-gray-700 mb-4">
                  For urgent projects or immediate questions, contact our team directly:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-blue-900">Phone</p>
                    <a href="tel:+16137919164" className="text-gray-700 hover:text-blue-900 transition-colors">
                      (613) 791-9164
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Email</p>
                    <a
                      href="mailto:quotes@solidsteelmgt.ca"
                      className="text-gray-700 hover:text-blue-900 transition-colors"
                    >
                      quotes@solidsteelmgt.ca
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Business Hours</p>
                    <p className="text-gray-700 text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Emergency Projects</h3>
                <p className="text-gray-700 mb-4">
                  Dealing with a troubled or distressed construction project? We specialize in project takeovers and
                  recovery. Call us directly for immediate assistance.
                </p>
                <a
                  href="tel:+16137919164"
                  className="inline-flex items-center text-blue-900 hover:text-blue-700 font-medium transition-colors"
                >
                  Call (613) 791-9164 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

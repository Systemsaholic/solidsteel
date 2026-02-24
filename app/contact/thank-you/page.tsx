import type { Metadata } from "next"
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Message Received!",
  robots: { index: false, follow: false },
}

export default function ContactThankYouPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <CheckCircle className="text-green-600 mx-auto mb-6" size={64} />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Message Received!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for reaching out to Solid Steel Management. We&apos;ve received your inquiry and our team will review your project details.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-800 mb-3 text-center">What happens next?</h2>
            <ol className="text-gray-600 space-y-2">
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">1.</span>Our team will review your project details</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">2.</span>We&apos;ll reach out within 24 hours to discuss next steps</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">3.</span>You can also call us directly for urgent inquiries</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">Reach us directly:</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
              <a href="tel:+16132318639" className="flex items-center hover:text-primary transition-colors">
                <Phone className="mr-2 text-primary" size={18} />
                <span className="font-semibold">(613) 231-8639</span>
              </a>
              <a href="mailto:info@solidsteelmgt.ca" className="flex items-center hover:text-primary transition-colors">
                <Mail className="mr-2 text-primary" size={18} />
                <span className="font-semibold">info@solidsteelmgt.ca</span>
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

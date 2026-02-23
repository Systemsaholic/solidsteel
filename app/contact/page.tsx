import type { Metadata } from "next"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Consultation",
  description:
    "Contact Solid Steel Management for a free consultation on your commercial construction project. Reach out to our team of experts today.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Solid Steel Management | Get a Free Consultation",
    description: "Contact our team for a free consultation on your commercial construction project.",
    url: "https://solidsteelmgt.ca/contact",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Solid Steel Management",
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Ready to discuss your next commercial construction project? Reach out to our team for a consultation and
              free estimate.
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}

import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { services } from "@/data/services"

export const metadata: Metadata = {
  title: "Construction Services Ottawa | Commercial & Industrial",
  description:
    "Solid Steel Management offers general contracting, design-build, project management, steel construction, and pre-engineered buildings across Ottawa and Ontario.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Construction Services | Solid Steel Management",
    description:
      "Full-service commercial construction — general contracting, design-build, project management, steel buildings, and more across Ontario.",
    url: "https://solidsteelmgt.ca/services",
  },
}

export default function ServicesIndexPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">
              Our Construction Services
            </h1>
            <p className="text-xl text-blue-100">
              Comprehensive commercial and industrial construction services — from concept to
              completion, across Ontario and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              What We Build
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Every project benefits from direct leadership and carefully selected expertise
              tailored to its specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card className="card-hover h-full">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-3 sm:mb-4">
                          <Icon size={36} className="text-primary" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                          {service.tagline}
                        </p>
                        <span className="inline-flex items-center text-blue-700 font-medium text-sm">
                          Learn More <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-blue-900 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              Tell us about your project and we&apos;ll recommend the right approach. Every project
              starts with a conversation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-yellow-600 hover:bg-yellow-500 text-white w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
              >
                <Link href="/quote-request">Get a Free Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-blue-200 mt-4 sm:mt-6 text-base sm:text-lg font-medium">
              Let&apos;s build something remarkable — together.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ServicePageHero } from "@/components/service-page-hero"
import { ServiceProcessSteps } from "@/components/service-process-steps"
import { ServiceRelatedProjects } from "@/components/service-related-projects"
import { ServicePageCta } from "@/components/service-page-cta"
import { ServiceFaq } from "@/components/service-faq"
import { getServiceBySlug } from "@/data/services"

const service = getServiceBySlug("general-contracting")!

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `/services/${service.slug}` },
  keywords: service.keywords,
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://solidsteelmgt.ca/services/${service.slug}`,
    type: "website",
  },
}

export default function GeneralContractingPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      provider: { "@id": "https://solidsteelmgt.ca/#organization" },
      areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      url: `https://solidsteelmgt.ca/services/${service.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://solidsteelmgt.ca" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://solidsteelmgt.ca/services" },
        { "@type": "ListItem", position: 3, name: service.title, item: `https://solidsteelmgt.ca/services/${service.slug}` },
      ],
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageHero
        title={service.title}
        tagline={service.tagline}
        breadcrumbLabel={service.shortTitle}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                Full-Service General Contracting in Ottawa &amp; Ontario
              </h2>
              {service.overview.map((paragraph, i) => (
                <p key={i} className="text-gray-700 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <div className="bg-gray-50 rounded-lg p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Why Choose Solid Steel</h3>
                <ul className="space-y-3">
                  {service.highlights.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              What&apos;s Included
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Comprehensive general contracting services covering every phase of your commercial build.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {service.features.map((feature, i) => (
              <Card key={i} className="card-hover h-full">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServiceProcessSteps steps={service.process} />
      <ServiceRelatedProjects serviceSlugs={[service.slug]} />
      <ServiceFaq faqs={service.faqs} />
      <ServicePageCta />
    </>
  )
}

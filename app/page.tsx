import { Hero } from "@/components/hero-with-fallback"
import { Services } from "@/components/services"
import { DistressedProjects } from "@/components/distressed-projects"
import { LenderSatisfaction } from "@/components/lender-satisfaction"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Contact } from "@/components/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solid Steel Management | Construction Company Ottawa | General Contractor",
  description:
    "Ottawa's trusted construction company since 2015. General contracting, design-build, steel buildings, and project management for commercial and industrial projects across Ontario.",
  alternates: { canonical: "/" },
  keywords: [
    "construction company Ottawa",
    "general contractor Ottawa",
    "commercial contractor Ottawa",
    "design-build commercial construction",
    "steel building Ontario",
    "construction management Ottawa",
    "commercial construction contractor Ontario",
    "pre engineered steel buildings",
    "distressed construction project takeover",
    "industrial construction management",
  ],
  openGraph: {
    title: "Solid Steel Management | Construction Company Ottawa",
    description:
      "Ottawa's trusted construction company since 2015. General contracting, design-build, steel buildings, and project management for commercial and industrial projects across Ontario.",
    url: "https://solidsteelmgt.ca",
    siteName: "Solid Steel Management",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solid Steel Management - Construction Company Ottawa",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <DistressedProjects />
      <LenderSatisfaction />
      <Projects />
      <About />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  )
}

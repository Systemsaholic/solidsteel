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
  title: "Solid Steel Management | Commercial Construction Specialists Ontario",
  description:
    "Strength You Can Build On — Excellence in Commercial Construction. Design-build, general contracting, and distressed project takeovers across Ontario.",
  alternates: { canonical: "/" },
  keywords: [
    "commercial construction contractor Ontario",
    "design-build commercial construction",
    "distressed construction project takeover",
    "general contracting services",
    "industrial construction management",
    "commercial renovation and expansion",
    "Ottawa commercial builders",
    "reliable construction project delivery",
    "lender approved construction management",
    "proforma budget construction delivery",
    "construction loan compliance",
    "financial institution construction partner",
  ],
  openGraph: {
    title: "Solid Steel Management | Commercial Construction Specialists Ontario",
    description:
      "Strength You Can Build On — Excellence in Commercial Construction. Design-build, project management, general contracting, and distressed project takeovers across Ontario since 2015.",
    url: "https://solidsteelmgt.ca",
    siteName: "Solid Steel Management",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solid Steel Management - Commercial Construction Specialists",
      },
    ],
    locale: "en_US",
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

import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://solidsteelmgt.ca"

  // Main pages
  const routes = [
    "", "/about", "/contact", "/projects/gallery",
    "/quote-request", "/proforma-budget-consultation",
    "/privacy-policy", "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Case study pages
  const caseStudies = [
    "",
    "/candc-welding-completion",
  ].map((slug) => ({
    url: `${baseUrl}/case-studies${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "" ? 0.8 : 0.7,
  }))

  // Project pages
  const projects = [
    "greystone-village-retirement",
    "embrun-ford-dealership",
    "pro-xcavation-headquarters",
    "marc-forget-transport-facility",
    "candc-welding-completion",
  ].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...caseStudies, ...projects]
}

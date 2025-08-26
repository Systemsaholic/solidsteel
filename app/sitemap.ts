import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://solidsteelmgt.ca"

  // Main pages
  const routes = ["", "/about", "/projects", "/contact", "/privacy-policy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Project pages
  const projects = [
    "logistics-distribution-center",
    "fleet-maintenance-facility",
    "manufacturing-plant",
    "cold-storage-warehouse",
    "commercial-vehicle-showroom",
    "food-processing-facility",
  ].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...routes, ...projects]
}

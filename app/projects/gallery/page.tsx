import { ProjectGallery } from "@/components/project-gallery"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Gallery | Construction Portfolio",
  description:
    "Explore our gallery of commercial construction projects. Filter by category and discover our expertise across various project types.",
  alternates: { canonical: "/projects/gallery" },
  keywords: [
    "construction project gallery",
    "commercial construction portfolio",
    "project showcase",
    "construction case studies",
    "building projects Ontario",
    "construction company portfolio",
  ],
  openGraph: {
    title: "Project Gallery | Solid Steel Management",
    description: "Explore our comprehensive gallery of commercial construction projects.",
    url: "https://solidsteelmgt.ca/projects/gallery",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solid Steel Management Project Gallery",
      },
    ],
  },
}

export default function ProjectGalleryPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">Project Gallery</h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore our comprehensive portfolio of commercial construction projects. From cutting-edge technology
              centers to specialized industrial facilities, discover the breadth and depth of our construction
              expertise.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="bg-blue-800 px-3 py-1 rounded-full">Completed Projects</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full">Multiple Industries</span>
              <span className="bg-blue-800 px-3 py-1 rounded-full">Advanced Technologies</span>
            </div>
          </div>
        </div>
      </section>

      <ProjectGallery />
    </>
  )
}

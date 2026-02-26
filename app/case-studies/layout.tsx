import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies | Distressed Project Recovery",
  description:
    "Real-world case studies of successful distressed construction project recoveries by Solid Steel Management. See how we rescue troubled projects and deliver results.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Solid Steel Management",
    description:
      "See how Solid Steel Management rescues and completes troubled construction projects. Detailed case studies with results.",
    url: "https://solidsteelmgt.ca/case-studies",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solid Steel Management Case Studies",
      },
    ],
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

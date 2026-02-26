import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  openGraph: {
    siteName: "Solid Steel Management",
    locale: "en_CA",
    type: "website",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

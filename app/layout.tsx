import type React from "react"
import Script from "next/script"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"
import { ConversionTracking } from "@/components/conversion-tracking"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://solidsteelmgt.ca"),
  title: {
    default: "Solid Steel Management | Construction Company Ottawa | General Contractor",
    template: "%s | Solid Steel Management",
  },
  description:
    "Ottawa construction company since 2015. General contracting, design-build, steel buildings, and project management for commercial and industrial projects.",
  keywords: [
    "construction company Ottawa",
    "general contractor Ottawa",
    "commercial contractor Ottawa",
    "design-build commercial construction",
    "steel building Ontario",
    "construction management Ottawa",
    "commercial construction contractor Ontario",
    "pre engineered steel buildings",
  ],
  authors: [{ name: "Solid Steel Management" }],
  creator: "Solid Steel Management",
  publisher: "Solid Steel Management",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GT-55K55Z97" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-78TXCTER0G');
        `}
      </Script>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0098DA" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GeneralContractor",
              "@id": "https://solidsteelmgt.ca/#organization",
              name: "Solid Steel Management",
              alternateName: "SSM Solid Steel Management",
              url: "https://solidsteelmgt.ca",
              logo: "https://solidsteelmgt.ca/logo.png",
              image: "https://solidsteelmgt.ca/images/og-image.png",
              description:
                "Ottawa construction company specializing in general contracting, design-build, steel buildings, project management, and distressed project recovery for commercial and industrial clients across Ontario since 2015.",
              telephone: "+1-613-231-8639",
              foundingDate: "2015",
              areaServed: {
                "@type": "AdministrativeArea",
                name: "Ontario, Canada",
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "2505 Pagé Rd",
                addressLocality: "Orléans",
                addressRegion: "ON",
                postalCode: "K1W 1E5",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 45.4403,
                longitude: -75.523,
              },
              hasMap: "https://maps.google.com/?cid=6652741859787631566",
              sameAs: ["https://maps.google.com/?cid=6652741859787631566"],
              knowsAbout: [
                "Commercial Construction",
                "General Contracting",
                "Design-Build",
                "Construction Project Management",
                "Steel Construction",
                "Pre-Engineered Steel Buildings",
                "Distressed Project Takeovers",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTopProvider behavior="smooth" delay={0} excludeAnchors={true}>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </ScrollToTopProvider>
        </ThemeProvider>
        <ConversionTracking />
        <Analytics />
      </body>
    </html>
  )
}

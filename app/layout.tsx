import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://solidsteelmgt.ca"),
  title: {
    default: "Solid Steel Management | Commercial Construction Specialists Ontario",
    template: "%s | Solid Steel Management",
  },
  description:
    "Strength You Can Build On — Excellence in Commercial Construction. Design-build, project management, general contracting, and distressed project takeovers across Ontario since 2015.",
  keywords: [
    "commercial construction contractor Ontario",
    "design-build commercial construction",
    "distressed construction project takeover",
    "general contracting services",
    "industrial construction management",
    "commercial renovation and expansion",
    "Ottawa commercial builders",
    "reliable construction project delivery",
  ],
  authors: [{ name: "Solid Steel Management" }],
  creator: "Solid Steel Management",
  publisher: "Solid Steel Management",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://solidsteelmgt.ca" />
        <meta name="theme-color" content="#0098DA" />
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
      </body>
    </html>
  )
}

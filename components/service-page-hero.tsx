import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ServicePageHeroProps {
  title: string
  tagline: string
  breadcrumbLabel: string
}

export function ServicePageHero({ title, tagline, breadcrumbLabel }: ServicePageHeroProps) {
  return (
    <section className="bg-blue-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center text-sm text-blue-200 flex-wrap gap-y-1">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="mx-2" />
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight size={14} className="mx-2" />
                <span className="text-blue-100">{breadcrumbLabel}</span>
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">{title}</h1>
          <p className="text-xl text-blue-100">{tagline}</p>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { EnhancedLink } from "@/components/enhanced-link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <EnhancedLink href="/" className="focus-visible">
                <div className="bg-white p-2 inline-block rounded">
                  <Image
                    src="/images/logo.png"
                    alt="Solid Steel Management"
                    width={180}
                    height={48}
                    className="h-8 sm:h-10 md:h-12 w-auto"
                  />
                </div>
              </EnhancedLink>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed">
              Building excellence in commercial steel construction. Specializing in warehouses, commercial garages, and
              industrial structures.
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/#services" },
                { name: "Projects", href: "/projects/gallery" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Case Study", href: "/case-studies" },
              ].map((item) => (
                <li key={item.name}>
                  <EnhancedLink
                    href={item.href}
                    className="text-gray-400 hover:text-white transition duration-150 focus-visible text-sm sm:text-base py-1 block"
                    scrollOffset={100}
                  >
                    {item.name}
                  </EnhancedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Warehouse Construction",
                "Commercial Garages",
                "Industrial Buildings",
                "General Contracting",
                "Building Expansion",
                "Facility Renovations",
              ].map((service) => (
                <li key={service}>
                  <EnhancedLink
                    href="/#services"
                    className="text-gray-400 hover:text-white transition duration-150 focus-visible text-sm sm:text-base py-1 block"
                    scrollOffset={100}
                  >
                    {service}
                  </EnhancedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h4>
            <address className="not-italic text-gray-400 space-y-3 text-sm sm:text-base">
              <p className="leading-relaxed">
                Based in Eastern Ottawa
                <br />
                Serving clients across Ontario and beyond
              </p>
              <p>
                Phone:{" "}
                <a href="tel:+16132318639" className="hover:text-white transition-colors focus-visible">
                  (613) 231-8639
                </a>
              </p>
              <p className="break-all">
                Email:{" "}
                <a href="mailto:info@solidsteelmgt.ca" className="hover:text-white transition-colors focus-visible">
                  info@solidsteelmgt.ca
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Solid Steel Management. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-500">
              <li>
                <EnhancedLink
                  href="/privacy-policy"
                  className="hover:text-white transition duration-150 focus-visible py-1"
                >
                  Privacy Policy
                </EnhancedLink>
              </li>
              <li>
                <EnhancedLink href="/terms" className="hover:text-white transition duration-150 focus-visible py-1">
                  Terms of Service
                </EnhancedLink>
              </li>
              <li>
                <EnhancedLink
                  href="/sitemap.xml"
                  className="hover:text-white transition duration-150 focus-visible py-1"
                >
                  Sitemap
                </EnhancedLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

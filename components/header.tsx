"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedLink } from "@/components/enhanced-link"
import { cn } from "@/lib/utils"

const serviceLinks = [
  { name: "General Contracting", href: "/services/general-contracting" },
  { name: "Design-Build", href: "/services/design-build" },
  { name: "Project Management", href: "/services/project-management" },
  { name: "Steel Construction", href: "/services/steel-construction" },
  { name: "Pre-Engineered Buildings", href: "/services/pre-engineered-buildings" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 150)
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Projects", href: "/projects/gallery" },
    { name: "Case Study", href: "/case-studies" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <EnhancedLink href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Solid Steel Management"
              width={180}
              height={48}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </EnhancedLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.name}
                ref={servicesRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium transition duration-150 text-sm lg:text-base px-2 py-1 inline-flex items-center gap-1"
                >
                  {item.name}
                  <ChevronDown
                    size={14}
                    className={cn(
                      "transition-transform duration-200",
                      isServicesOpen && "rotate-180"
                    )}
                  />
                </Link>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/services"
                        className="block px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        View All Services
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <EnhancedLink
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition duration-150 text-sm lg:text-base px-2 py-1"
                scrollOffset={100}
              >
                {item.name}
              </EnhancedLink>
            )
          )}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
            <Phone size={18} className="text-primary" />
            <a
              href="tel:+16132318639"
              className="font-semibold text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
            >
              (613) 231-8639
            </a>
          </div>
          <Button asChild size="lg" className="hidden lg:flex bg-yellow-600 hover:bg-yellow-500 text-white ml-4">
            <EnhancedLink href="/quote-request">Get a Quote</EnhancedLink>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="focus-visible"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white px-4 py-6 shadow-lg border-t">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.name}>
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between text-gray-700 hover:text-primary font-medium py-3 px-2 border-b border-gray-100 text-lg transition-colors"
                  >
                    {item.name}
                    <ChevronDown
                      size={18}
                      className={cn(
                        "transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isMobileServicesOpen && (
                    <div className="pl-4 pt-2 space-y-1">
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-gray-600 hover:text-primary font-medium py-2 px-2 text-base transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <Link
                        href="/services"
                        className="block text-blue-700 font-medium py-2 px-2 text-base transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        View All Services
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <EnhancedLink
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium py-3 px-2 border-b border-gray-100 last:border-0 text-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  scrollOffset={100}
                >
                  {item.name}
                </EnhancedLink>
              )
            )}
            <div className="flex items-center justify-center space-x-3 py-3 bg-gray-50 rounded-lg">
              <Phone size={20} className="text-primary" />
              <a
                href="tel:+16132318639"
                className="font-semibold text-gray-700 hover:text-primary transition-colors text-lg"
              >
                (613) 231-8639
              </a>
            </div>
            <Button asChild size="lg" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white py-4 text-lg">
              <EnhancedLink href="/quote-request" onClick={() => setIsMenuOpen(false)}>
                Get a Quote
              </EnhancedLink>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}

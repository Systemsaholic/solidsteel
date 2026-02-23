"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedLink } from "@/components/enhanced-link"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
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
          {navItems.map((item) => (
            <EnhancedLink
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary font-medium transition duration-150 text-sm lg:text-base px-2 py-1"
              scrollOffset={100} // Account for sticky header
            >
              {item.name}
            </EnhancedLink>
          ))}
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
            {navItems.map((item) => (
              <EnhancedLink
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium py-3 px-2 border-b border-gray-100 last:border-0 text-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
                scrollOffset={100}
              >
                {item.name}
              </EnhancedLink>
            ))}
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

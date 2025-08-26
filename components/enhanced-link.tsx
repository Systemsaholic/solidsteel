"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { handleAnchorClick } from "@/lib/scroll-utils"
import type { ComponentProps } from "react"

interface EnhancedLinkProps extends ComponentProps<typeof Link> {
  scrollOffset?: number
  scrollBehavior?: ScrollBehavior
  updateUrl?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function EnhancedLink({
  href,
  scrollOffset = 80,
  scrollBehavior = "smooth",
  updateUrl = true,
  onClick,
  children,
  ...props
}: EnhancedLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hrefString = typeof href === "string" ? href : href.pathname || ""

    // Handle anchor links
    if (hrefString.startsWith("#")) {
      e.preventDefault()
      const success = handleAnchorClick(hrefString, {
        behavior: scrollBehavior,
        offset: scrollOffset,
        updateUrl,
      })

      if (!success) {
        console.warn(`Failed to scroll to anchor: ${hrefString}`)
      }
    }
    // Handle same-page anchor links (e.g., "/page#section")
    else if (hrefString.includes("#")) {
      const [path, anchor] = hrefString.split("#")
      const currentPath = window.location.pathname

      // If it's the same page, just scroll to anchor
      if (path === currentPath || path === "") {
        e.preventDefault()
        handleAnchorClick(`#${anchor}`, {
          behavior: scrollBehavior,
          offset: scrollOffset,
          updateUrl,
        })
      }
      // If it's a different page, navigate normally (Next.js will handle it)
    }

    // Call the original onClick handler if provided
    onClick?.(e)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

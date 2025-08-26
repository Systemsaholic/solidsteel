"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface UseScrollToTopOptions {
  behavior?: ScrollBehavior
  delay?: number
  excludeAnchors?: boolean
}

export function useScrollToTop(options: UseScrollToTopOptions = {}) {
  const { behavior = "smooth", delay = 0, excludeAnchors = true } = options
  const pathname = usePathname()

  useEffect(() => {
    // Check if the current URL has a hash (anchor)
    const hasAnchor = window.location.hash

    // If we should exclude anchors and there's an anchor present, don't scroll to top
    if (excludeAnchors && hasAnchor) {
      // Handle anchor scrolling after a small delay to ensure the page is rendered
      const timeoutId = setTimeout(() => {
        const anchorElement = document.querySelector(hasAnchor)
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior, block: "start" })
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }

    // Scroll to top for regular navigation
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      })
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [pathname, behavior, delay, excludeAnchors])
}

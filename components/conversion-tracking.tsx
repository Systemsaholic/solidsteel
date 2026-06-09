"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/gtag"

export function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="tel:"]')
      if (anchor) {
        trackEvent("phone_call_click", {
          phone_number: anchor.getAttribute("href")?.replace("tel:", ""),
          page_path: window.location.pathname,
        })
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return null
}

"use client"

import type React from "react"

import { useScrollToTop } from "@/hooks/useScrollToTop"

interface ScrollToTopProviderProps {
  children: React.ReactNode
  behavior?: ScrollBehavior
  delay?: number
  excludeAnchors?: boolean
}

export function ScrollToTopProvider({
  children,
  behavior = "smooth",
  delay = 0,
  excludeAnchors = true,
}: ScrollToTopProviderProps) {
  useScrollToTop({ behavior, delay, excludeAnchors })

  return <>{children}</>
}

"use client"

/**
 * Smooth scroll to an element by ID or selector
 */
export function scrollToElement(
  selector: string,
  options: {
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
    inline?: ScrollLogicalPosition
    offset?: number
  } = {},
) {
  const { behavior = "smooth", block = "start", inline = "nearest", offset = 0 } = options

  const element = document.querySelector(selector)
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`)
    return false
  }

  // If there's an offset, calculate the position manually
  if (offset !== 0) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior,
    })
  } else {
    element.scrollIntoView({
      behavior,
      block,
      inline,
    })
  }

  return true
}

/**
 * Scroll to top of the page
 */
export function scrollToTop(behavior: ScrollBehavior = "smooth") {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  })
}

/**
 * Handle anchor link navigation with proper scrolling
 */
export function handleAnchorClick(
  href: string,
  options: {
    behavior?: ScrollBehavior
    offset?: number
    updateUrl?: boolean
  } = {},
) {
  const { behavior = "smooth", offset = 80, updateUrl = true } = options

  // Check if it's an anchor link (starts with #)
  if (!href.startsWith("#")) {
    return false
  }

  const targetId = href.substring(1)
  const targetElement = document.getElementById(targetId)

  if (!targetElement) {
    console.warn(`Element with ID "${targetId}" not found`)
    return false
  }

  // Calculate position with offset (useful for fixed headers)
  const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior,
  })

  // Update URL if requested
  if (updateUrl) {
    history.pushState(null, "", href)
  }

  return true
}

/**
 * Check if the current page has loaded and handle initial anchor scrolling
 */
export function handleInitialAnchorScroll(options: { delay?: number; offset?: number } = {}) {
  const { delay = 100, offset = 80 } = options

  // Check for anchor in URL on page load
  const hash = window.location.hash
  if (hash) {
    setTimeout(() => {
      const element = document.querySelector(hash)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, delay)
  }
}

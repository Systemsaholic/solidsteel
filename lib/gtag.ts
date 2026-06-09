type GtagParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return
  const gtag = (window as any).gtag
  if (typeof gtag === "function") {
    gtag("event", name, params)
  }
}

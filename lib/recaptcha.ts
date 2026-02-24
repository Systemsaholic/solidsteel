declare global {
  interface Window {
    grecaptcha: {
      enterprise?: {
        ready: (callback: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
      ready?: (callback: () => void) => void
      execute?: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function executeRecaptcha(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
    console.warn("reCAPTCHA not available — skipping")
    return null
  }

  // Timeout after 5 seconds to prevent hanging
  const timeoutPromise = new Promise<null>((resolve) => {
    setTimeout(() => {
      console.warn("reCAPTCHA timed out — skipping")
      resolve(null)
    }, 5000)
  })

  const tokenPromise = new Promise<string | null>((resolve) => {
    try {
      // Try Enterprise API first, fall back to standard
      const api = window.grecaptcha.enterprise || window.grecaptcha
      if (!api?.ready) {
        resolve(null)
        return
      }
      api.ready(async () => {
        try {
          const execute = window.grecaptcha.enterprise?.execute || window.grecaptcha.execute
          if (!execute) {
            resolve(null)
            return
          }
          const token = await execute(siteKey, { action })
          resolve(token)
        } catch (err) {
          console.warn("reCAPTCHA execute failed:", err)
          resolve(null)
        }
      })
    } catch (err) {
      console.warn("reCAPTCHA ready failed:", err)
      resolve(null)
    }
  })

  return Promise.race([tokenPromise, timeoutPromise])
}

export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not configured")
    return { success: false, score: 0 }
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()
    return { success: data.success && (data.score ?? 0) >= 0.5, score: data.score ?? 0 }
  } catch {
    console.error("reCAPTCHA verification request failed")
    return { success: false, score: 0 }
  }
}

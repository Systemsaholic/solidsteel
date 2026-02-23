declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function executeRecaptcha(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
    return null
  }

  return new Promise((resolve) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action })
        resolve(token)
      } catch {
        resolve(null)
      }
    })
  })
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

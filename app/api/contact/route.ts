import { NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check - reject if filled
    if (data.company_url || data.website) {
      return NextResponse.json({ success: true, message: "Contact form submitted successfully" }, { status: 200 })
    }

    // Verify reCAPTCHA if token provided (soft check — honeypot is primary defense)
    if (data.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(data.recaptchaToken)
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA verification failed — allowing submission (honeypot passed)")
      }
    }

    // Validate form data
    const { name, email, phone, projectType, message } = data

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for CRM webhook
    const crmData = {
      name,
      email,
      phone,
      project_type: projectType || "General Inquiry",
      message: projectType ? `Project Type: ${projectType}\n\nMessage: ${message}` : message,
      source: "Website Contact Form API",
      form_type: "contact_form",
      submitted_at: new Date().toISOString(),
    }

    // Send to CRM webhook
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const webhookUrl = process.env.GROUNDHOGG_WEBHOOK_CONTACT_URL
      if (!webhookUrl) {
        throw new Error("Webhook URL is not configured")
      }

      const crmResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "SolidSteelWebsite/1.0",
        },
        body: JSON.stringify(crmData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!crmResponse.ok) {
        console.error("CRM webhook failed:", crmResponse.status)
      }
    } catch (fetchError) {
      console.error("CRM webhook error:", fetchError instanceof Error ? fetchError.message : "Network error")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error instanceof Error ? error.message : "Unknown error")

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process contact form",
      },
      { status: 500 },
    )
  }
}

import { NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check - reject if filled
    if (data.company_url || data.website) {
      return NextResponse.json({ success: true, message: "Contact form submitted successfully" }, { status: 200 })
    }

    // Verify reCAPTCHA if token provided
    if (data.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(data.recaptchaToken)
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { success: false, message: "reCAPTCHA verification failed" },
          { status: 403 },
        )
      }
    }

    // Validate form data
    const { name, email, phone, projectType, message } = data

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Prepare data for CRM webhook
    const crmData = {
      // Basic contact info
      name,
      email,
      phone,

      // Project details
      project_type: projectType || "General Inquiry",

      // Message content
      message: projectType ? `Project Type: ${projectType}\n\nMessage: ${message}` : message,

      // Metadata
      source: "Website Contact Form API",
      form_type: "contact_form",
      submitted_at: new Date().toISOString(),
    }

    console.log("Sending to CRM:", JSON.stringify(crmData, null, 2))

    // Send to CRM webhook with timeout and better error handling
    let crmSuccess = false
    let crmError = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const crmResponse = await fetch(
        "https://crm.solidsteelmgt.ca/wp-json/gh/v4/webhooks/1-webhook-listener?token=O3MSR63",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "SolidSteelWebsite/1.0",
          },
          body: JSON.stringify(crmData),
          signal: controller.signal,
        },
      )

      clearTimeout(timeoutId)

      if (crmResponse.ok) {
        const responseText = await crmResponse.text()
        console.log("CRM Success:", crmResponse.status, responseText)
        crmSuccess = true
      } else {
        const errorText = await crmResponse.text()
        console.error("CRM webhook failed:", {
          status: crmResponse.status,
          statusText: crmResponse.statusText,
          response: errorText,
          headers: Object.fromEntries(crmResponse.headers.entries()),
        })
        crmError = `HTTP ${crmResponse.status}: ${errorText}`
      }
    } catch (fetchError) {
      console.error("CRM webhook error:", fetchError)
      crmError = fetchError instanceof Error ? fetchError.message : "Network error"
    }

    // Log the contact form submission locally for backup
    console.log("Contact Form Processed:", {
      name,
      email,
      projectType: projectType || "General Inquiry",
      submittedAt: new Date().toISOString(),
      crmSuccess,
      crmError: crmError || "none",
    })

    // Always return success to user, even if CRM fails
    // The form data is logged locally as backup
    return NextResponse.json(
      {
        success: true,
        message: "Contact form submitted successfully",
        requestId: `CF-${Date.now()}`,
        // Include CRM status for debugging (remove in production)
        debug:
          process.env.NODE_ENV === "development"
            ? {
                crmSuccess,
                crmError,
              }
            : undefined,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process contact form",
      },
      { status: 500 },
    )
  }
}

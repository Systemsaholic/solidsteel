import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || ""

    let name: string, email: string, phone: string, projectType: string, message: string
    let isNativeFormSubmit = false

    if (contentType.includes("application/json")) {
      const data = await request.json()

      // Honeypot check
      if (data.company_url || data.website) {
        return NextResponse.json({ success: true, message: "Contact form submitted successfully" }, { status: 200 })
      }

      name = data.name
      email = data.email
      phone = data.phone
      projectType = data.projectType || ""
      message = data.message
    } else {
      // Native form submission (form-encoded data)
      isNativeFormSubmit = true
      const formData = await request.formData()

      // Honeypot check
      if (formData.get("company_url") || formData.get("website")) {
        return NextResponse.redirect(new URL("/contact/thank-you", request.url), 303)
      }

      name = (formData.get("name") as string) || ""
      email = (formData.get("email") as string) || ""
      phone = (formData.get("phone") as string) || ""
      projectType = (formData.get("projectType") as string) || ""
      message = (formData.get("message") as string) || ""
    }

    if (!name || !email || !phone || !message) {
      if (isNativeFormSubmit) {
        return NextResponse.redirect(new URL("/contact?error=missing-fields", request.url), 303)
      }
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

    // For native form submissions, redirect to success page
    if (isNativeFormSubmit) {
      return NextResponse.redirect(new URL("/contact/thank-you", request.url), 303)
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

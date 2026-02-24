import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyRecaptcha } from "@/lib/recaptcha"

const quoteRequestSchema = z.object({
  projectName: z.string().min(2).max(200),
  projectDescription: z.string().min(50).max(5000),
  clientName: z.string().min(2).max(100),
  clientEmail: z.string().email().max(254),
  clientPhone: z.string().min(10).max(20),
  projectType: z.string().min(1).max(100),
  startDate: z.string().max(20).optional(),
  estimatedDuration: z.string().max(50).optional(),
  budgetRange: z.string().min(1).max(50),
  projectLocation: z.string().min(2).max(200),
  urgency: z.string().min(1).max(50),
  additionalRequirements: z.string().max(5000).optional(),
  attachments: z.array(z.string().url()).max(5).optional(),
  submittedAt: z.string(),
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check
    if (data.website || data.company_url) {
      return NextResponse.json({ success: true, message: "Quote request submitted successfully" }, { status: 200 })
    }

    // Verify reCAPTCHA if token provided (soft check — honeypot is primary defense)
    if (data.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(data.recaptchaToken)
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA verification failed — allowing submission (honeypot passed)")
      }
    }

    // Validate the data
    const validatedData = quoteRequestSchema.parse(data)

    // Prepare data for CRM webhook
    const crmData = {
      name: validatedData.clientName,
      email: validatedData.clientEmail,
      phone: validatedData.clientPhone,
      project_name: validatedData.projectName,
      project_type: validatedData.projectType,
      project_location: validatedData.projectLocation,
      budget_range: validatedData.budgetRange,
      urgency: validatedData.urgency,
      message: `Project: ${validatedData.projectName}\n\nDescription: ${validatedData.projectDescription}\n\nLocation: ${validatedData.projectLocation}\n\nBudget: ${validatedData.budgetRange}\n\nUrgency: ${validatedData.urgency}${validatedData.startDate ? `\n\nPreferred Start: ${validatedData.startDate}` : ""}${validatedData.estimatedDuration ? `\n\nDuration: ${validatedData.estimatedDuration}` : ""}${validatedData.additionalRequirements ? `\n\nAdditional Requirements: ${validatedData.additionalRequirements}` : ""}`,
      source: "Website Quote Request",
      form_type: "quote_request",
    }

    // Send to CRM webhook
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const webhookUrl = process.env.GROUNDHOGG_WEBHOOK_QUOTE_URL
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
        message: "Quote request submitted successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data. Please check your entries and try again.",
        },
        { status: 400 },
      )
    }

    console.error("Error processing quote request:", error instanceof Error ? error.message : "Unknown error")

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process quote request",
      },
      { status: 500 },
    )
  }
}

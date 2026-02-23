import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyRecaptcha } from "@/lib/recaptcha"

const quoteRequestSchema = z.object({
  projectName: z.string().min(2),
  projectDescription: z.string().min(50),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(10),
  projectType: z.string().min(1),
  startDate: z.string().optional(),
  estimatedDuration: z.string().optional(),
  budgetRange: z.string().min(1),
  projectLocation: z.string().min(2),
  urgency: z.string().min(1),
  additionalRequirements: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  submittedAt: z.string(),
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check - reject if filled
    if (data.website || data.company_url) {
      return NextResponse.json({ success: true, message: "Quote request submitted successfully" }, { status: 200 })
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

    // Validate the data
    const validatedData = quoteRequestSchema.parse(data)

    // Prepare simplified data for CRM webhook
    const crmData = {
      // Basic contact info
      name: validatedData.clientName,
      email: validatedData.clientEmail,
      phone: validatedData.clientPhone,

      // Project details
      project_name: validatedData.projectName,
      project_type: validatedData.projectType,
      project_location: validatedData.projectLocation,
      budget_range: validatedData.budgetRange,
      urgency: validatedData.urgency,

      // Description and requirements
      message: `Project: ${validatedData.projectName}\n\nDescription: ${validatedData.projectDescription}\n\nLocation: ${validatedData.projectLocation}\n\nBudget: ${validatedData.budgetRange}\n\nUrgency: ${validatedData.urgency}${validatedData.startDate ? `\n\nPreferred Start: ${validatedData.startDate}` : ""}${validatedData.estimatedDuration ? `\n\nDuration: ${validatedData.estimatedDuration}` : ""}${validatedData.additionalRequirements ? `\n\nAdditional Requirements: ${validatedData.additionalRequirements}` : ""}`,

      // Metadata
      source: "Website Quote Request",
      form_type: "quote_request",
    }

    console.log("Sending to CRM:", JSON.stringify(crmData, null, 2))

    // Send to CRM webhook with timeout and better error handling
    let crmSuccess = false
    let crmError = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const webhookUrl = process.env.GROUNDHOGG_WEBHOOK_QUOTE_URL
      if (!webhookUrl) {
        throw new Error("GROUNDHOGG_WEBHOOK_QUOTE_URL is not configured")
      }

      const crmResponse = await fetch(
        webhookUrl,
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

    // Log the quote request locally for backup
    console.log("Quote Request Processed:", {
      projectName: validatedData.projectName,
      clientEmail: validatedData.clientEmail,
      projectType: validatedData.projectType,
      budgetRange: validatedData.budgetRange,
      urgency: validatedData.urgency,
      attachments: validatedData.attachments?.length || 0,
      submittedAt: validatedData.submittedAt,
      crmSuccess,
      crmError: crmError || "none",
    })

    // Always return success to user, even if CRM fails
    // The form data is logged locally as backup
    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully",
        requestId: `QR-${Date.now()}`,
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
    console.error("Error processing quote request:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process quote request",
      },
      { status: 500 },
    )
  }
}

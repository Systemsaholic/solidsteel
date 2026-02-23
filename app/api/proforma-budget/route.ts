import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyRecaptcha } from "@/lib/recaptcha"

const proformaBudgetSchema = z.object({
  // Project Information
  projectName: z.string().min(2),
  projectType: z.string().min(1),
  projectLocation: z.string().min(2),
  projectDescription: z.string().min(100),

  // Project Specifications
  buildingSize: z.string().min(1),
  siteSize: z.string().optional(),
  numberOfFloors: z.string().min(1),
  occupancyType: z.string().min(1),
  constructionType: z.string().min(1),

  // Budget Parameters
  estimatedBudget: z.string().min(1),
  budgetFlexibility: z.string().min(1),
  fundingSource: z.string().min(1),
  financingNeeded: z.string().min(1),

  // Timeline
  projectStartDate: z.string().optional(),
  desiredCompletionDate: z.string().optional(),
  budgetDeadline: z.string().min(1),

  // Consultation Specifics
  consultationPurpose: z.array(z.string()).min(1),
  specificConcerns: z.string().optional(),
  previousEstimates: z.string().min(1),

  // Contact Information
  clientName: z.string().min(2),
  clientTitle: z.string().optional(),
  companyName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(10),

  // Additional Requirements
  siteVisitRequired: z.string().min(1),
  presentationRequired: z.string().min(1),
  additionalServices: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  submittedAt: z.string(),
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check - reject if filled
    if (data.website || data.company_url) {
      return NextResponse.json({ success: true, message: "Consultation request submitted successfully" }, { status: 200 })
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
    const validatedData = proformaBudgetSchema.parse(data)

    // Prepare data for CRM webhook
    const crmData = {
      // Basic contact info
      name: validatedData.clientName,
      email: validatedData.clientEmail,
      phone: validatedData.clientPhone,
      company: validatedData.companyName,
      title: validatedData.clientTitle || "",

      // Project details
      project_name: validatedData.projectName,
      project_type: validatedData.projectType,
      project_location: validatedData.projectLocation,
      building_size: validatedData.buildingSize,
      estimated_budget: validatedData.estimatedBudget,
      budget_deadline: validatedData.budgetDeadline,

      // Consultation specifics
      consultation_purposes: validatedData.consultationPurpose.join(", "),
      funding_source: validatedData.fundingSource,
      financing_needed: validatedData.financingNeeded,

      // Comprehensive message
      message: `PROFORMA BUDGET CONSULTATION REQUEST

Project: ${validatedData.projectName}
Type: ${validatedData.projectType}
Location: ${validatedData.projectLocation}

PROJECT SPECIFICATIONS:
- Building Size: ${validatedData.buildingSize}
${validatedData.siteSize ? `- Site Size: ${validatedData.siteSize}` : ""}
- Floors: ${validatedData.numberOfFloors}
- Occupancy: ${validatedData.occupancyType}
- Construction Type: ${validatedData.constructionType}

BUDGET PARAMETERS:
- Estimated Budget: ${validatedData.estimatedBudget}
- Budget Flexibility: ${validatedData.budgetFlexibility}
- Funding Source: ${validatedData.fundingSource}
- Financing Needed: ${validatedData.financingNeeded}

TIMELINE:
${validatedData.projectStartDate ? `- Desired Start: ${validatedData.projectStartDate}` : ""}
${validatedData.desiredCompletionDate ? `- Desired Completion: ${validatedData.desiredCompletionDate}` : ""}
- Budget Needed By: ${validatedData.budgetDeadline}

CONSULTATION PURPOSE:
${validatedData.consultationPurpose.join(", ")}

REQUIREMENTS:
- Site Visit: ${validatedData.siteVisitRequired}
- Presentation: ${validatedData.presentationRequired}
${validatedData.additionalServices?.length ? `- Additional Services: ${validatedData.additionalServices.join(", ")}` : ""}

PROJECT DESCRIPTION:
${validatedData.projectDescription}

${
  validatedData.specificConcerns
    ? `SPECIFIC CONCERNS:
${validatedData.specificConcerns}`
    : ""
}

${
  validatedData.specialRequirements
    ? `SPECIAL REQUIREMENTS:
${validatedData.specialRequirements}`
    : ""
}

Previous Estimates: ${validatedData.previousEstimates}
Attachments: ${validatedData.attachments?.length || 0} files uploaded`,

      // Metadata
      source: "Website Proforma Budget Consultation",
      form_type: "proforma_budget_consultation",
      priority: validatedData.budgetDeadline === "asap" ? "urgent" : "normal",
    }

    console.log("Sending proforma budget consultation to CRM:", JSON.stringify(crmData, null, 2))

    // Send to CRM webhook with timeout and better error handling
    let crmSuccess = false
    let crmError = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const crmResponse = await fetch(
        "https://crm.solidsteelmgt.ca/wp-json/gh/v4/webhooks/4-webhook-listener?token=pPAI2Wm",
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

    // Log the consultation request locally for backup
    console.log("Proforma Budget Consultation Processed:", {
      projectName: validatedData.projectName,
      clientEmail: validatedData.clientEmail,
      companyName: validatedData.companyName,
      projectType: validatedData.projectType,
      estimatedBudget: validatedData.estimatedBudget,
      budgetDeadline: validatedData.budgetDeadline,
      consultationPurposes: validatedData.consultationPurpose.length,
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
        message: "Proforma budget consultation request submitted successfully",
        requestId: `PBC-${Date.now()}`,
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
    console.error("Error processing proforma budget consultation:", error)

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
        message: "Failed to process consultation request",
      },
      { status: 500 },
    )
  }
}

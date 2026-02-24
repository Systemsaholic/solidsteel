import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyRecaptcha } from "@/lib/recaptcha"

const proformaBudgetSchema = z.object({
  projectName: z.string().min(2).max(200),
  projectType: z.string().min(1).max(100),
  projectLocation: z.string().min(2).max(200),
  projectDescription: z.string().min(100).max(10000),
  buildingSize: z.string().min(1).max(100),
  siteSize: z.string().max(100).optional(),
  numberOfFloors: z.string().min(1).max(20),
  occupancyType: z.string().min(1).max(50),
  constructionType: z.string().min(1).max(50),
  estimatedBudget: z.string().min(1).max(50),
  budgetFlexibility: z.string().min(1).max(50),
  fundingSource: z.string().min(1).max(50),
  financingNeeded: z.string().min(1).max(50),
  projectStartDate: z.string().max(20).optional(),
  desiredCompletionDate: z.string().max(20).optional(),
  budgetDeadline: z.string().min(1).max(50),
  consultationPurpose: z.array(z.string().max(50)).min(1).max(10),
  specificConcerns: z.string().max(5000).optional(),
  previousEstimates: z.string().min(1).max(50),
  clientName: z.string().min(2).max(100),
  clientTitle: z.string().max(100).optional(),
  companyName: z.string().min(2).max(200),
  clientEmail: z.string().email().max(254),
  clientPhone: z.string().min(10).max(20),
  siteVisitRequired: z.string().min(1).max(50),
  presentationRequired: z.string().min(1).max(50),
  additionalServices: z.array(z.string().max(50)).max(10).optional(),
  specialRequirements: z.string().max(5000).optional(),
  attachments: z.array(z.string().url()).max(10).optional(),
  submittedAt: z.string(),
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Honeypot check
    if (data.website || data.company_url) {
      return NextResponse.json({ success: true, message: "Consultation request submitted successfully" }, { status: 200 })
    }

    // Verify reCAPTCHA if token provided (soft check — honeypot is primary defense)
    if (data.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(data.recaptchaToken)
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA verification failed — allowing submission (honeypot passed)")
      }
    }

    // Validate the data
    const validatedData = proformaBudgetSchema.parse(data)

    // Prepare data for CRM webhook
    const crmData = {
      name: validatedData.clientName,
      email: validatedData.clientEmail,
      phone: validatedData.clientPhone,
      company: validatedData.companyName,
      title: validatedData.clientTitle || "",
      project_name: validatedData.projectName,
      project_type: validatedData.projectType,
      project_location: validatedData.projectLocation,
      building_size: validatedData.buildingSize,
      estimated_budget: validatedData.estimatedBudget,
      budget_deadline: validatedData.budgetDeadline,
      consultation_purposes: validatedData.consultationPurpose.join(", "),
      funding_source: validatedData.fundingSource,
      financing_needed: validatedData.financingNeeded,
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

${validatedData.specificConcerns ? `SPECIFIC CONCERNS:\n${validatedData.specificConcerns}` : ""}

${validatedData.specialRequirements ? `SPECIAL REQUIREMENTS:\n${validatedData.specialRequirements}` : ""}

Previous Estimates: ${validatedData.previousEstimates}
Attachments: ${validatedData.attachments?.length || 0} files uploaded`,
      source: "Website Proforma Budget Consultation",
      form_type: "proforma_budget_consultation",
      priority: validatedData.budgetDeadline === "asap" ? "urgent" : "normal",
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
        message: "Proforma budget consultation request submitted successfully",
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

    console.error("Error processing proforma budget consultation:", error instanceof Error ? error.message : "Unknown error")

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process consultation request",
      },
      { status: 500 },
    )
  }
}

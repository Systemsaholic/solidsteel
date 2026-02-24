"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { Calendar, Upload, Loader2, CheckCircle, Calculator, MailOpen, AlertCircle, Phone, Mail } from "lucide-react"

const proformaBudgetSchema = z.object({
  // Project Information
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  projectType: z.string().min(1, "Please select a project type"),
  projectLocation: z.string().min(2, "Please enter the project location"),
  projectDescription: z.string().min(100, "Please provide a detailed description (minimum 100 characters)"),

  // Project Specifications
  buildingSize: z.string().min(1, "Please specify building size"),
  siteSize: z.string().optional(),
  numberOfFloors: z.string().min(1, "Please specify number of floors"),
  occupancyType: z.string().min(1, "Please select occupancy type"),
  constructionType: z.string().min(1, "Please select construction type"),

  // Budget Parameters
  estimatedBudget: z.string().min(1, "Please provide estimated budget"),
  budgetFlexibility: z.string().min(1, "Please select budget flexibility"),
  fundingSource: z.string().min(1, "Please select funding source"),
  financingNeeded: z.string().min(1, "Please specify if financing is needed"),

  // Timeline
  projectStartDate: z.string().optional(),
  desiredCompletionDate: z.string().optional(),
  budgetDeadline: z.string().min(1, "Please specify when you need the budget"),

  // Consultation Specifics
  consultationPurpose: z.array(z.string()).min(1, "Please select at least one consultation purpose"),
  specificConcerns: z.string().optional(),
  previousEstimates: z.string().min(1, "Please specify if you have previous estimates"),

  // Contact Information
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientTitle: z.string().optional(),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z.string().min(10, "Please enter a valid phone number"),

  // Additional Requirements
  siteVisitRequired: z.string().min(1, "Please specify if site visit is required"),
  presentationRequired: z.string().min(1, "Please specify if presentation is required"),
  additionalServices: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
})

type ProformaBudgetFormData = z.infer<typeof proformaBudgetSchema>

const consultationPurposes = [
  { id: "financing", label: "Securing project financing" },
  { id: "investment", label: "Investment planning and ROI analysis" },
  { id: "board", label: "Board presentation and approval" },
  { id: "feasibility", label: "Feasibility study" },
  { id: "comparison", label: "Comparing contractor proposals" },
  { id: "distressed", label: "Distressed project evaluation" },
  { id: "optimization", label: "Cost optimization strategies" },
  { id: "planning", label: "Long-term budget planning" },
]

const additionalServices = [
  { id: "value-engineering", label: "Value engineering analysis" },
  { id: "scheduling", label: "Project scheduling consultation" },
  { id: "risk-assessment", label: "Risk assessment and mitigation" },
  { id: "permit-analysis", label: "Permit and regulatory analysis" },
  { id: "sustainability", label: "Sustainability and green building consultation" },
  { id: "lifecycle-costing", label: "Lifecycle cost analysis" },
]

export function ProformaBudgetForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [honeypot, setHoneypot] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProformaBudgetFormData>({
    resolver: zodResolver(proformaBudgetSchema),
  })

  const handleFileUpload = (url: string) => {
    setUploadedFiles((prev) => [...prev, url])
  }

  const handlePurposeChange = (purposeId: string, checked: boolean) => {
    const newPurposes = checked ? [...selectedPurposes, purposeId] : selectedPurposes.filter((id) => id !== purposeId)
    setSelectedPurposes(newPurposes)
    setValue("consultationPurpose", newPurposes)
  }

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const newServices = checked ? [...selectedServices, serviceId] : selectedServices.filter((id) => id !== serviceId)
    setSelectedServices(newServices)
    setValue("additionalServices", newServices)
  }

  const onSubmit = async (data: ProformaBudgetFormData) => {
    setIsSubmitting(true)
    setSubmitError(false)

    try {
      // Honeypot check
      if (honeypot) {
        setIsSubmitted(true)
        reset()
        return
      }

      const formData = {
        ...data,
        attachments: uploadedFiles,
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch("/api/proforma-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("API Response:", result)

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit consultation request")
      }

      setIsSubmitted(true)
      reset()
      setUploadedFiles([])
      setSelectedPurposes([])
      setSelectedServices([])

      toast({
        title: "Consultation request submitted successfully!",
        description: "We'll review your requirements and contact you within 24 hours to schedule your consultation.",
      })

      // Log debug info in development
      if (process.env.NODE_ENV === "development" && result.debug) {
        console.log("CRM Integration Status:", result.debug)
      }
    } catch (error) {
      console.error("Error submitting consultation request:", error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitError) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-8 text-center">
          <AlertCircle className="mx-auto text-red-600 mb-4" size={56} />
          <h2 className="text-2xl font-bold text-red-800 mb-4">Something Went Wrong</h2>
          <p className="text-red-700 mb-6">
            We were unable to submit your consultation request. This may be a temporary issue — please try again in a few minutes.
          </p>
          <div className="bg-white rounded-lg p-5 mb-6 inline-block w-full max-w-md border border-red-200">
            <h4 className="font-semibold text-gray-800 mb-3">You can also reach us directly:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p className="flex items-center justify-center">
                <Phone className="mr-2 text-blue-900" size={18} />
                <a href="tel:+16132318639" className="font-semibold text-blue-900 hover:underline">(613) 231-8639</a>
              </p>
              <p className="flex items-center justify-center">
                <Mail className="mr-2 text-blue-900" size={18} />
                <a href="mailto:info@solidsteelmgt.ca" className="font-semibold text-blue-900 hover:underline">info@solidsteelmgt.ca</a>
              </p>
            </div>
          </div>
          <Button
            onClick={() => setSubmitError(false)}
            className="w-full max-w-xs bg-blue-900 hover:bg-blue-800 text-white"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={56} />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Consultation Request Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">
            Thank you for your interest in our proforma budget consultation services. We've received your detailed
            requirements and will review them carefully.
          </p>
          <div className="bg-white rounded-lg p-5 mb-6 inline-block w-full max-w-md border border-green-200">
            <div className="flex items-center justify-center mb-3">
              <MailOpen className="text-blue-900 mr-2" size={22} />
              <h4 className="font-semibold text-gray-800">What happens next?</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">1.</span>Check your inbox for a confirmation email</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">2.</span>Our budget analysis team will reach out within 24 hours</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">3.</span>Detailed project analysis and data collection</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">4.</span>Comprehensive proforma budget delivery within 5 business days</li>
              <li className="flex items-start"><span className="text-green-600 font-bold mr-2">5.</span>Follow-up presentation and recommendations</li>
            </ul>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Don't see our email? Check your spam folder or call us directly at (613) 231-8639.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-900 flex items-center">
          <Calculator className="mr-3" size={28} />
          Proforma Budget Consultation Request
        </CardTitle>
        <p className="text-gray-600">
          Please provide comprehensive details about your project to help us prepare an accurate and detailed proforma
          budget analysis. The more information you provide, the more precise our consultation will be.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Project Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Project Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  {...register("projectName")}
                  placeholder="e.g., Downtown Office Complex"
                  className={errors.projectName ? "border-red-500" : ""}
                />
                {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectLocation">Project Location *</Label>
                <Input
                  id="projectLocation"
                  {...register("projectLocation")}
                  placeholder="City, Province (include postal code if available)"
                  className={errors.projectLocation ? "border-red-500" : ""}
                />
                {errors.projectLocation && <p className="text-red-500 text-sm">{errors.projectLocation.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type *</Label>
              <Select onValueChange={(value) => setValue("projectType", value)}>
                <SelectTrigger className={errors.projectType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse">Warehouse / Distribution Center</SelectItem>
                  <SelectItem value="commercial-garage">Commercial Garage / Service Center</SelectItem>
                  <SelectItem value="industrial">Industrial Facility / Manufacturing</SelectItem>
                  <SelectItem value="office">Office Building / Corporate Headquarters</SelectItem>
                  <SelectItem value="retail">Retail Space / Shopping Center</SelectItem>
                  <SelectItem value="mixed-use">Mixed-Use Development</SelectItem>
                  <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                  <SelectItem value="educational">Educational Facility</SelectItem>
                  <SelectItem value="hospitality">Hospitality / Hotel</SelectItem>
                  <SelectItem value="renovation">Major Renovation / Expansion</SelectItem>
                  <SelectItem value="distressed-takeover">Distressed Project Takeover</SelectItem>
                  <SelectItem value="other">Other (specify in description)</SelectItem>
                </SelectContent>
              </Select>
              {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Detailed Project Description *</Label>
              <Textarea
                id="projectDescription"
                {...register("projectDescription")}
                placeholder="Please provide a comprehensive description including intended use, special features, design requirements, site conditions, and any unique aspects of the project..."
                rows={6}
                className={errors.projectDescription ? "border-red-500" : ""}
              />
              {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
              <p className="text-sm text-gray-500">Minimum 100 characters required for accurate analysis</p>
            </div>
          </div>

          {/* Project Specifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
              Project Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="buildingSize">Building Size *</Label>
                <Input
                  id="buildingSize"
                  {...register("buildingSize")}
                  placeholder="e.g., 50,000 sq ft"
                  className={errors.buildingSize ? "border-red-500" : ""}
                />
                {errors.buildingSize && <p className="text-red-500 text-sm">{errors.buildingSize.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteSize">Site Size</Label>
                <Input id="siteSize" {...register("siteSize")} placeholder="e.g., 5 acres or 200,000 sq ft" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfFloors">Number of Floors *</Label>
                <Select onValueChange={(value) => setValue("numberOfFloors", value)}>
                  <SelectTrigger className={errors.numberOfFloors ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select floors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Floor</SelectItem>
                    <SelectItem value="2">2 Floors</SelectItem>
                    <SelectItem value="3">3 Floors</SelectItem>
                    <SelectItem value="4">4 Floors</SelectItem>
                    <SelectItem value="5-plus">5+ Floors</SelectItem>
                    <SelectItem value="mezzanine">Includes Mezzanine</SelectItem>
                  </SelectContent>
                </Select>
                {errors.numberOfFloors && <p className="text-red-500 text-sm">{errors.numberOfFloors.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="occupancyType">Occupancy Classification *</Label>
                <Select onValueChange={(value) => setValue("occupancyType", value)}>
                  <SelectTrigger className={errors.occupancyType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select occupancy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assembly">Assembly (A)</SelectItem>
                    <SelectItem value="business">Business (B)</SelectItem>
                    <SelectItem value="educational">Educational (E)</SelectItem>
                    <SelectItem value="factory">Factory/Industrial (F)</SelectItem>
                    <SelectItem value="hazardous">Hazardous (H)</SelectItem>
                    <SelectItem value="institutional">Institutional (I)</SelectItem>
                    <SelectItem value="mercantile">Mercantile (M)</SelectItem>
                    <SelectItem value="residential">Residential (R)</SelectItem>
                    <SelectItem value="storage">Storage (S)</SelectItem>
                    <SelectItem value="utility">Utility (U)</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                    <SelectItem value="unknown">To be determined</SelectItem>
                  </SelectContent>
                </Select>
                {errors.occupancyType && <p className="text-red-500 text-sm">{errors.occupancyType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="constructionType">Construction Type *</Label>
                <Select onValueChange={(value) => setValue("constructionType", value)}>
                  <SelectTrigger className={errors.constructionType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select construction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="steel-frame">Steel Frame</SelectItem>
                    <SelectItem value="concrete">Concrete Construction</SelectItem>
                    <SelectItem value="wood-frame">Wood Frame</SelectItem>
                    <SelectItem value="masonry">Masonry Construction</SelectItem>
                    <SelectItem value="pre-engineered">Pre-Engineered Metal Building</SelectItem>
                    <SelectItem value="hybrid">Hybrid Construction</SelectItem>
                    <SelectItem value="to-be-determined">To be determined</SelectItem>
                  </SelectContent>
                </Select>
                {errors.constructionType && <p className="text-red-500 text-sm">{errors.constructionType.message}</p>}
              </div>
            </div>
          </div>

          {/* Budget Parameters */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Budget Parameters</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="estimatedBudget">Estimated Total Budget *</Label>
                <Select onValueChange={(value) => setValue("estimatedBudget", value)}>
                  <SelectTrigger className={errors.estimatedBudget ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1m">Under $1,000,000</SelectItem>
                    <SelectItem value="1m-2.5m">$1,000,000 - $2,500,000</SelectItem>
                    <SelectItem value="2.5m-5m">$2,500,000 - $5,000,000</SelectItem>
                    <SelectItem value="5m-10m">$5,000,000 - $10,000,000</SelectItem>
                    <SelectItem value="10m-25m">$10,000,000 - $25,000,000</SelectItem>
                    <SelectItem value="25m-50m">$25,000,000 - $50,000,000</SelectItem>
                    <SelectItem value="over-50m">Over $50,000,000</SelectItem>
                    <SelectItem value="to-be-determined">To be determined</SelectItem>
                  </SelectContent>
                </Select>
                {errors.estimatedBudget && <p className="text-red-500 text-sm">{errors.estimatedBudget.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetFlexibility">Budget Flexibility *</Label>
                <Select onValueChange={(value) => setValue("budgetFlexibility", value)}>
                  <SelectTrigger className={errors.budgetFlexibility ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select flexibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed budget - cannot exceed</SelectItem>
                    <SelectItem value="flexible-5">Flexible within 5%</SelectItem>
                    <SelectItem value="flexible-10">Flexible within 10%</SelectItem>
                    <SelectItem value="flexible-15">Flexible within 15%</SelectItem>
                    <SelectItem value="very-flexible">Very flexible - value focused</SelectItem>
                    <SelectItem value="unknown">Budget still being determined</SelectItem>
                  </SelectContent>
                </Select>
                {errors.budgetFlexibility && <p className="text-red-500 text-sm">{errors.budgetFlexibility.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fundingSource">Primary Funding Source *</Label>
                <Select onValueChange={(value) => setValue("fundingSource", value)}>
                  <SelectTrigger className={errors.fundingSource ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select funding source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate-cash">Corporate Cash/Reserves</SelectItem>
                    <SelectItem value="bank-financing">Bank/Commercial Financing</SelectItem>
                    <SelectItem value="construction-loan">Construction Loan</SelectItem>
                    <SelectItem value="private-investment">Private Investment</SelectItem>
                    <SelectItem value="government-funding">Government Funding/Grants</SelectItem>
                    <SelectItem value="mixed-funding">Mixed Funding Sources</SelectItem>
                    <SelectItem value="to-be-secured">Funding to be secured</SelectItem>
                  </SelectContent>
                </Select>
                {errors.fundingSource && <p className="text-red-500 text-sm">{errors.fundingSource.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="financingNeeded">Financing Assistance Needed? *</Label>
                <Select onValueChange={(value) => setValue("financingNeeded", value)}>
                  <SelectTrigger className={errors.financingNeeded ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No - funding secured</SelectItem>
                    <SelectItem value="yes-assistance">Yes - need financing assistance</SelectItem>
                    <SelectItem value="yes-connections">Yes - need lender connections</SelectItem>
                    <SelectItem value="maybe">Maybe - exploring options</SelectItem>
                    <SelectItem value="unknown">Unsure at this time</SelectItem>
                  </SelectContent>
                </Select>
                {errors.financingNeeded && <p className="text-red-500 text-sm">{errors.financingNeeded.message}</p>}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Project Timeline</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectStartDate">Desired Project Start Date</Label>
                <div className="relative">
                  <Input id="projectStartDate" type="date" {...register("projectStartDate")} />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desiredCompletionDate">Desired Completion Date</Label>
                <div className="relative">
                  <Input id="desiredCompletionDate" type="date" {...register("desiredCompletionDate")} />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetDeadline">When do you need the budget? *</Label>
                <Select onValueChange={(value) => setValue("budgetDeadline", value)}>
                  <SelectTrigger className={errors.budgetDeadline ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP - Urgent</SelectItem>
                    <SelectItem value="1-week">Within 1 week</SelectItem>
                    <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="1-month">Within 1 month</SelectItem>
                    <SelectItem value="flexible">Flexible timeline</SelectItem>
                  </SelectContent>
                </Select>
                {errors.budgetDeadline && <p className="text-red-500 text-sm">{errors.budgetDeadline.message}</p>}
              </div>
            </div>
          </div>

          {/* Consultation Specifics */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
              Consultation Requirements
            </h3>

            <div className="space-y-4">
              <Label>Primary Purpose of Consultation * (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {consultationPurposes.map((purpose) => (
                  <div key={purpose.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={purpose.id}
                      checked={selectedPurposes.includes(purpose.id)}
                      onCheckedChange={(checked) => handlePurposeChange(purpose.id, checked as boolean)}
                    />
                    <Label htmlFor={purpose.id} className="text-sm font-normal cursor-pointer">
                      {purpose.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.consultationPurpose && (
                <p className="text-red-500 text-sm">{errors.consultationPurpose.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificConcerns">Specific Concerns or Focus Areas</Label>
              <Textarea
                id="specificConcerns"
                {...register("specificConcerns")}
                placeholder="Are there specific aspects of the budget you're most concerned about? Cost overruns, material costs, labor availability, etc..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousEstimates">Do you have previous estimates? *</Label>
              <Select onValueChange={(value) => setValue("previousEstimates", value)}>
                <SelectTrigger className={errors.previousEstimates ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No previous estimates</SelectItem>
                  <SelectItem value="yes-will-share">Yes - will share for comparison</SelectItem>
                  <SelectItem value="yes-confidential">Yes - but confidential</SelectItem>
                  <SelectItem value="rough-only">Only rough estimates</SelectItem>
                </SelectContent>
              </Select>
              {errors.previousEstimates && <p className="text-red-500 text-sm">{errors.previousEstimates.message}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Full Name *</Label>
                <Input
                  id="clientName"
                  {...register("clientName")}
                  placeholder="John Doe"
                  className={errors.clientName ? "border-red-500" : ""}
                />
                {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientTitle">Title/Position</Label>
                <Input
                  id="clientTitle"
                  {...register("clientTitle")}
                  placeholder="e.g., Project Manager, CEO, Developer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company/Organization Name *</Label>
              <Input
                id="companyName"
                {...register("companyName")}
                placeholder="Company Name"
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email Address *</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  {...register("clientEmail")}
                  placeholder="john@company.com"
                  className={errors.clientEmail ? "border-red-500" : ""}
                />
                {errors.clientEmail && <p className="text-red-500 text-sm">{errors.clientEmail.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientPhone">Phone Number *</Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  {...register("clientPhone")}
                  placeholder="(613) 555-0123"
                  className={errors.clientPhone ? "border-red-500" : ""}
                />
                {errors.clientPhone && <p className="text-red-500 text-sm">{errors.clientPhone.message}</p>}
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
              Additional Requirements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteVisitRequired">Site Visit Required? *</Label>
                <Select onValueChange={(value) => setValue("siteVisitRequired", value)}>
                  <SelectTrigger className={errors.siteVisitRequired ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes-required">Yes - site visit required</SelectItem>
                    <SelectItem value="yes-preferred">Yes - preferred but not required</SelectItem>
                    <SelectItem value="no">No - remote consultation sufficient</SelectItem>
                    <SelectItem value="maybe">Maybe - depends on project complexity</SelectItem>
                  </SelectContent>
                </Select>
                {errors.siteVisitRequired && <p className="text-red-500 text-sm">{errors.siteVisitRequired.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="presentationRequired">Presentation Required? *</Label>
                <Select onValueChange={(value) => setValue("presentationRequired", value)}>
                  <SelectTrigger className={errors.presentationRequired ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes-board">Yes - board presentation</SelectItem>
                    <SelectItem value="yes-team">Yes - team presentation</SelectItem>
                    <SelectItem value="yes-stakeholders">Yes - stakeholder presentation</SelectItem>
                    <SelectItem value="no">No - written report sufficient</SelectItem>
                    <SelectItem value="maybe">Maybe - to be determined</SelectItem>
                  </SelectContent>
                </Select>
                {errors.presentationRequired && (
                  <p className="text-red-500 text-sm">{errors.presentationRequired.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Additional Services (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {additionalServices.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                    />
                    <Label htmlFor={service.id} className="text-sm font-normal cursor-pointer">
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
              <Textarea
                id="specialRequirements"
                {...register("specialRequirements")}
                placeholder="Any special requirements, confidentiality needs, presentation formats, or other important considerations..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Project Documents & Plans</Label>
              <ImageUpload
                onUpload={handleFileUpload}
                folder="proforma-consultations"
                maxFiles={10}
                accept="image/*,.pdf,.doc,.docx,.dwg,.xlsx,.xls"
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Upload any relevant documents such as site plans, architectural drawings, specifications, previous
                estimates, or reference materials (max 10 files, 10MB each)
              </p>
            </div>
          </div>

          {/* Honeypot field - hidden from real users */}
          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
            <label htmlFor="proforma_website">Website</label>
            <input
              type="text"
              id="proforma_website"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 hover:bg-blue-800 text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Consultation Request...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Consultation Request
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting this form, you agree to be contacted by our budget analysis team regarding your
              consultation. All project information will be kept strictly confidential.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

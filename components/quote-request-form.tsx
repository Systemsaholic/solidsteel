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
import { toast } from "@/components/ui/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { Calendar, Upload, Loader2, CheckCircle } from "lucide-react"
import { executeRecaptcha } from "@/lib/recaptcha"

const quoteRequestSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  projectDescription: z.string().min(50, "Please provide a detailed description (minimum 50 characters)"),
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  clientEmail: z.string().email("Please enter a valid email address"),
  clientPhone: z.string().min(10, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please select a project type"),
  startDate: z.string().optional(),
  estimatedDuration: z.string().optional(),
  budgetRange: z.string().min(1, "Please select a budget range"),
  projectLocation: z.string().min(2, "Please enter the project location"),
  urgency: z.string().min(1, "Please select project urgency"),
  additionalRequirements: z.string().optional(),
})

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>

export function QuoteRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [honeypot, setHoneypot] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
  })

  const watchedProjectType = watch("projectType")

  const handleFileUpload = (url: string) => {
    setUploadedFiles((prev) => [...prev, url])
  }

  const onSubmit = async (data: QuoteRequestFormData) => {
    setIsSubmitting(true)

    try {
      // Honeypot check
      if (honeypot) {
        setIsSubmitted(true)
        reset()
        return
      }

      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("quote_request")

      const formData = {
        ...data,
        attachments: uploadedFiles,
        submittedAt: new Date().toISOString(),
        recaptchaToken,
      }

      console.log("Submitting form data:", formData)

      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log("API Response:", result)

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit quote request")
      }

      setIsSubmitted(true)
      reset()
      setUploadedFiles([])

      toast({
        title: "Quote request submitted successfully!",
        description: "We'll review your project details and contact you within 48 hours.",
      })

      // Log debug info in development
      if (process.env.NODE_ENV === "development" && result.debug) {
        console.log("CRM Integration Status:", result.debug)
      }
    } catch (error) {
      console.error("Error submitting quote request:", error)
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly at (613) 231-8639.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Quote Request Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">
            Thank you for your interest in Solid Steel Management. We've received your project details and will review
            them carefully. Our team will contact you within 48 hours to discuss your project and next steps.
          </p>
          <div className="space-y-2 text-sm text-green-600">
            <p>• Project review within 24 hours</p>
            <p>• Initial consultation scheduling</p>
            <p>• Detailed proposal delivery</p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-6 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
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
        <CardTitle className="text-2xl text-blue-900">Project Details</CardTitle>
        <p className="text-gray-600">
          Please provide as much detail as possible about your project. This helps us prepare a more accurate and
          comprehensive proposal for you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Project Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  {...register("projectName")}
                  placeholder="e.g., New Warehouse Facility"
                  className={errors.projectName ? "border-red-500" : ""}
                />
                {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectLocation">Project Location *</Label>
                <Input
                  id="projectLocation"
                  {...register("projectLocation")}
                  placeholder="City, Province"
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
                  <SelectItem value="commercial-garage">Commercial Garage</SelectItem>
                  <SelectItem value="industrial">Industrial Facility</SelectItem>
                  <SelectItem value="office">Office Building</SelectItem>
                  <SelectItem value="retail">Retail Space</SelectItem>
                  <SelectItem value="mixed-use">Mixed-Use Development</SelectItem>
                  <SelectItem value="renovation">Renovation / Expansion</SelectItem>
                  <SelectItem value="distressed-takeover">Distressed Project Takeover</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                {...register("projectDescription")}
                placeholder="Please provide a detailed description of your project including size, specific requirements, intended use, and any special considerations..."
                rows={6}
                className={errors.projectDescription ? "border-red-500" : ""}
              />
              {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
              <p className="text-sm text-gray-500">Minimum 50 characters required</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Timeline and Budget */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Timeline & Budget</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date</Label>
                <div className="relative">
                  <Input id="startDate" type="date" {...register("startDate")} />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Select onValueChange={(value) => setValue("estimatedDuration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="12-18-months">12-18 months</SelectItem>
                    <SelectItem value="18-months-plus">18+ months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Project Urgency *</Label>
                <Select onValueChange={(value) => setValue("urgency", value)}>
                  <SelectTrigger className={errors.urgency ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning Phase</SelectItem>
                    <SelectItem value="normal">Normal Timeline</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
                {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range *</Label>
              <Select onValueChange={(value) => setValue("budgetRange", value)}>
                <SelectTrigger className={errors.budgetRange ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500k">Under $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="1m-2.5m">$1,000,000 - $2,500,000</SelectItem>
                  <SelectItem value="2.5m-5m">$2,500,000 - $5,000,000</SelectItem>
                  <SelectItem value="5m-10m">$5,000,000 - $10,000,000</SelectItem>
                  <SelectItem value="over-10m">Over $10,000,000</SelectItem>
                  <SelectItem value="to-be-determined">To be determined</SelectItem>
                </SelectContent>
              </Select>
              {errors.budgetRange && <p className="text-red-500 text-sm">{errors.budgetRange.message}</p>}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
              Additional Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="additionalRequirements">Special Requirements or Considerations</Label>
              <Textarea
                id="additionalRequirements"
                {...register("additionalRequirements")}
                placeholder="Any special requirements, environmental considerations, regulatory requirements, or other important details..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Project Documents & Attachments</Label>
              <ImageUpload
                onUpload={handleFileUpload}
                folder="quote-requests"
                maxFiles={5}
                accept="image/*,.pdf,.doc,.docx,.dwg"
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Upload any relevant documents such as site plans, specifications, drawings, or reference images (max 5
                files, 10MB each)
              </p>
            </div>
          </div>

          {/* Honeypot field - hidden from real users */}
          <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
            <label htmlFor="quote_website">Website</label>
            <input
              type="text"
              id="quote_website"
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
                  Submitting Request...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Quote Request
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting this form, you agree to be contacted by our team regarding your project. We respect your
              privacy and will not share your information with third parties.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

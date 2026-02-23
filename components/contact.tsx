"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { executeRecaptcha } from "@/lib/recaptcha"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
    company_url: "", // honeypot
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, projectType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Honeypot check
      if (formData.company_url) {
        // Silently "succeed" for bots
        toast({
          title: "Form submitted successfully!",
          description: "We'll be in touch with you shortly.",
        })
        setFormData({ name: "", email: "", phone: "", projectType: "", message: "", company_url: "" })
        return
      }

      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha("contact_form")

      // Prepare data for CRM webhook
      const crmData = {
        // Basic contact info
        name: formData.name,
        email: formData.email,
        phone: formData.phone,

        // Project details
        project_type: formData.projectType,

        // Message content
        message: `Project Type: ${formData.projectType}\n\nMessage: ${formData.message}`,

        // Metadata
        source: "Website Contact Form",
        form_type: "contact_form",
        submitted_at: new Date().toISOString(),
      }

      console.log("Sending to CRM:", JSON.stringify(crmData, null, 2))

      // Send to CRM webhook
      const response = await fetch(
        "https://crm.solidsteelmgt.ca/wp-json/gh/v4/webhooks/1-webhook-listener?token=O3MSR63",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "SolidSteelWebsite/1.0",
          },
          body: JSON.stringify(crmData),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error("CRM webhook failed:", {
          status: response.status,
          statusText: response.statusText,
          response: errorText,
        })
        throw new Error(`CRM submission failed: ${response.status}`)
      }

      const responseText = await response.text()
      console.log("CRM Success:", response.status, responseText)

      toast({
        title: "Form submitted successfully!",
        description: "We'll be in touch with you shortly.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
        company_url: "",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at (613) 231-8639.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to discuss your next commercial construction project? Reach out to our team for a consultation and
            free estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <Card className="shadow-md h-full">
            <CardContent className="p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send Us a Message</h3>
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="focus-visible h-10 sm:h-12"
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="focus-visible h-10 sm:h-12"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    required
                    className="focus-visible h-10 sm:h-12"
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select value={formData.projectType} onValueChange={handleSelectChange}>
                    <SelectTrigger id="projectType" className="focus-visible h-10 sm:h-12">
                      <SelectValue placeholder="Select Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design-build">Design-Build & Development</SelectItem>
                      <SelectItem value="project-management">Construction Project Management</SelectItem>
                      <SelectItem value="general-contracting">General Contracting</SelectItem>
                      <SelectItem value="industrial">Industrial & Commercial Buildings</SelectItem>
                      <SelectItem value="renovation">Building Expansions & Renovations</SelectItem>
                      <SelectItem value="distressed">Distressed Project Takeover</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                    required
                    className="focus-visible resize-none"
                    aria-required="true"
                  />
                </div>

                {/* Honeypot field - hidden from real users */}
                <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10" aria-hidden="true">
                  <label htmlFor="company_url">Company URL</label>
                  <input
                    type="text"
                    id="company_url"
                    name="company_url"
                    value={formData.company_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company_url: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 sm:h-14 text-base sm:text-lg"
                  disabled={isSubmitting}
                  aria-label="Submit contact form"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 sm:space-y-8">
            <Card className="bg-muted h-full">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Contact Information</h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-3 sm:mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Our Location</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Based in Eastern Ottawa
                        <br />
                        Serving clients across Ontario and beyond
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-primary mr-3 sm:mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Phone</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        <a href="tel:+16132318639" className="hover:text-primary transition-colors focus-visible">
                          613-231-8639
                        </a>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">Mon-Fri, 7am-5pm</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-primary mr-3 sm:mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Email</h4>
                      <p className="text-gray-600 text-sm sm:text-base break-all">
                        <a
                          href="mailto:info@solidsteelmgt.ca"
                          className="hover:text-primary transition-colors focus-visible"
                        >
                          info@solidsteelmgt.ca
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-primary mr-3 sm:mr-4 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">Business Hours</h4>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Monday – Friday: 7:00 AM – 5:00 PM
                        <br />
                        Saturday & Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

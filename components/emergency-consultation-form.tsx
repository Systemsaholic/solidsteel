"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function EmergencyConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    projectLocation: "",
    projectValue: "",
    urgencyLevel: "",
    projectDescription: "",
    confidentiality: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, confidentiality: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This would be replaced with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Emergency consultation request submitted",
        description: "Our team will contact you within 48 hours to discuss your project.",
      })

      // Reset form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        projectLocation: "",
        projectValue: "",
        urgencyLevel: "",
        projectDescription: "",
        confidentiality: false,
      })
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call our emergency hotline directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name*</Label>
          <Input id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name*</Label>
          <Input id="company" value={formData.company} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address*</Label>
          <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number*</Label>
          <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectType">Project Type*</Label>
          <Select value={formData.projectType} onValueChange={(value) => handleSelectChange("projectType", value)}>
            <SelectTrigger id="projectType">
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="commercial">Commercial Building</SelectItem>
              <SelectItem value="industrial">Industrial Facility</SelectItem>
              <SelectItem value="institutional">Institutional (School, Hospital, etc.)</SelectItem>
              <SelectItem value="residential">Multi-Unit Residential</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectLocation">Project Location*</Label>
          <Input id="projectLocation" value={formData.projectLocation} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="projectValue">Approximate Project Value*</Label>
          <Select value={formData.projectValue} onValueChange={(value) => handleSelectChange("projectValue", value)}>
            <SelectTrigger id="projectValue">
              <SelectValue placeholder="Select value range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under1m">Under $1 million</SelectItem>
              <SelectItem value="1m-5m">$1 million - $5 million</SelectItem>
              <SelectItem value="5m-10m">$5 million - $10 million</SelectItem>
              <SelectItem value="10m-25m">$10 million - $25 million</SelectItem>
              <SelectItem value="over25m">Over $25 million</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="urgencyLevel">Urgency Level*</Label>
          <Select value={formData.urgencyLevel} onValueChange={(value) => handleSelectChange("urgencyLevel", value)}>
            <SelectTrigger id="urgencyLevel">
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical - Immediate response needed</SelectItem>
              <SelectItem value="urgent">Urgent - Response within 24 hours</SelectItem>
              <SelectItem value="high">High - Response within 48 hours</SelectItem>
              <SelectItem value="medium">Medium - Response within 1 week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectDescription">Project Description & Current Issues*</Label>
        <Textarea
          id="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Please describe your project, its current status, and the specific challenges you're facing..."
          rows={5}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="confidentiality" checked={formData.confidentiality} onCheckedChange={handleCheckboxChange} />
        <label
          htmlFor="confidentiality"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          This project requires strict confidentiality and non-disclosure
        </label>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          "Submit Emergency Consultation Request"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you'll receive a response within 48 hours (or sooner based on your selected urgency
        level).
      </p>
    </form>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

interface ImageUploadProps {
  onUpload: (url: string) => void
  folder?: string
  maxFiles?: number
  accept?: string
  className?: string
}

export function ImageUpload({
  onUpload,
  folder = "general",
  maxFiles = 1,
  accept = "image/*",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    if (uploadedImages.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} file(s) allowed`,
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Upload failed")
        }

        const result = await response.json()
        setUploadedImages((prev) => [...prev, result.url])
        onUpload(result.url)
      }

      toast({
        title: "Upload successful",
        description: `${files.length} file(s) uploaded successfully`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((img) => img !== url))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex items-center space-x-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
            <Upload size={20} />
            <span>Choose files</span>
          </div>
        </Label>
        <Input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        {uploading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative h-24 w-full rounded-lg overflow-hidden border">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(url)}
              >
                <X size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500">
        {maxFiles > 1 ? `Upload up to ${maxFiles} images` : "Upload 1 image"} (max 10MB each)
      </p>
    </div>
  )
}

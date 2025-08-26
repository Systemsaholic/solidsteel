"use client"

import Image from "next/image"
import { useState } from "react"
import { getOptimizedImageUrl } from "@/lib/blob"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: "auto" | "webp" | "avif" | "png" | "jpg"
  className?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  format = "auto",
  className,
  fill,
  priority,
  sizes,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)

  // Check if the src is a Vercel Blob URL and optimize it
  const optimizedSrc = src.includes("blob.vercel-storage.com")
    ? getOptimizedImageUrl(src, { width, height, quality, format })
    : src

  const handleError = () => {
    setImageError(true)
  }

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    )
  }

  if (fill) {
    return (
      <Image
        src={optimizedSrc || "/placeholder.svg"}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={optimizedSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={handleError}
    />
  )
}

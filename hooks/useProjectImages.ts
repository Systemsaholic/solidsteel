"use client"

import { useState, useEffect } from "react"

interface ProjectImages {
  heroImage: string | null
  galleryImages: string[]
  isLoading: boolean
  error: string | null
}

export function useProjectImages(projectSlug: string): ProjectImages {
  const [images, setImages] = useState<ProjectImages>({
    heroImage: null,
    galleryImages: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const loadProjectImages = async () => {
      try {
        setImages((prev) => ({ ...prev, isLoading: true, error: null }))

        // Try to fetch images from blob storage API
        const response = await fetch(`/api/blob/projects/${projectSlug}/images`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.statusText}`)
        }

        const data = await response.json()
        
        // Process the blob storage response
        // Look for hero/main image, or use the first image
        const heroImage = data.images.find((img: any) => 
          img.pathname.includes('hero') || img.pathname.includes('main')
        )?.url || data.images[0]?.url || null
        
        const galleryImages = data.images
          .filter((img: any) => 
            !img.pathname.includes('hero') && 
            !img.pathname.includes('main') &&
            !img.pathname.includes('.placeholder')
          )
          .map((img: any) => img.url)

        setImages({
          heroImage,
          galleryImages,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error("Failed to fetch images from Blob Storage:", error)
        
        setImages({
          heroImage: null,
          galleryImages: [],
          isLoading: false,
          error: `Failed to load images: ${error instanceof Error ? error.message : 'Unknown error'}`,
        })
      }
    }

    if (projectSlug) {
      // Load images - will try API first, then fall back to static images
      loadProjectImages()
    }
  }, [projectSlug])

  return images
}

// No fallback images - force use of Blob Storage only

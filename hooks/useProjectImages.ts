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
        console.log("Blob storage unavailable, using static images")
        
        // Immediately use static images as fallback
        const fallbackImages = getStaticFallbackImages(projectSlug)
        
        setImages({
          heroImage: fallbackImages.hero,
          galleryImages: fallbackImages.gallery,
          isLoading: false,
          error: null, // Don't show error if we have fallback images
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

// Fallback static images in case blob storage is unavailable
function getStaticFallbackImages(projectSlug: string): { hero: string | null; gallery: string[] } {
  // Static fallback mappings for existing projects
  const staticMappings: Record<string, { hero: string | null; gallery: string[] }> = {
    "greystone-village-retirement": {
      hero: "/modern-retirement-community.png",
      gallery: [
        "/retirement-community-common-area.png",
        "/retirement-community-dining-hall.png",
        "/retirement-community-gardens.png",
      ],
    },
    "embrun-ford-dealership": {
      hero: "/ford-dealership.png",
      gallery: ["/ford-showroom-interior.png", "/automotive-service-bays.png", "/ford-dealership-lounge.png"],
    },
    "pro-xcavation-headquarters": {
      hero: "/industrial-hq-equipment.png",
      gallery: ["/corporate-office-interior.png", "/placeholder-6a4ci.png"],
    },
    "marc-forget-transport-facility": {
      hero: "/transportation-logistics-facility.png",
      gallery: ["/loading-dock-systems.png", "/fleet-maintenance-bay.png", "/logistics-office.png"],
    },
    "candc-welding-completion": {
      hero: "/construction-site-overview.png",
      gallery: ["/abandoned-construction-site.png"],
    },
  }

  return staticMappings[projectSlug] || { hero: null, gallery: [] }
}

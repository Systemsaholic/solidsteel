interface ProjectImageMapping {
  projectSlug: string
  heroImage: string | null
  galleryImages: string[]
  lastUpdated: Date
}

interface BlobImageFile {
  url: string
  pathname: string
  filename: string
  uploadedAt: Date
  size: number
}

class BlobProjectMapper {
  private cache = new Map<string, ProjectImageMapping>()
  private cacheExpiry = 5 * 60 * 1000 // 5 minutes

  /**
   * Get images for a specific project
   */
  async getProjectImages(projectSlug: string): Promise<ProjectImageMapping> {
    // Check cache first
    const cached = this.cache.get(projectSlug)
    if (cached && Date.now() - cached.lastUpdated.getTime() < this.cacheExpiry) {
      return cached
    }

    try {
      // Get all images for this project from blob storage
      const projectImages = await this.fetchProjectImagesFromBlob(projectSlug)

      // Detect hero image and organize gallery
      const mapping = this.organizeProjectImages(projectSlug, projectImages)

      // Cache the result
      this.cache.set(projectSlug, mapping)

      return mapping
    } catch (error) {
      console.error(`Error fetching images for project ${projectSlug}:`, error)

      // Return empty mapping on error
      return {
        projectSlug,
        heroImage: null,
        galleryImages: [],
        lastUpdated: new Date(),
      }
    }
  }

  /**
   * Fetch images from blob storage for a specific project
   */
  private async fetchProjectImagesFromBlob(projectSlug: string): Promise<BlobImageFile[]> {
    try {
      // This would call your blob storage API
      // For now, return empty array as placeholder
      const response = await fetch(`/api/blob/projects/${projectSlug}/images`)

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`)
      }

      const data = await response.json()
      return data.images || []
    } catch (error) {
      console.error("Error fetching from blob storage:", error)
      return []
    }
  }

  /**
   * Organize images into hero and gallery based on filename and date
   */
  private organizeProjectImages(projectSlug: string, images: BlobImageFile[]): ProjectImageMapping {
    if (images.length === 0) {
      return {
        projectSlug,
        heroImage: null,
        galleryImages: [],
        lastUpdated: new Date(),
      }
    }

    // Hero image detection (filename keywords first)
    const heroKeywords = ["hero", "main", "primary", "cover", "featured"]
    let heroImage: BlobImageFile | null = null

    // First, try to find hero by filename
    for (const keyword of heroKeywords) {
      heroImage = images.find((img) => img.filename.toLowerCase().includes(keyword)) || null
      if (heroImage) break
    }

    // If no hero found by filename, use the most recent image
    if (!heroImage) {
      heroImage = images.reduce((latest, current) => (current.uploadedAt > latest.uploadedAt ? current : latest))
    }

    // Gallery images (all others, sorted by upload date)
    const galleryImages = images
      .filter((img) => img.url !== heroImage?.url)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())

    return {
      projectSlug,
      heroImage: heroImage?.url || null,
      galleryImages: galleryImages.map((img) => img.url),
      lastUpdated: new Date(),
    }
  }

  /**
   * Create project folder if it doesn't exist
   */
  async ensureProjectFolder(projectSlug: string): Promise<void> {
    try {
      await fetch(`/api/blob/projects/${projectSlug}/ensure-folder`, {
        method: "POST",
      })
    } catch (error) {
      console.error(`Error ensuring folder for project ${projectSlug}:`, error)
    }
  }

  /**
   * Clear cache for a specific project
   */
  clearProjectCache(projectSlug: string): void {
    this.cache.delete(projectSlug)
  }

  /**
   * Clear all cache
   */
  clearAllCache(): void {
    this.cache.clear()
  }
}

// Export singleton instance
export const blobProjectMapper = new BlobProjectMapper()

// Utility functions
export async function getProjectImages(projectSlug: string): Promise<ProjectImageMapping> {
  return blobProjectMapper.getProjectImages(projectSlug)
}

export async function ensureProjectFolder(projectSlug: string): Promise<void> {
  return blobProjectMapper.ensureProjectFolder(projectSlug)
}

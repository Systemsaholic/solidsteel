#!/usr/bin/env node

import { list } from '@vercel/blob'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Also try to manually load .env.local as backup
try {
  const envContent = readFileSync('.env.local', 'utf8')
  const lines = envContent.split('\n')
  lines.forEach(line => {
    if (line.includes('BLOB_READ_WRITE_TOKEN=')) {
      const token = line.split('=')[1]
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        process.env.BLOB_READ_WRITE_TOKEN = token
      }
    }
  })
} catch (e) {
  // Ignore if file doesn't exist
}

// Static project data
const staticProjects = [
  {
    title: "Greystone Village Retirement",
    slug: "greystone-village-retirement",
    category: "commercial",
    year: 2019,
    featured: true,
    staticImage: "/modern-retirement-community.png",
    staticGallery: [
      "/retirement-community-common-area.png",
      "/retirement-community-dining-hall.png", 
      "/retirement-community-gardens.png"
    ]
  },
  {
    title: "Embrun Ford Dealership",
    slug: "embrun-ford-dealership", 
    category: "commercial",
    year: 2021,
    featured: true,
    staticImage: "/ford-dealership.png",
    staticGallery: [
      "/ford-showroom-interior.png",
      "/automotive-service-bays.png", 
      "/ford-dealership-lounge.png"
    ]
  },
  {
    title: "Pro-Xcavation Headquarters",
    slug: "pro-xcavation-headquarters",
    category: "industrial", 
    year: 2022,
    featured: false,
    staticImage: "/industrial-hq-equipment.png",
    staticGallery: [
      "/corporate-office-interior.png",
      "/placeholder-6a4ci.png",
      "/placeholder.svg?height=600&width=800"
    ]
  },
  {
    title: "Marc Forget Transport Facility", 
    slug: "marc-forget-transport-facility",
    category: "industrial",
    year: 2020,
    featured: false,
    staticImage: "/transportation-logistics-facility.png",
    staticGallery: [
      "/loading-dock-systems.png",
      "/fleet-maintenance-bay.png",
      "/logistics-office.png"
    ]
  },
  {
    title: "CANDC Welding – Receiver-Assumed Completion",
    slug: "candc-welding-completion",
    category: "takeover",
    year: 2023, 
    featured: true,
    staticImage: "/placeholder-x4kg9.png",
    staticGallery: [
      "/abandoned-construction-site.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800"
    ]
  }
]

async function analyzeProjectImages() {
  try {
    console.log('🔍 Analyzing project images: Blob storage vs Static fallbacks\n')
    
    // Debug: Check if token is loaded
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('❌ BLOB_READ_WRITE_TOKEN not found in environment')
      return
    } else {
      console.log('✅ BLOB_READ_WRITE_TOKEN loaded')
    }
    
    // Get all blob files with both "projects/" and "Projects/" prefixes
    let allBlobs = []
    
    console.log('📡 Fetching blob files with prefix "projects/" and "Projects/"...')
    
    // Try lowercase first
    let hasMore = true
    let cursor
    while (hasMore) {
      const result = await list({
        prefix: 'projects/',
        limit: 1000,
        cursor
      })
      
      allBlobs = [...allBlobs, ...result.blobs]
      hasMore = result.hasMore
      cursor = result.cursor
    }
    
    // Try capitalized
    hasMore = true
    cursor = undefined
    while (hasMore) {
      const result = await list({
        prefix: 'Projects/',
        limit: 1000,
        cursor
      })
      
      allBlobs = [...allBlobs, ...result.blobs]
      hasMore = result.hasMore
      cursor = result.cursor
    }
    
    console.log(`📁 Total blob files found: ${allBlobs.length}`)
    
    // Show first few blob paths for debugging
    if (allBlobs.length > 0) {
      console.log('📄 Sample blob paths:')
      allBlobs.slice(0, 10).forEach(blob => {
        console.log(`   - ${blob.pathname}`)
      })
      if (allBlobs.length > 10) {
        console.log(`   ... and ${allBlobs.length - 10} more`)
      }
    }
    
    // Group blob images by project folder
    const blobProjectFolders = {}
    
    allBlobs.forEach(blob => {
      const pathParts = blob.pathname.split('/')
      if (pathParts.length >= 2) {
        const projectName = pathParts[1]
        
        if (!blobProjectFolders[projectName]) {
          blobProjectFolders[projectName] = {
            count: 0,
            images: [],
            totalSize: 0
          }
        }
        
        blobProjectFolders[projectName].count++
        blobProjectFolders[projectName].images.push({
          filename: pathParts.slice(2).join('/'),
          url: blob.url,
          size: blob.size,
          uploadedAt: blob.uploadedAt
        })
        blobProjectFolders[projectName].totalSize += blob.size
      }
    })
    
    console.log('📊 PROJECT IMAGE ANALYSIS\n')
    console.log('=' .repeat(60))
    
    // Analyze each static project
    staticProjects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`)
      console.log(`   Slug: ${project.slug}`)
      console.log(`   Category: ${project.category} | Year: ${project.year} | Featured: ${project.featured ? 'Yes' : 'No'}`)
      
      const blobData = blobProjectFolders[project.slug]
      
      if (blobData) {
        const sizeInMB = (blobData.totalSize / (1024 * 1024)).toFixed(2)
        console.log(`   ✅ HAS BLOB IMAGES: ${blobData.count} images (${sizeInMB} MB)`)
        
        // Show image types/categories if we can infer them
        const imageTypes = {
          hero: blobData.images.filter(img => img.filename.includes('hero')).length,
          gallery: blobData.images.filter(img => img.filename.includes('gallery')).length,
          thumbnail: blobData.images.filter(img => img.filename.includes('thumbnail')).length,
          other: blobData.images.filter(img => 
            !img.filename.includes('hero') && 
            !img.filename.includes('gallery') && 
            !img.filename.includes('thumbnail')
          ).length
        }
        
        if (imageTypes.hero > 0) console.log(`      - Hero images: ${imageTypes.hero}`)
        if (imageTypes.gallery > 0) console.log(`      - Gallery images: ${imageTypes.gallery}`)
        if (imageTypes.thumbnail > 0) console.log(`      - Thumbnail images: ${imageTypes.thumbnail}`)
        if (imageTypes.other > 0) console.log(`      - Other images: ${imageTypes.other}`)
        
        // Latest upload
        const latestImage = blobData.images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0]
        console.log(`      - Latest upload: ${new Date(latestImage.uploadedAt).toLocaleDateString()}`)
        
      } else {
        console.log(`   ❌ NO BLOB IMAGES - Will use static fallbacks:`)
        console.log(`      - Hero image: ${project.staticImage}`)
        console.log(`      - Gallery: ${project.staticGallery.length} static images`)
        
        // Check if static images are placeholders
        const hasPlaceholders = project.staticGallery.some(img => 
          img.includes('placeholder') || img.includes('svg')
        )
        if (hasPlaceholders) {
          console.log(`      ⚠️  Warning: Contains placeholder images`)
        }
      }
    })
    
    // Check for orphaned blob folders (not matching any static project)
    const orphanedFolders = Object.keys(blobProjectFolders).filter(folder => 
      !staticProjects.some(project => project.slug === folder) && folder.trim() !== ''
    )
    
    if (orphanedFolders.length > 0) {
      console.log(`\n\n🚨 ORPHANED BLOB FOLDERS (no matching static project):`)
      orphanedFolders.forEach(folder => {
        const data = blobProjectFolders[folder]
        const sizeInMB = (data.totalSize / (1024 * 1024)).toFixed(2)
        console.log(`   - "${folder}": ${data.count} images (${sizeInMB} MB)`)
      })
    }
    
    // Summary and recommendations
    console.log(`\n\n📈 SUMMARY & RECOMMENDATIONS`)
    console.log('=' .repeat(60))
    
    const projectsWithBlob = staticProjects.filter(p => blobProjectFolders[p.slug]).length
    const projectsWithoutBlob = staticProjects.length - projectsWithBlob
    const totalBlobImages = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.count, 0)
    const totalBlobSize = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.totalSize, 0)
    
    console.log(`\n📊 Statistics:`)
    console.log(`   • Total static projects: ${staticProjects.length}`)
    console.log(`   • Projects with blob images: ${projectsWithBlob}`)
    console.log(`   • Projects using static fallbacks: ${projectsWithoutBlob}`)
    console.log(`   • Total blob images: ${totalBlobImages}`)
    console.log(`   • Total blob storage: ${(totalBlobSize / (1024 * 1024)).toFixed(2)} MB`)
    
    console.log(`\n💡 Recommendations:`)
    
    // Featured projects without blob images
    const featuredWithoutBlob = staticProjects.filter(p => p.featured && !blobProjectFolders[p.slug])
    if (featuredWithoutBlob.length > 0) {
      console.log(`   🔥 HIGH PRIORITY: Featured projects need real images:`)
      featuredWithoutBlob.forEach(p => console.log(`      - ${p.title} (${p.slug})`))
    }
    
    // Projects with few images
    const projectsWithFewImages = staticProjects.filter(p => {
      const blobData = blobProjectFolders[p.slug]
      return blobData && blobData.count < 5
    })
    if (projectsWithFewImages.length > 0) {
      console.log(`   📸 MEDIUM PRIORITY: Projects with few images (< 5):`)
      projectsWithFewImages.forEach(p => {
        const count = blobProjectFolders[p.slug].count
        console.log(`      - ${p.title}: ${count} image${count === 1 ? '' : 's'}`)
      })
    }
    
    // Projects using static fallbacks
    const projectsUsingFallbacks = staticProjects.filter(p => !blobProjectFolders[p.slug])
    if (projectsUsingFallbacks.length > 0) {
      console.log(`   📂 STATIC FALLBACKS: Projects using static images:`)
      projectsUsingFallbacks.forEach(p => {
        const hasPlaceholders = p.staticGallery.some(img => 
          img.includes('placeholder') || img.includes('svg')
        )
        const status = hasPlaceholders ? '(contains placeholders)' : '(real static images)'
        console.log(`      - ${p.title} ${status}`)
      })
    }
    
    if (orphanedFolders.length > 0) {
      console.log(`   🧹 CLEANUP: ${orphanedFolders.length} orphaned blob folder${orphanedFolders.length === 1 ? '' : 's'} can be removed`)
    }
    
  } catch (error) {
    console.error('❌ Error analyzing project images:', error.message)
    
    if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      console.log('\n💡 Make sure your BLOB_READ_WRITE_TOKEN environment variable is set.')
      console.log('   You can find this token in your Vercel dashboard under Storage > Blob.')
    }
  }
}

// Run the analysis
analyzeProjectImages()
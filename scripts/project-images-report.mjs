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

async function generateProjectImagesReport() {
  try {
    console.log('SOLID STEEL PROJECT IMAGES REPORT')
    console.log('='.repeat(50))
    console.log(`Generated: ${new Date().toLocaleDateString()}\n`)
    
    // Check environment
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('❌ BLOB_READ_WRITE_TOKEN not found in environment')
      return
    }
    
    // Get all blob files with both "projects/" and "Projects/" prefixes
    let allBlobs = []
    
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
    
    console.log('PROJECT STATUS OVERVIEW')
    console.log('-'.repeat(50))
    
    // Analyze each static project
    staticProjects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`)
      console.log(`   Slug: ${project.slug}`)
      console.log(`   Type: ${project.category} | Year: ${project.year} | Featured: ${project.featured ? 'Yes' : 'No'}`)
      
      const blobData = blobProjectFolders[project.slug]
      
      if (blobData) {
        const sizeInMB = (blobData.totalSize / (1024 * 1024)).toFixed(2)
        console.log(`   Status: ✅ REAL IMAGES UPLOADED`)
        console.log(`   Blob Storage: ${blobData.count} images (${sizeInMB} MB)`)
        
        // Show image types breakdown
        const imageTypes = {
          hero: blobData.images.filter(img => img.filename.toLowerCase().includes('hero')).length,
          gallery: blobData.images.filter(img => img.filename.toLowerCase().includes('gallery')).length,
          thumbnail: blobData.images.filter(img => img.filename.toLowerCase().includes('thumbnail')).length,
          other: blobData.images.filter(img => {
            const fn = img.filename.toLowerCase()
            return !fn.includes('hero') && !fn.includes('gallery') && !fn.includes('thumbnail')
          }).length
        }
        
        const breakdown = []
        if (imageTypes.hero > 0) breakdown.push(`${imageTypes.hero} hero`)
        if (imageTypes.gallery > 0) breakdown.push(`${imageTypes.gallery} gallery`)
        if (imageTypes.thumbnail > 0) breakdown.push(`${imageTypes.thumbnail} thumbnail`)
        if (imageTypes.other > 0) breakdown.push(`${imageTypes.other} other`)
        
        if (breakdown.length > 0) {
          console.log(`   Breakdown: ${breakdown.join(', ')}`)
        }
        
        // Latest upload
        const latestImage = blobData.images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0]
        console.log(`   Last Upload: ${new Date(latestImage.uploadedAt).toLocaleDateString()}`)
        
      } else {
        console.log(`   Status: ❌ USING STATIC FALLBACKS`)
        console.log(`   Static Hero: ${project.staticImage}`)
        console.log(`   Static Gallery: ${project.staticGallery.length} images`)
        
        // Check if static images are placeholders
        const hasPlaceholders = project.staticGallery.some(img => 
          img.includes('placeholder') || img.includes('svg')
        )
        if (hasPlaceholders) {
          console.log(`   Warning: ⚠️  Contains placeholder images`)
        }
      }
    })
    
    // Check for orphaned blob folders (not matching any static project)
    const orphanedFolders = Object.keys(blobProjectFolders).filter(folder => 
      !staticProjects.some(project => project.slug === folder) && folder.trim() !== ''
    )
    
    if (orphanedFolders.length > 0) {
      console.log(`\n\nORPHANED BLOB FOLDERS`)
      console.log('-'.repeat(50))
      console.log('These folders exist in blob storage but have no matching static project:')
      orphanedFolders.forEach(folder => {
        const data = blobProjectFolders[folder]
        const sizeInMB = (data.totalSize / (1024 * 1024)).toFixed(2)
        console.log(`   • "${folder}": ${data.count} images (${sizeInMB} MB)`)
      })
    }
    
    // Summary and recommendations
    console.log(`\n\nSUMMARY & RECOMMENDATIONS`)
    console.log('='.repeat(50))
    
    const projectsWithBlob = staticProjects.filter(p => blobProjectFolders[p.slug]).length
    const projectsWithoutBlob = staticProjects.length - projectsWithBlob
    const totalBlobImages = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.count, 0)
    const totalBlobSize = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.totalSize, 0)
    
    console.log(`\nStatistics:`)
    console.log(`   • Total projects defined: ${staticProjects.length}`)
    console.log(`   • Projects with uploaded images: ${projectsWithBlob}`)
    console.log(`   • Projects using static fallbacks: ${projectsWithoutBlob}`)
    console.log(`   • Total uploaded images: ${totalBlobImages}`)
    console.log(`   • Total blob storage used: ${(totalBlobSize / (1024 * 1024)).toFixed(2)} MB`)
    
    console.log(`\nImage Quality Assessment:`)
    
    // Featured projects analysis
    const featuredWithBlob = staticProjects.filter(p => p.featured && blobProjectFolders[p.slug]).length
    const featuredWithoutBlob = staticProjects.filter(p => p.featured && !blobProjectFolders[p.slug]).length
    const featuredTotal = staticProjects.filter(p => p.featured).length
    
    console.log(`   • Featured projects with real images: ${featuredWithBlob}/${featuredTotal}`)
    
    if (featuredWithoutBlob > 0) {
      console.log(`   • ⚠️  ${featuredWithoutBlob} featured project(s) still using static images`)
    }
    
    // Projects with sufficient images
    const projectsWithManyImages = staticProjects.filter(p => {
      const blobData = blobProjectFolders[p.slug]
      return blobData && blobData.count >= 10
    }).length
    
    const projectsWithFewImages = staticProjects.filter(p => {
      const blobData = blobProjectFolders[p.slug]
      return blobData && blobData.count < 10
    }).length
    
    console.log(`   • Projects with 10+ images: ${projectsWithManyImages}`)
    console.log(`   • Projects with <10 images: ${projectsWithFewImages}`)
    
    console.log(`\nRecommendations:`)
    
    if (projectsWithoutBlob > 0) {
      console.log(`   📸 Upload real images for ${projectsWithoutBlob} project(s) still using static fallbacks`)
    }
    
    if (projectsWithFewImages > 0) {
      console.log(`   📸 Consider adding more images to projects with <10 images`)
    }
    
    if (orphanedFolders.length > 0) {
      console.log(`   🧹 Clean up ${orphanedFolders.length} orphaned blob folder(s)`)
    }
    
    if (projectsWithBlob === staticProjects.length) {
      console.log(`   ✅ All projects have uploaded images - excellent coverage!`)
    }
    
  } catch (error) {
    console.error('❌ Error generating report:', error.message)
    
    if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      console.log('\n💡 Make sure your BLOB_READ_WRITE_TOKEN environment variable is set.')
      console.log('   You can find this token in your Vercel dashboard under Storage > Blob.')
    }
  }
}

// Run the report
generateProjectImagesReport()
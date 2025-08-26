#!/usr/bin/env node

import { list } from '@vercel/blob'
import { config } from 'dotenv'

// Load environment variables
config()

async function listProjectImages() {
  try {
    console.log('🔍 Scanning Vercel Blob storage for project images...\n')
    
    // List all files with projects/ prefix
    let allBlobs = []
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
    
    // Also check for Projects/ (capitalized) prefix
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
    
    if (allBlobs.length === 0) {
      console.log('❌ No project images found in blob storage.')
      console.log('   Projects will fall back to static images in /public/images/')
      return
    }
    
    // Group by project folder
    const projectFolders = {}
    
    allBlobs.forEach(blob => {
      const pathParts = blob.pathname.split('/')
      if (pathParts.length >= 2) {
        const projectName = pathParts[1] // projects/project-name/image.jpg -> project-name
        
        if (!projectFolders[projectName]) {
          projectFolders[projectName] = {
            count: 0,
            images: [],
            totalSize: 0
          }
        }
        
        projectFolders[projectName].count++
        projectFolders[projectName].images.push({
          filename: pathParts.slice(2).join('/'), // Get filename after project folder
          url: blob.url,
          size: blob.size,
          uploadedAt: blob.uploadedAt
        })
        projectFolders[projectName].totalSize += blob.size
      }
    })
    
    // Display results
    console.log(`📊 Found ${Object.keys(projectFolders).length} project folders with images:\n`)
    
    const sortedProjects = Object.entries(projectFolders)
      .sort(([,a], [,b]) => b.count - a.count) // Sort by image count descending
    
    sortedProjects.forEach(([projectName, data]) => {
      const sizeInMB = (data.totalSize / (1024 * 1024)).toFixed(2)
      console.log(`📁 ${projectName}`)
      console.log(`   └── ${data.count} images (${sizeInMB} MB total)`)
      
      // Show first few image names as examples
      const exampleImages = data.images.slice(0, 3)
      exampleImages.forEach(img => {
        console.log(`       • ${img.filename}`)
      })
      
      if (data.images.length > 3) {
        console.log(`       • ... and ${data.images.length - 3} more`)
      }
      
      console.log('')
    })
    
    // Summary
    const totalImages = allBlobs.length
    const totalSizeMB = (allBlobs.reduce((sum, blob) => sum + blob.size, 0) / (1024 * 1024)).toFixed(2)
    
    console.log(`📈 Summary:`)
    console.log(`   • Total projects with images: ${Object.keys(projectFolders).length}`)
    console.log(`   • Total images: ${totalImages}`)
    console.log(`   • Total storage used: ${totalSizeMB} MB`)
    
    // Check which projects might need fallback images
    console.log(`\n💡 Recommendations:`)
    const lowImageProjects = sortedProjects.filter(([, data]) => data.count < 3)
    if (lowImageProjects.length > 0) {
      console.log(`   • Projects with few images (may need more):`)
      lowImageProjects.forEach(([projectName, data]) => {
        console.log(`     - ${projectName}: ${data.count} image${data.count === 1 ? '' : 's'}`)
      })
    }
    
  } catch (error) {
    console.error('❌ Error listing project images:', error.message)
    
    if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      console.log('\n💡 Make sure your BLOB_READ_WRITE_TOKEN environment variable is set.')
      console.log('   You can find this token in your Vercel dashboard under Storage > Blob.')
    }
  }
}

// Run the script
listProjectImages()
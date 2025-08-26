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

async function listBlobFolders() {
  try {
    console.log('VERCEL BLOB STORAGE - PROJECT FOLDERS')
    console.log('=' .repeat(50))
    
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
            totalSize: 0,
            lastUpdated: null
          }
        }
        
        blobProjectFolders[projectName].count++
        blobProjectFolders[projectName].totalSize += blob.size
        
        const uploadDate = new Date(blob.uploadedAt)
        if (!blobProjectFolders[projectName].lastUpdated || uploadDate > blobProjectFolders[projectName].lastUpdated) {
          blobProjectFolders[projectName].lastUpdated = uploadDate
        }
      }
    })
    
    // Sort by folder name
    const sortedFolders = Object.entries(blobProjectFolders)
      .filter(([name]) => name.trim() !== '')
      .sort(([a], [b]) => a.localeCompare(b))
    
    console.log(`\nFound ${sortedFolders.length} project folders:\n`)
    
    // Display as table
    console.log('FOLDER NAME                     | IMAGES | SIZE (MB) | LAST UPDATE')
    console.log('-'.repeat(65))
    
    sortedFolders.forEach(([folderName, data]) => {
      const sizeInMB = (data.totalSize / (1024 * 1024)).toFixed(1)
      const lastUpdate = data.lastUpdated ? data.lastUpdated.toLocaleDateString() : 'Unknown'
      
      const nameColumn = folderName.padEnd(30)
      const countColumn = data.count.toString().padStart(6)
      const sizeColumn = sizeInMB.padStart(8)
      const dateColumn = lastUpdate.padStart(12)
      
      console.log(`${nameColumn} | ${countColumn} | ${sizeColumn} | ${dateColumn}`)
    })
    
    // Summary
    const totalImages = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.count, 0)
    const totalSize = Object.values(blobProjectFolders).reduce((sum, data) => sum + data.totalSize, 0)
    
    console.log('-'.repeat(65))
    console.log(`TOTAL: ${sortedFolders.length} folders | ${totalImages} images | ${(totalSize / (1024 * 1024)).toFixed(1)} MB`)
    
    // Show folder paths that would be used in URLs
    console.log(`\nBlob Storage Paths:`)
    sortedFolders.forEach(([folderName]) => {
      console.log(`   Projects/${folderName}/`)
    })
    
  } catch (error) {
    console.error('❌ Error listing blob folders:', error.message)
    
    if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      console.log('\n💡 Make sure your BLOB_READ_WRITE_TOKEN environment variable is set.')
    }
  }
}

// Run the script
listBlobFolders()
import { NextResponse } from 'next/server'
import { listBlobFiles } from '@/lib/blob'

export async function GET() {
  try {
    // Try different possible paths
    const paths = [
      'projects/greystone-village-retirement/',
      'Projects/greystone-village-retirement/',
      'projects/Greystone-village-retirement/',
      'Projects/Greystone-village-retirement/',
      'projects/greystone/',
      'Projects/greystone/',
    ]
    
    const results = []
    
    for (const prefix of paths) {
      try {
        const result = await listBlobFiles({ 
          prefix,
          limit: 100 
        })
        
        if (result.blobs.length > 0) {
          results.push({
            prefix,
            files: result.blobs,
            count: result.blobs.length
          })
        }
      } catch (error) {
        // Continue checking other paths
      }
    }
    
    // Also check all files to see if any contain 'greystone' in the path
    const allFiles = await listBlobFiles({ limit: 1000 })
    const greystoneFiles = allFiles.blobs.filter(blob => 
      blob.pathname.toLowerCase().includes('greystone')
    )
    
    return NextResponse.json({
      success: true,
      searchedPaths: paths,
      foundInPaths: results,
      allGreystoneFiles: greystoneFiles,
      totalGreystoneFiles: greystoneFiles.length
    })
  } catch (error) {
    console.error('Error searching for Greystone files:', error)
    return NextResponse.json({ 
      error: 'Failed to search for Greystone files',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
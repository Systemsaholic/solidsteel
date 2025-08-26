import { NextResponse } from 'next/server'
import { listBlobFiles } from '@/lib/blob'

export async function GET() {
  try {
    const result = await listBlobFiles({ limit: 10 })
    
    return NextResponse.json({
      success: true,
      files: result.blobs,
      hasMore: result.hasMore,
      cursor: result.cursor
    })
  } catch (error) {
    console.error('Error listing blob files:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to list blob files'
    const isTokenError = errorMessage.includes('BLOB_READ_WRITE_TOKEN') || 
                        errorMessage.includes('token') || 
                        errorMessage.includes('authentication')
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      needsToken: isTokenError
    }, { status: isTokenError ? 401 : 500 })
  }
}
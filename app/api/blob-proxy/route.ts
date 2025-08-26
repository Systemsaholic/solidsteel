import { NextRequest, NextResponse } from 'next/server';

// Cache configuration
const CACHE_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }
    
    // Validate that it's a Vercel blob URL
    if (!imageUrl.includes('blob.vercel-storage.com')) {
      return NextResponse.json({ error: 'Invalid blob URL' }, { status: 400 });
    }
    
    // Fetch the image from blob storage with server-side headers
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Vercel-Proxy/1.0)',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    
    if (!response.ok) {
      console.error(`Blob fetch failed: ${response.status} for ${imageUrl}`);
      
      // Return a transparent 1x1 pixel as fallback
      const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
      return new NextResponse(pixel, {
        status: 200,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache',
        },
      });
    }
    
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const blob = await response.blob();
    
    // Return the image with proper headers
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'X-Proxy-Cache': 'HIT',
      },
    });
    
  } catch (error) {
    console.error('Blob proxy error:', error);
    
    // Return a transparent 1x1 pixel on error
    const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    return new NextResponse(pixel, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache',
      },
    });
  }
}
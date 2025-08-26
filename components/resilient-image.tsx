"use client"

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { blobMonitor, reportBlobError } from '@/lib/monitoring'

interface ResilientImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function ResilientImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  className,
  width,
  height,
  loading = 'lazy',
  priority = false,
  onLoad,
  onError,
}: ResilientImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)
  const startTime = useRef<number>(Date.now())
  
  const maxRetries = 3
  const retryDelay = 1000 // Start with 1 second
  
  // Use proxy for blob storage URLs
  const getProxiedUrl = (url: string) => {
    if (url.includes('blob.vercel-storage.com')) {
      return `/api/blob-proxy?url=${encodeURIComponent(url)}`
    }
    return url
  }
  
  useEffect(() => {
    setImageSrc(src)
    setError(false)
    setRetryCount(0)
    setIsLoading(true)
    startTime.current = Date.now()
  }, [src])
  
  const handleError = () => {
    console.warn(`Image failed to load: ${imageSrc}`)
    
    if (retryCount < maxRetries && imageSrc.includes('blob.vercel-storage.com')) {
      // Try with proxy on first retry
      if (retryCount === 0) {
        const proxiedUrl = getProxiedUrl(src)
        console.log(`Retrying with proxy: ${proxiedUrl}`)
        setTimeout(() => {
          setImageSrc(proxiedUrl)
          setRetryCount(retryCount + 1)
        }, retryDelay)
      } else if (retryCount < maxRetries - 1) {
        // Exponential backoff for subsequent retries
        setTimeout(() => {
          setImageSrc(src) // Try original again
          setRetryCount(retryCount + 1)
        }, retryDelay * Math.pow(2, retryCount))
      } else {
        // Final fallback
        setError(true)
        setImageSrc(fallbackSrc)
        
        // Record failure metric
        blobMonitor.recordMetric({
          url: src,
          loadTime: Date.now() - startTime.current,
          success: false,
          retries: retryCount,
          finalUrl: fallbackSrc
        })
        
        // Report error
        reportBlobError(new Error('Image failed to load after retries'), {
          url: src,
          retries: retryCount
        })
        
        onError?.()
      }
    } else {
      // Use fallback
      setError(true)
      setImageSrc(fallbackSrc)
      
      // Record failure metric
      blobMonitor.recordMetric({
        url: src,
        loadTime: Date.now() - startTime.current,
        success: false,
        retries: retryCount,
        finalUrl: fallbackSrc
      })
      
      onError?.()
    }
  }
  
  const handleLoad = () => {
    setIsLoading(false)
    setError(false)
    
    // Record success metric
    blobMonitor.recordMetric({
      url: src,
      loadTime: Date.now() - startTime.current,
      success: true,
      retries: retryCount,
      finalUrl: imageSrc
    })
    
    onLoad?.()
  }
  
  // Intersection Observer for lazy loading with retry
  useEffect(() => {
    if (loading === 'lazy' && imgRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && error && retryCount < maxRetries) {
              // Retry loading when image comes into view
              setImageSrc(src)
              setError(false)
              setRetryCount(0)
            }
          })
        },
        { threshold: 0.1 }
      )
      
      observer.observe(imgRef.current)
      
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current)
        }
      }
    }
  }, [loading, error, retryCount, src])
  
  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      {isLoading && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
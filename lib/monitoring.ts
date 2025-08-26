// Monitoring utility for tracking blob storage performance

interface PerformanceMetric {
  url: string
  loadTime: number
  success: boolean
  retries: number
  finalUrl: string // Track if proxy was used
  timestamp: number
}

class BlobMonitor {
  private metrics: PerformanceMetric[] = []
  private maxMetrics = 100 // Keep last 100 metrics
  
  recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>) {
    const fullMetric: PerformanceMetric = {
      ...metric,
      timestamp: Date.now()
    }
    
    this.metrics.push(fullMetric)
    
    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = metric.success ? '✅' : '❌'
      console.log(
        `${emoji} Image Load: ${metric.url.substring(0, 50)}... | ` +
        `Time: ${metric.loadTime}ms | Retries: ${metric.retries}`
      )
    }
    
    // Send to analytics if configured
    this.sendToAnalytics(fullMetric)
  }
  
  private sendToAnalytics(metric: PerformanceMetric) {
    // Send to your analytics service (e.g., Google Analytics, Vercel Analytics)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'blob_image_load', {
        event_category: 'Performance',
        event_label: metric.url,
        value: metric.loadTime,
        custom_dimensions: {
          success: metric.success,
          retries: metric.retries,
          usedProxy: metric.finalUrl.includes('/api/blob-proxy')
        }
      })
    }
  }
  
  getStats() {
    if (this.metrics.length === 0) return null
    
    const successful = this.metrics.filter(m => m.success)
    const failed = this.metrics.filter(m => !m.success)
    const avgLoadTime = successful.reduce((acc, m) => acc + m.loadTime, 0) / successful.length || 0
    const avgRetries = this.metrics.reduce((acc, m) => acc + m.retries, 0) / this.metrics.length || 0
    const proxyUsage = this.metrics.filter(m => m.finalUrl.includes('/api/blob-proxy')).length
    
    return {
      total: this.metrics.length,
      successful: successful.length,
      failed: failed.length,
      successRate: (successful.length / this.metrics.length * 100).toFixed(1),
      avgLoadTime: Math.round(avgLoadTime),
      avgRetries: avgRetries.toFixed(1),
      proxyUsageRate: (proxyUsage / this.metrics.length * 100).toFixed(1)
    }
  }
  
  // Get failure patterns
  getFailurePatterns() {
    const failures = this.metrics.filter(m => !m.success)
    const patterns: Record<string, number> = {}
    
    failures.forEach(failure => {
      const domain = new URL(failure.url).hostname
      patterns[domain] = (patterns[domain] || 0) + 1
    })
    
    return patterns
  }
}

// Export singleton instance
export const blobMonitor = new BlobMonitor()

// Error reporting utility
export function reportBlobError(error: Error, context: { url: string; retries: number }) {
  console.error('Blob Storage Error:', {
    message: error.message,
    url: context.url,
    retries: context.retries,
    timestamp: new Date().toISOString()
  })
  
  // Send to error tracking service (e.g., Sentry)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      tags: {
        component: 'blob-storage',
        url: context.url
      },
      extra: context
    })
  }
}
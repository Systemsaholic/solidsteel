"use client"

import { useState, useEffect } from 'react'
import { blobMonitor } from '@/lib/monitoring'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function BlobMonitorDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [failures, setFailures] = useState<any>({})
  
  useEffect(() => {
    const updateStats = () => {
      setStats(blobMonitor.getStats())
      setFailures(blobMonitor.getFailurePatterns())
    }
    
    // Update immediately
    updateStats()
    
    // Update every 5 seconds
    const interval = setInterval(updateStats, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  if (!stats) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-white/95 backdrop-blur shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Blob Storage Monitor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-500">Success Rate</p>
              <p className="font-semibold text-green-600">{stats.successRate}%</p>
            </div>
            <div>
              <p className="text-gray-500">Avg Load Time</p>
              <p className="font-semibold">{stats.avgLoadTime}ms</p>
            </div>
            <div>
              <p className="text-gray-500">Total Loads</p>
              <p className="font-semibold">{stats.total}</p>
            </div>
            <div>
              <p className="text-gray-500">Proxy Usage</p>
              <p className="font-semibold">{stats.proxyUsageRate}%</p>
            </div>
          </div>
          
          {stats.failed > 0 && (
            <div className="pt-2 border-t">
              <p className="text-red-600 font-medium">Failures: {stats.failed}</p>
              {Object.entries(failures).map(([domain, count]) => (
                <p key={domain} className="text-gray-600">
                  {domain}: {count as number}
                </p>
              ))}
            </div>
          )}
          
          <div className="pt-2 border-t text-gray-500">
            <p>Avg Retries: {stats.avgRetries}</p>
            <p>Success: {stats.successful} | Failed: {stats.failed}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
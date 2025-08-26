"use client"

import { useEffect } from 'react'

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      // Only register in production
      if (process.env.NODE_ENV === 'production') {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration.scope)
            
            // Check for updates periodically
            setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000) // Check every hour
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      }
    }
  }, [])
  
  return null
}
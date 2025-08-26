'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function UploadVideoPage() {
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file')
      return
    }

    // Check file size (limit to 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      setError('Video file is too large. Maximum size is 100MB')
      return
    }

    setIsLoading(true)
    setError('')
    setUploadStatus('Preparing upload...')
    setUploadProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'video')

    try {
      // Create XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest()
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setUploadProgress(Math.round(percentComplete))
          setUploadStatus(`Uploading... ${Math.round(percentComplete)}%`)
        }
      })

      // Handle completion
      const response = await new Promise<any>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(new Error(xhr.responseText))
          }
        }
        xhr.onerror = () => reject(new Error('Network error'))
        
        xhr.open('POST', '/api/upload/video')
        xhr.send(formData)
      })

      if (response.url) {
        setVideoUrl(response.url)
        setUploadStatus('Upload successful! Video is now available.')
        
        // Copy the expected path to clipboard
        const expectedPath = 'video/builders-on-the-construction-2023-11-27-05-02-01-utc.mp4'
        const instruction = `Video uploaded successfully!\n\nTo use this video as the hero background:\n1. The video should be renamed to: ${expectedPath}\n2. Current URL: ${response.url}`
        setUploadStatus(instruction)
      } else {
        throw new Error(response.error || 'Upload failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploadStatus('')
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Hero Video Background</CardTitle>
          <CardDescription>
            Upload a video file to use as the background for the hero section on the home page.
            The video should be in MP4 format and under 100MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Select Video File
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90
                disabled:opacity-50"
            />
            <p className="text-xs text-gray-500">
              Recommended: 1920x1080 resolution, under 10MB for faster loading
            </p>
          </div>

          {isLoading && uploadProgress > 0 && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-gray-600">{uploadStatus}</p>
            </div>
          )}

          {uploadStatus && !isLoading && (
            <div className="p-4 bg-green-50 text-green-800 rounded-md whitespace-pre-line">
              {uploadStatus}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-md">
              Error: {error}
            </div>
          )}

          {videoUrl && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploaded Video Preview:</p>
              <video 
                src={videoUrl} 
                controls 
                className="w-full max-w-md rounded-md border"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              <p className="text-xs text-gray-600 break-all">URL: {videoUrl}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
              <li>Upload your video file using the file selector above</li>
              <li>The video will be automatically uploaded to Vercel Blob storage</li>
              <li>Once uploaded, the hero section will automatically use the video</li>
              <li>If the video fails to load, it will fall back to a static image</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
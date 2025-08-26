'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestBlobPage() {
  const [uploadStatus, setUploadStatus] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError('')
    setUploadStatus('Uploading...')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'test')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setImageUrl(data.url)
      setUploadStatus('Upload successful!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploadStatus('')
    } finally {
      setIsLoading(false)
    }
  }

  const testBlobList = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/blob/test')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to list blob files')
      }
      
      setUploadStatus(`Found ${data.files.length} files in blob storage`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to list files')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Vercel Blob Integration Test</CardTitle>
          <CardDescription>
            Test the Vercel Blob storage integration to ensure it's working properly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Upload Test Image
            </label>
            <input
              type="file"
              accept="image/*"
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
          </div>

          <Button 
            onClick={testBlobList}
            disabled={isLoading}
            variant="outline"
          >
            Test List Blob Files
          </Button>

          {uploadStatus && (
            <div className="p-4 bg-green-50 text-green-800 rounded-md">
              {uploadStatus}
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-800 rounded-md">
              Error: {error}
              {error.includes('BLOB_READ_WRITE_TOKEN') && (
                <div className="mt-2 text-sm">
                  <p>The BLOB_READ_WRITE_TOKEN environment variable is not set.</p>
                  <p>To fix this:</p>
                  <ol className="list-decimal ml-5 mt-1">
                    <li>Go to your Vercel project dashboard</li>
                    <li>Navigate to Storage → Create Database → Blob</li>
                    <li>Copy the BLOB_READ_WRITE_TOKEN</li>
                    <li>Add it to your .env.local file</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {imageUrl && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploaded Image:</p>
              <img 
                src={imageUrl} 
                alt="Uploaded test" 
                className="max-w-full h-auto rounded-md border"
              />
              <p className="text-xs text-gray-600 break-all">{imageUrl}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
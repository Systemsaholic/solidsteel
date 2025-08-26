"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { OptimizedImage } from "@/components/optimized-image"
import { listBlobFiles, deleteFromBlob, type BlobFile } from "@/lib/blob"
import { toast } from "@/components/ui/use-toast"
import { Trash2, Download, Eye } from "lucide-react"

export default function ImageManagementPage() {
  const [images, setImages] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const result = await listBlobFiles({ limit: 100 })
      setImages(result.blobs)
    } catch (error) {
      console.error("Error loading images:", error)
      toast({
        title: "Error",
        description: "Failed to load images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = (url: string) => {
    // Refresh the images list after upload
    loadImages()
  }

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    setDeleting(url)
    try {
      await deleteFromBlob(url)
      setImages((prev) => prev.filter((img) => img.url !== url))
      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    } finally {
      setDeleting(null)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "Copied",
      description: "Image URL copied to clipboard",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Image Management</h1>
        <p className="text-gray-600">Upload and manage images for your construction website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload onUpload={handleUpload} folder="website" maxFiles={5} className="w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Images ({images.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No images uploaded yet</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image.url} className="group relative">
                      <div className="relative h-32 w-full rounded-lg overflow-hidden border">
                        <OptimizedImage src={image.url} alt={image.pathname} fill className="object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" onClick={() => copyToClipboard(image.url)}>
                            <Eye size={16} />
                          </Button>
                          <Button size="sm" variant="secondary" asChild>
                            <a href={image.url} download target="_blank" rel="noopener noreferrer">
                              <Download size={16} />
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(image.url)}
                            disabled={deleting === image.url}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 truncate">{image.pathname}</p>
                        <p className="text-xs text-gray-400">{(image.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

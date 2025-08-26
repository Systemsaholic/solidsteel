"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GalleryModal } from "@/components/gallery-modal"
import Image from "next/image"

export default function TestGalleryPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Test images using the project's actual images
  const testImages = [
    "/industrial-hq-equipment.png",
    "/corporate-office-interior.png",
    "/construction-site-overview.png",
    "/modern-retirement-community.png"
  ]
  
  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Gallery Modal Test Page</h1>
      <p className="mb-6">Click on any image below to test the gallery modal:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {testImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[200px] rounded-lg overflow-hidden cursor-pointer group border-2 border-gray-200 hover:border-blue-500"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt={`Test image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg font-semibold">
                Click to Open
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <Button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          Open Gallery Modal Directly
        </Button>
        
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Debug Info:</h2>
          <p>Modal Open: {isOpen ? "Yes" : "No"}</p>
          <p>Current Index: {currentIndex}</p>
          <p>Total Images: {testImages.length}</p>
        </div>
      </div>
      
      <GalleryModal
        images={testImages}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigate={setCurrentIndex}
        title="Test Gallery"
      />
    </div>
  )
}
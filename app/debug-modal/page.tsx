"use client"

import { useState } from "react"
import { GalleryModal } from "@/components/gallery-modal"
import Image from "next/image"
import { Expand } from "lucide-react"

export default function DebugModalPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Using actual project images
  const images = [
    "/industrial-hq-equipment.png",
    "/corporate-office-interior.png",
    "/construction-site-overview.png"
  ]
  
  const openModal = (index: number) => {
    setCurrentIndex(index)
    setModalOpen(true)
  }
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Gallery Modal Test - Pro-Xcavation Style</h1>
      
      {/* Hero Image Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hero Image (Click to Open)</h2>
        <div 
          className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => openModal(0)}
        >
          <Image
            src={images[0]}
            alt="Pro-Xcavation Headquarters"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
            <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
          </div>
        </div>
      </div>
      
      {/* Gallery Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Project Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="relative h-[120px] md:h-[150px] rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => openModal(index + 1)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p>Modal Open: {modalOpen ? "Yes" : "No"}</p>
        <p>Current Image Index: {currentIndex}</p>
      </div>
      
      {/* The Modal */}
      <GalleryModal
        images={images}
        currentIndex={currentIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={setCurrentIndex}
        title="Pro-Xcavation Headquarters"
      />
    </div>
  )
}
"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { scrollToElement } from "@/lib/scroll-utils"

export function Hero() {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoError = () => {
    console.error("Video failed to load, falling back to image.")
    setVideoError(true)
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const handleScrollToContact = () => {
    scrollToElement("#contact", { offset: 100 })
  }

  const handleScrollToProjects = () => {
    scrollToElement("#projects", { offset: 100 })
  }

  // Primary video source from blob storage
  const blobVideoSrc = `${process.env.NEXT_PUBLIC_BLOB_BASE_URL || "https://5v8oej1w91asigpe.public.blob.vercel-storage.com"}/video/builders-on-the-construction-2023-11-27-05-02-01-utc.mp4`
  
  // Alternative: Use a free stock video from Pexels as fallback
  // This is a construction-related video that's freely available
  const fallbackVideoSrc = "https://cdn.pixabay.com/video/2021/08/05/84326-589325522_large.mp4"

  return (
    <section id="home" className="relative bg-gray-900 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        {/* Static background image - shows instantly */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          aria-hidden="true"
        />

        {/* Video overlay - fades in once loaded */}
        {!videoError && (
          <video
            key={blobVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ${videoLoaded ? "opacity-40" : ""}`}
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            aria-hidden="true"
          >
            <source src={blobVideoSrc} type="video/mp4" />
            <source src={fallbackVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 z-10">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-blue-50 leading-tight">
            Strength You Can Build On — Excellence in Commercial Construction
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl text-white leading-relaxed">
            At Solid Steel Management, our name reflects our commitment to delivering construction projects that are as
            strong, resilient, and dependable as steel. Since 2015, we've been a trusted name in commercial construction
            across the Ottawa Valley, known for our quality craftsmanship, on-time delivery, and tailored project
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
              onClick={handleScrollToContact}
            >
              Start the Conversation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg bg-transparent"
              onClick={handleScrollToProjects}
            >
              View Our Projects
            </Button>
          </div>
        </div>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-2 text-xs z-50">
          Video Status: {videoError ? "Error" : videoLoaded ? "Loaded" : "Loading..."}
          <br />
          Video Source: Blob Storage
        </div>
      )}
    </section>
  )
}
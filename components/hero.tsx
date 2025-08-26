"use client"
import { Button } from "@/components/ui/button"
import { scrollToElement } from "@/lib/scroll-utils"

export function Hero() {
  const handleScrollToContact = () => {
    scrollToElement("#contact", { offset: 100 })
  }

  const handleScrollToProjects = () => {
    scrollToElement("#projects", { offset: 100 })
  }

  return (
    <section id="home" className="relative bg-gray-900 text-white min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          aria-hidden="true"
        />
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
    </section>
  )
}

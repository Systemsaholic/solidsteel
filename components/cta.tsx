import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="bg-blue-900 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Start Your Project With Confidence
          </h2>
          <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
            Ready to bring your vision to life? Contact Solid Steel Management today to discuss your next commercial
            project. We'll help you build with confidence, clarity, and craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-yellow-600 hover:bg-yellow-500 text-white w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
            >
              <Link href="/contact">Start the Conversation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white w-full sm:w-auto py-3 sm:py-4 text-base sm:text-lg"
            >
              <Link href="/projects/gallery">View Our Portfolio</Link>
            </Button>
          </div>
          <p className="text-blue-200 mt-4 sm:mt-6 text-base sm:text-lg font-medium">
            Let's build something remarkable — together.
          </p>
        </div>
      </div>
    </section>
  )
}

import type { ProcessStep } from "@/data/services"

interface ServiceProcessStepsProps {
  steps: ProcessStep[]
}

export function ServiceProcessSteps({ steps }: ServiceProcessStepsProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Our Approach</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            A proven methodology that delivers consistent results on every project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 h-full shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white font-bold text-lg mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

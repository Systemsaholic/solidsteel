import Link from "next/link"
import { Building2, ClipboardCheck, Hammer, Factory, TrendingUp, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Services() {
  const services = [
    {
      icon: <Building2 size={36} className="text-primary mb-4" />,
      title: "Design-Build & Development",
      description: "Integrated design and construction solutions for maximum efficiency and accountability.",
      href: "/services/design-build",
    },
    {
      icon: <ClipboardCheck size={36} className="text-primary mb-4" />,
      title: "Construction Project Management",
      description: "Expert oversight that keeps your project on track, on time, and on budget.",
      href: "/services/project-management",
    },
    {
      icon: <Hammer size={36} className="text-primary mb-4" />,
      title: "General Contracting",
      description: "Complete management of commercial builds from pre-construction to final turnover.",
      href: "/services/general-contracting",
    },
    {
      icon: <Factory size={36} className="text-primary mb-4" />,
      title: "Industrial & Commercial Buildings",
      description: "Functional, high-performance spaces for warehouses, logistics, production, and more.",
      href: "/services/steel-construction",
    },
    {
      icon: <TrendingUp size={36} className="text-primary mb-4" />,
      title: "Building Expansions & Renovations",
      description: "Customized solutions to grow or modernize your commercial space.",
      href: "/services/general-contracting",
    },
    {
      icon: <ShieldCheck size={36} className="text-primary mb-4" />,
      title: "Turnaround Projects",
      description: "Strategic recovery and expert management to bring troubled builds back on track.",
      href: "/case-studies",
    },
  ]

  return (
    <section id="services" className="bg-muted py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-700 mb-3 sm:mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed px-4 sm:px-0">
            We offer comprehensive commercial construction services designed to support your business goals from the
            ground up. Whether you're launching a new facility, expanding an existing space, or recovering a struggling
            build, our team brings clarity, structure, and performance to every phase of your project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <Card className="card-hover h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 sm:mb-4">{service.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 leading-tight">{service.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Commercial Construction Experts",
  description:
    "Learn about Solid Steel Management, our history, values, and commitment to excellence in commercial steel construction.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Solid Steel Management | Commercial Construction Experts",
    description: "Learn about our history, values, and commitment to excellence in commercial steel construction.",
    url: "https://solidsteelmgt.ca/about",
    images: [
      {
        url: "/images/about-og.png",
        width: 1200,
        height: 630,
        alt: "About Solid Steel Management",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-blue-50">About Solid Steel Management</h1>
            <p className="text-xl text-blue-100">Building excellence in commercial construction since 1998</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-700 mb-6">
                Our Story: Built from Resolve. Driven by Integrity.
              </h2>
              <p className="text-gray-700 mb-6">
                In 2015, Marc Boulianne founded Solid Steel Management with a clear mission — to build a company rooted
                in resilience, quality, and trust. At the time, Marc was deeply involved in the construction of
                retirement homes through Greystone Village Retirement, a thriving enterprise gaining impressive
                momentum. But when COVID-19 brought the industry to a sudden halt, his partners chose to exit the
                building space altogether.
              </p>
              <p className="text-gray-700 mb-6">Marc couldn't accept that.</p>
              <p className="text-gray-700 mb-6">
                Still young and driven by a deep passion for the craft, Marc launched Solid Steel Management — not just
                to continue building, but to raise the standard of what clients should expect from a commercial
                construction partner.
              </p>
              <p className="text-gray-700 mb-6">
                From day one, Solid Steel Management focused on commercial builds, offering full-scope services
                including project development, pro forma budgeting, and turnkey delivery. The company's first project —
                a commercial garage with office space — set the tone for everything that followed: efficient execution,
                transparent communication, and excellence from the ground up.
              </p>
              <p className="text-gray-700 mb-6">
                To this day, Solid Steel Management has remained true to its core: a company that thrives on delivering
                reliable, safe, innovative, and integrity-driven commercial construction, while forging long-lasting
                relationships with clients who know they're in expert hands.
              </p>
              <p className="text-gray-700 mb-6">
                When people hear the name Solid Steel Management, we want them to feel something simple but powerful:
              </p>
              <p className="text-gray-700 mb-6 font-semibold italic">"I'm in capable hands."</p>
              <p className="text-gray-700 mb-2">Because we don't just build structures.</p>
              <p className="text-gray-700 mb-2">We build trust. We bring clarity to complexity.</p>
              <p className="text-gray-700">
                And we see every project through — with the precision, professionalism, and pride that our name stands
                for.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/construction-team-steel.png"
                alt="Solid Steel Management team at construction site"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Solid Steel Management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description:
                  "We never compromise on quality. Every project we undertake is built to the highest standards using premium materials and expert craftsmanship.",
              },
              {
                title: "Integrity",
                description:
                  "We conduct our business with honesty, transparency, and ethical practices. Our clients trust us to deliver on our promises.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously seek innovative solutions and embrace new technologies to improve efficiency, sustainability, and project outcomes.",
              },
              {
                title: "Safety",
                description:
                  "Safety is our top priority. We maintain rigorous safety protocols to ensure the wellbeing of our team, clients, and the public.",
              },
              {
                title: "Collaboration",
                description:
                  "We believe in the power of collaboration. We work closely with clients, architects, engineers, and subcontractors to achieve shared goals.",
              },
              {
                title: "Sustainability",
                description:
                  "We are committed to environmentally responsible construction practices that minimize waste and energy consumption.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Strategic Partnerships</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Solid Steel Management is led by Marc Boulianne, who has built a powerful network of strategic
              partnerships with industry-leading companies. These collaborations enable us to deliver exceptional
              results on every project.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Featured Partners</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Pro-X Excavation",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ogEU1nFvLZHA8g7ZyWT2sphQfGTPDV.png",
                },
                {
                  name: "Domination Steel",
                  logo: "https://dominationsteelerectors.com/wp-content/themes/Untitled4/images/20ffecfe52379ed59424ab2a30cd352d_logonoir.png",
                },
                {
                  name: "Matte Forming",
                  logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-23%20at%201.36.13%E2%80%AFPM-Z0OypS9HENENwS5weMDon1o58UlTEg.png",
                },
                {
                  name: "Maxi Power Electrical",
                  logo: "https://static.wixstatic.com/media/33c230_5d2be731afbf4411acacda9222d267ef.jpg/v1/crop/x_9,y_0,w_598,h_200/fill/w_544,h_182,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/33c230_5d2be731afbf4411acacda9222d267ef.jpg",
                },
              ].map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                  <div className="h-24 w-full relative mb-4">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-blue-700 text-center">{partner.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Additional Industry Partners</h3>
              <ul className="space-y-4">
                {["Bertrand Plumbing and Heating", "Absolute Drafting and Design Inc", "LRL Engineering", "Nudura"].map(
                  (partner, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-blue-900 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{partner}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Strategic Financial Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "BDC",
                    logo: "/bdc-logo.png",
                  },
                  {
                    name: "National Bank of Canada",
                    logo: "/placeholder-logo.png",
                  },
                ].map((partner, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <div className="h-16 w-full relative mb-4">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-blue-700 text-center">{partner.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">The Power of Partnership</h3>
            <p className="text-gray-700 max-w-3xl mx-auto">
              By collaborating with these trusted partners, Solid Steel Management delivers comprehensive construction
              solutions with the agility of a boutique firm and the capabilities of a much larger organization. Each
              project benefits from direct leadership and carefully selected expertise tailored to its specific
              requirements.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

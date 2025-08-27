export interface Project {
  id: number
  title: string
  slug: string
  category: "commercial" | "industrial" | "warehouse" | "garage" | "takeover"
  description: string
  location?: string
  completionDate?: string
  client?: string
  squareFootage?: string
  image?: string
  gallery?: string[]
  challenge?: string
  solution?: string
  results?: string
  features?: string[]
  // Enhanced fields for filtering and search
  technologies?: string[]
  projectValue?: string
  duration?: string
  status: "completed" | "in-progress" | "planned"
  tags?: string[]
  year?: number
  featured?: boolean
  hasCaseStudy?: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Greystone Village Retirement",
    slug: "greystone-village-retirement",
    category: "commercial",
    location: "Ottawa, ON",
    completionDate: "September 2019",
    client: "Greystone Village Development",
    squareFootage: "85,000 sq ft",
    projectValue: "$12.5M",
    duration: "18 months",
    status: "completed",
    year: 2019,
    featured: true,
    technologies: ["Steel Frame", "Concrete", "HVAC Systems", "Accessibility Features"],
    tags: ["senior living", "accessibility", "healthcare", "community"],
    description:
      "Complete construction of a state-of-the-art retirement community facility featuring modern amenities, accessible design, and beautiful common areas for residents.",
    image: "/modern-retirement-community.png",
    gallery: [
      "/retirement-community-common-area.png",
      "/retirement-community-dining-hall.png",
      "/retirement-community-gardens.png",
    ],
    challenge:
      "The client needed a facility that would meet strict accessibility requirements while creating a warm, welcoming environment for seniors.",
    solution:
      "We designed and constructed a comprehensive retirement facility with barrier-free access, specialized safety features, and comfortable living spaces that promote community interaction.",
    results:
      "The completed facility has become a model for senior living in the region, with 100% occupancy achieved within 6 months of opening.",
    features: [
      "Fully accessible design throughout",
      "Modern dining and common areas",
      "Specialized safety and security systems",
      "Beautiful landscaped outdoor spaces",
      "Energy-efficient building systems",
      "Dedicated healthcare and wellness areas",
    ],
  },
  {
    id: 2,
    title: "Embrun Ford Dealership",
    slug: "embrun-ford-dealership",
    category: "commercial",
    location: "Embrun, ON",
    completionDate: "June 2021",
    client: "Embrun Ford",
    squareFootage: "32,000 sq ft",
    projectValue: "$8.2M",
    duration: "14 months",
    status: "completed",
    year: 2021,
    featured: true,
    technologies: ["Steel Structure", "Glass Curtain Wall", "LED Lighting", "Service Equipment"],
    tags: ["automotive", "retail", "showroom", "service center"],
    description:
      "Full-service automotive dealership featuring a modern showroom, comprehensive service facilities, and customer amenities designed to enhance the car buying experience.",
    image: "/ford-dealership.png",
    gallery: ["/ford-showroom-interior.png", "/automotive-service-bays.png", "/ford-dealership-lounge.png"],
    challenge:
      "The project required meeting Ford's strict brand standards while accommodating both sales and service operations in an efficient layout.",
    solution:
      "We delivered a purpose-built facility that maximizes both showroom appeal and service efficiency, with specialized areas for different automotive services.",
    results:
      "The dealership has increased sales capacity by 40% and improved customer satisfaction scores through enhanced facilities and service capabilities.",
    features: [
      "Modern vehicle showroom with natural lighting",
      "Multiple service bays with specialized equipment",
      "Customer waiting areas with amenities",
      "Parts storage and inventory management systems",
      "Ford brand-compliant design elements",
      "Energy-efficient lighting and HVAC systems",
    ],
  },
  {
    id: 3,
    title: "Pro-Xcavation Headquarters",
    slug: "pro-xcavation-headquarters",
    category: "industrial",
    location: "Eastern Ontario",
    completionDate: "March 2022",
    client: "Pro-Xcavation Ltd.",
    squareFootage: "28,000 sq ft",
    projectValue: "$5.8M",
    duration: "12 months",
    status: "completed",
    year: 2022,
    featured: false,
    technologies: ["Heavy-Duty Flooring", "Crane Systems", "Industrial HVAC", "Security Systems"],
    tags: ["headquarters", "equipment storage", "maintenance", "corporate"],
    description:
      "Corporate headquarters and equipment storage facility combining modern office space with heavy equipment storage and maintenance capabilities.",
    image: "/industrial-hq-equipment.png",
    gallery: ["/corporate-office-interior.png", "/placeholder-6a4ci.png", "/placeholder.svg?height=600&width=800"],
    challenge:
      "The client needed a facility that could serve as both a professional corporate headquarters and a functional base for heavy equipment operations.",
    solution:
      "We designed a dual-purpose facility with separate zones for office operations and equipment storage, connected by efficient workflow patterns.",
    results:
      "The facility has improved operational efficiency by 35% and provides a professional image that has helped secure new commercial contracts.",
    features: [
      "Modern corporate office spaces",
      "Heavy equipment storage and maintenance bays",
      "Specialized flooring for heavy machinery",
      "Efficient traffic flow for large vehicles",
      "Professional meeting and conference facilities",
      "Integrated security and monitoring systems",
    ],
  },
  {
    id: 4,
    title: "Marc Forget Transport Facility",
    slug: "marc-forget-transport-facility",
    category: "industrial",
    location: "Ottawa Valley, ON",
    completionDate: "August 2020",
    client: "Marc Forget Transport",
    squareFootage: "45,000 sq ft",
    projectValue: "$7.1M",
    duration: "16 months",
    status: "completed",
    year: 2020,
    featured: false,
    technologies: ["Loading Dock Systems", "Fuel Storage", "Fleet Management", "Logistics Software"],
    tags: ["transportation", "logistics", "fleet management", "cargo"],
    description:
      "Comprehensive logistics and transportation hub featuring specialized loading infrastructure, vehicle maintenance facilities, and administrative offices.",
    image: "/transportation-logistics-facility.png",
    gallery: ["/loading-dock-systems.png", "/fleet-maintenance-bay.png", "/logistics-office.png"],
    challenge:
      "The project required accommodating various truck sizes and cargo types while maintaining efficient traffic flow and meeting transportation industry regulations.",
    solution:
      "We created a multi-functional facility with flexible loading areas, dedicated maintenance zones, and optimized traffic patterns for different vehicle types.",
    results:
      "The facility has increased cargo handling capacity by 50% and reduced loading/unloading times, improving overall operational efficiency.",
    features: [
      "Multiple loading dock configurations",
      "Vehicle maintenance and repair bays",
      "Cargo sorting and storage areas",
      "Administrative offices and driver facilities",
      "Fuel storage and dispensing systems",
      "Advanced security and tracking systems",
    ],
  },
  {
    id: 5,
    title: "CANDC Welding – Receiver-Assumed Completion",
    slug: "candc-welding-completion",
    category: "takeover",
    location: "Vars, ON",
    completionDate: "March 2023",
    client: "Receivership Firm",
    squareFootage: "15,000 sq ft",
    projectValue: "$2.8M",
    duration: "7 months",
    status: "completed",
    year: 2023,
    featured: true,
    technologies: ["Structural Remediation", "Welding Systems", "Safety Upgrades", "Code Compliance"],
    tags: ["distressed project", "takeover", "welding", "industrial", "recovery"],
    description:
      "Successful completion of a distressed welding facility construction project that was abandoned mid-construction due to contractor bankruptcy.",
    image: "/construction-site-overview.png",
    gallery: [
      "/abandoned-construction-site.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    challenge:
      "The project was approximately 65% complete but suffering from significant structural issues, code violations, and incomplete systems when we took over.",
    solution:
      "We conducted a comprehensive assessment, developed a strategic recovery plan, and implemented systematic remediation while managing tight timeline requirements.",
    results:
      "Project completed 45% under the revised budget projection and 3 weeks ahead of recovery schedule, with zero safety incidents throughout the recovery phase.",
    features: [
      "Complete structural remediation",
      "Code compliance restoration",
      "Specialized welding facility systems",
      "Safety system upgrades",
      "Quality control improvements",
      "Accelerated completion timeline",
    ],
    hasCaseStudy: true,
  },
]

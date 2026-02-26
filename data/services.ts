import type { LucideIcon } from "lucide-react"
import {
  Hammer,
  Building2,
  ClipboardCheck,
  Factory,
  Warehouse,
} from "lucide-react"

export interface ServiceFeature {
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ServiceData {
  slug: string
  title: string
  shortTitle: string
  icon: LucideIcon
  tagline: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  overview: string[]
  highlights: string[]
  features: ServiceFeature[]
  process: ProcessStep[]
  faqs: FAQ[]
  relatedServiceSlugs: string[]
}

export const services: ServiceData[] = [
  {
    slug: "general-contracting",
    title: "General Contracting",
    shortTitle: "General Contracting",
    icon: Hammer,
    tagline:
      "Complete management of commercial builds from pre-construction through final turnover — on time, on budget, and built to last.",
    metaTitle: "General Contractor Ottawa | Commercial Contracting Services",
    metaDescription:
      "Solid Steel Management is a trusted general contractor in Ottawa specializing in commercial construction. Full-service contracting from pre-construction to turnover across Ontario.",
    keywords: [
      "general contractor Ottawa",
      "commercial contractor Ottawa",
      "general contracting services Ontario",
      "commercial construction contractor",
    ],
    overview: [
      "Solid Steel Management provides full-service general contracting for commercial and industrial projects across Ontario. As your general contractor, we take complete responsibility for every phase of construction — from initial planning and permitting through to final inspection and turnover.",
      "Our approach is built on transparency, accountability, and craftsmanship. We coordinate all trades, manage timelines and budgets, and ensure every detail meets code and exceeds expectations. Whether you're building a new commercial facility, expanding an existing structure, or renovating an occupied space, our team delivers with precision and professionalism.",
    ],
    highlights: [
      "Single point of accountability for your entire project",
      "Detailed scheduling with milestone tracking",
      "Rigorous quality control at every phase",
      "Full permit management and code compliance",
      "Transparent budgeting with no hidden costs",
      "Coordination of all trades and subcontractors",
    ],
    features: [
      {
        title: "Pre-Construction Planning",
        description:
          "Site evaluation, feasibility studies, budgeting, and permit coordination before ground breaks.",
      },
      {
        title: "Trade Coordination",
        description:
          "Expert management of all subcontractors — electrical, plumbing, HVAC, steel, concrete, and more.",
      },
      {
        title: "Quality Assurance",
        description:
          "Multi-point inspections and rigorous quality control protocols throughout every build phase.",
      },
      {
        title: "Budget Management",
        description:
          "Transparent cost tracking, change order management, and proactive value engineering.",
      },
      {
        title: "Safety Compliance",
        description:
          "Comprehensive safety programs exceeding OHSA requirements with zero-incident targets.",
      },
      {
        title: "Project Closeout",
        description:
          "Thorough commissioning, deficiency resolution, warranty documentation, and smooth handover.",
      },
    ],
    process: [
      {
        title: "Initial Consultation",
        description:
          "We meet to understand your project goals, timeline, budget, and site requirements.",
      },
      {
        title: "Pre-Construction & Estimating",
        description:
          "Detailed scope development, cost estimating, scheduling, and permit applications.",
      },
      {
        title: "Construction Execution",
        description:
          "Full trade coordination, quality inspections, and weekly progress reporting.",
      },
      {
        title: "Turnover & Warranty",
        description:
          "Final inspections, deficiency resolution, documentation delivery, and ongoing warranty support.",
      },
    ],
    faqs: [
      {
        question: "What types of projects does Solid Steel handle as a general contractor?",
        answer:
          "We specialize in commercial and industrial construction projects across Ontario including warehouses, office buildings, retail spaces, automotive facilities, and industrial structures. Projects typically range from 5,000 to 150,000+ square feet.",
      },
      {
        question: "How does your general contracting process work?",
        answer:
          "We manage every aspect of your build from pre-construction planning and permitting through construction execution and final turnover. You get a single point of contact, transparent budgeting, weekly progress updates, and full coordination of all trades and inspections.",
      },
      {
        question: "What areas do you serve as a general contractor?",
        answer:
          "Solid Steel Management is based in Ottawa and serves clients across Ontario, with projects completed in Ottawa, Eastern Ontario, the Ottawa Valley, and surrounding regions.",
      },
      {
        question: "How do you handle budget management on general contracting projects?",
        answer:
          "We provide detailed upfront estimates, manage change orders transparently, and use proactive value engineering to keep your project on budget. Clients receive regular cost reports so there are never surprises.",
      },
    ],
    relatedServiceSlugs: ["design-build", "project-management"],
  },
  {
    slug: "design-build",
    title: "Design-Build",
    shortTitle: "Design-Build",
    icon: Building2,
    tagline:
      "One team, one vision — integrated design and construction that saves time, reduces risk, and delivers results.",
    metaTitle: "Design-Build Contractor Ottawa | Integrated Design & Construction",
    metaDescription:
      "Solid Steel Management offers design-build services in Ottawa and Ontario. One team for design and construction — faster delivery, lower risk, and single-source accountability.",
    keywords: [
      "design build Ottawa",
      "design build contractor Ontario",
      "design build commercial construction",
      "integrated design and construction",
    ],
    overview: [
      "Solid Steel Management's design-build approach brings design and construction together under one roof. Instead of managing separate architects, engineers, and contractors, you work with a single integrated team from concept to completion. This eliminates the gaps, delays, and finger-pointing that plague traditional delivery methods.",
      "Our design-build process starts with your vision and budget. We develop the design, engineering, and construction plan simultaneously — accelerating timelines, reducing costs, and giving you full control over the outcome. It's how we delivered the Greystone Village Retirement community and the Embrun Ford Dealership addition.",
    ],
    highlights: [
      "Single-source accountability from design through construction",
      "Faster project delivery through parallel workflows",
      "Reduced risk with integrated cost control",
      "Real-time collaboration between designers and builders",
      "Value engineering built into the design process",
      "Fewer change orders and budget surprises",
    ],
    features: [
      {
        title: "Concept Development",
        description:
          "Translating your vision into feasible designs with budget-aligned architectural and engineering solutions.",
      },
      {
        title: "Integrated Engineering",
        description:
          "Structural, mechanical, and electrical engineering coordinated with construction planning from day one.",
      },
      {
        title: "Permit & Approvals",
        description:
          "Navigating municipal approvals, zoning, and building permits with our established relationships.",
      },
      {
        title: "Concurrent Construction",
        description:
          "Breaking ground on early phases while design details are finalized — accelerating your timeline.",
      },
      {
        title: "Cost Certainty",
        description:
          "Guaranteed maximum pricing with transparent open-book accounting throughout the project.",
      },
      {
        title: "Turnkey Delivery",
        description:
          "Move-in ready facilities with all systems commissioned, tested, and documented.",
      },
    ],
    process: [
      {
        title: "Vision & Budget Alignment",
        description:
          "We define your project goals, functional requirements, and budget parameters together.",
      },
      {
        title: "Schematic Design",
        description:
          "Architectural concepts, floor plans, and preliminary engineering developed with your input.",
      },
      {
        title: "Design Development & Permitting",
        description:
          "Detailed drawings, specifications, and municipal approvals — with construction planning running in parallel.",
      },
      {
        title: "Construction & Commissioning",
        description:
          "Full build execution, systems commissioning, and turnkey handover of your completed facility.",
      },
    ],
    faqs: [
      {
        question: "What is design-build and how is it different from traditional construction?",
        answer:
          "Design-build integrates architecture, engineering, and construction under one contract and one team. Unlike traditional methods where you hire an architect separately from a contractor, design-build eliminates coordination gaps, reduces timelines by 20-30%, and provides single-source accountability.",
      },
      {
        question: "Is design-build more cost-effective than traditional delivery?",
        answer:
          "Yes. Design-build typically reduces total project costs by 6-10% compared to traditional delivery. By integrating design and construction, we eliminate redesign costs, reduce change orders, and apply value engineering throughout the design process — not after drawings are complete.",
      },
      {
        question: "What types of commercial projects are best suited for design-build?",
        answer:
          "Design-build works exceptionally well for warehouses, industrial facilities, commercial garages, retail spaces, and multi-use buildings where speed-to-market and budget certainty are priorities. It's ideal when you want one team managing the entire process.",
      },
    ],
    relatedServiceSlugs: ["general-contracting", "steel-construction"],
  },
  {
    slug: "project-management",
    title: "Construction Project Management",
    shortTitle: "Project Management",
    icon: ClipboardCheck,
    tagline:
      "Expert oversight that keeps your project on track, on time, and on budget — without the stress.",
    metaTitle: "Construction Project Management Ottawa | Expert Oversight Services",
    metaDescription:
      "Construction project management services in Ottawa and Ontario. Solid Steel Management provides expert oversight, scheduling, budget control, and quality assurance for commercial builds.",
    keywords: [
      "construction management Ottawa",
      "construction project management Ontario",
      "commercial project oversight",
      "construction manager Ottawa",
    ],
    overview: [
      "Not every project needs a general contractor — some need an experienced construction manager who can protect your interests, coordinate complex teams, and keep everything moving forward. Solid Steel Management's project management services give you expert oversight without the markups of a traditional GC contract.",
      "We act as your representative on-site, managing schedules, budgets, quality, and safety across all trades. Whether you're an owner managing your own build, an investor overseeing a development, or a company expanding your facilities, our project management ensures professional execution from start to finish.",
    ],
    highlights: [
      "Owner's representative and advocate on-site",
      "Detailed scheduling with critical path management",
      "Independent budget oversight and cost control",
      "Quality assurance and deficiency management",
      "Risk identification and mitigation planning",
      "Regular progress reporting and stakeholder communication",
    ],
    features: [
      {
        title: "Schedule Management",
        description:
          "Critical path scheduling, milestone tracking, and proactive delay mitigation to keep your project on time.",
      },
      {
        title: "Cost Control",
        description:
          "Independent budget oversight, invoice verification, change order evaluation, and cash flow forecasting.",
      },
      {
        title: "Quality Oversight",
        description:
          "Regular inspections, deficiency tracking, and standards enforcement across all trades.",
      },
      {
        title: "Risk Management",
        description:
          "Proactive identification of project risks with mitigation strategies and contingency planning.",
      },
      {
        title: "Stakeholder Coordination",
        description:
          "Clear communication between owners, architects, engineers, contractors, and municipal authorities.",
      },
      {
        title: "Progress Reporting",
        description:
          "Weekly status reports with photos, financial summaries, schedule updates, and issue tracking.",
      },
    ],
    process: [
      {
        title: "Project Assessment",
        description:
          "We review your project scope, contracts, schedule, and budget to establish baselines and identify risks.",
      },
      {
        title: "Planning & Setup",
        description:
          "Develop management frameworks, communication protocols, and reporting structures for your project.",
      },
      {
        title: "Active Oversight",
        description:
          "On-site management with daily coordination, quality inspections, and issue resolution.",
      },
      {
        title: "Closeout & Handover",
        description:
          "Punch list management, warranty coordination, and final documentation delivery.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between project management and general contracting?",
        answer:
          "A general contractor holds the construction contract and manages trades directly. A construction project manager acts as the owner's representative, providing independent oversight of the GC and all project stakeholders. Project management is ideal when you want expert guidance without a single contractor controlling the entire build.",
      },
      {
        question: "When should I hire a construction project manager?",
        answer:
          "Consider project management when your project is complex or high-value, when you want independent oversight of your general contractor, when you're managing multiple simultaneous projects, or when you need an experienced construction professional representing your interests on-site.",
      },
      {
        question: "How does Solid Steel report on project progress?",
        answer:
          "We provide weekly written reports including schedule status, budget tracking, quality observations, safety updates, and photos. For larger projects, we set up shared dashboards so you have real-time visibility into every aspect of your build.",
      },
    ],
    relatedServiceSlugs: ["general-contracting", "design-build"],
  },
  {
    slug: "steel-construction",
    title: "Steel Construction",
    shortTitle: "Steel Construction",
    icon: Factory,
    tagline:
      "High-performance steel structures engineered for strength, speed, and long-term value.",
    metaTitle: "Steel Building Construction Ontario | Steel Structures & Erection",
    metaDescription:
      "Steel building construction across Ontario. Solid Steel Management delivers commercial and industrial steel structures — warehouses, shops, and facilities built for performance.",
    keywords: [
      "steel building Ontario",
      "steel building near me",
      "steel construction contractor",
      "commercial steel building",
      "industrial steel structure Ontario",
    ],
    overview: [
      "Steel construction is at the core of what we do — it's in our name. Solid Steel Management specializes in commercial and industrial steel structures that deliver superior strength, faster erection timelines, and long-term durability compared to conventional construction methods.",
      "From structural steel erection to complete building envelope, we manage every aspect of steel construction. Our partnerships with leading steel fabricators and erectors — including Domination Steel and Matte Forming — ensure your structure is engineered, fabricated, and installed to the highest standards.",
    ],
    highlights: [
      "Complete steel building packages from design to occupancy",
      "Faster construction timelines vs. conventional building",
      "Clear-span interiors with no load-bearing walls",
      "Partnerships with leading steel fabricators",
      "Energy-efficient insulation and cladding systems",
      "Engineered for Ontario snow loads and seismic requirements",
    ],
    features: [
      {
        title: "Structural Steel Erection",
        description:
          "Professional steel erection with certified crews, crane management, and connection quality assurance.",
      },
      {
        title: "Building Envelope",
        description:
          "Complete wall and roof systems including insulated metal panels, cladding, and weatherproofing.",
      },
      {
        title: "Foundation Systems",
        description:
          "Engineered foundations designed for steel structures including piers, grade beams, and slab-on-grade.",
      },
      {
        title: "Mezzanines & Platforms",
        description:
          "Interior steel platforms, mezzanine floors, and elevated work areas to maximize usable space.",
      },
      {
        title: "Crane Systems",
        description:
          "Overhead crane runways and support structures integrated into the building design.",
      },
      {
        title: "Code Engineering",
        description:
          "Structural engineering for Ontario Building Code compliance including snow, wind, and seismic loads.",
      },
    ],
    process: [
      {
        title: "Needs Assessment",
        description:
          "Define your space requirements, operational needs, and site conditions for optimal building design.",
      },
      {
        title: "Engineering & Fabrication",
        description:
          "Structural engineering, shop drawings, and steel fabrication coordinated with site preparation.",
      },
      {
        title: "Erection & Envelope",
        description:
          "Steel erection, building envelope installation, and interior buildout by coordinated crews.",
      },
      {
        title: "Systems & Commissioning",
        description:
          "Mechanical, electrical, and plumbing systems installation followed by full commissioning.",
      },
    ],
    faqs: [
      {
        question: "Why choose steel construction for a commercial building?",
        answer:
          "Steel construction offers superior strength-to-weight ratios, clear-span interiors without columns, faster erection timelines, and long-term durability. Steel buildings are also highly customizable, energy-efficient with modern insulation systems, and resistant to pests, rot, and fire.",
      },
      {
        question: "How long does it take to build a steel structure?",
        answer:
          "Steel buildings typically erect 30-50% faster than conventional construction. A standard commercial steel building of 8,000-15,000 sq ft can be erected in 2-4 weeks, with total project completion in 4-8 months depending on complexity, finishes, and site conditions.",
      },
      {
        question: "Does Solid Steel build custom steel structures or just standard buildings?",
        answer:
          "We build fully custom steel structures engineered to your specific requirements. Every project is designed for your operational needs, site conditions, and Ontario Building Code requirements. We also work with pre-engineered building systems for projects where standardized solutions offer the best value.",
      },
      {
        question: "What areas in Ontario do you build steel structures?",
        answer:
          "We serve clients across Ontario with a focus on the Ottawa region, Eastern Ontario, and the Ottawa Valley. Our steel fabrication partners can supply projects province-wide.",
      },
    ],
    relatedServiceSlugs: ["pre-engineered-buildings", "general-contracting"],
  },
  {
    slug: "pre-engineered-buildings",
    title: "Pre-Engineered Steel Buildings",
    shortTitle: "Pre-Engineered Buildings",
    icon: Warehouse,
    tagline:
      "Factory-engineered, site-assembled — the fastest, most cost-effective way to build commercial and industrial space.",
    metaTitle: "Pre-Engineered Steel Buildings Canada | PEB Contractor Ontario",
    metaDescription:
      "Pre-engineered steel buildings in Ontario and across Canada. Solid Steel Management delivers factory-engineered, site-assembled commercial and industrial buildings — fast, affordable, and durable.",
    keywords: [
      "pre engineered steel buildings",
      "steel buildings Canada",
      "pre-engineered metal buildings Ontario",
      "PEB contractor",
      "prefab steel building",
    ],
    overview: [
      "Pre-engineered steel buildings (PEBs) are the fastest and most cost-effective solution for commercial and industrial space. Factory-engineered components are precision-manufactured off-site and assembled on your prepared foundation — reducing construction time by up to 50% compared to conventional methods.",
      "Solid Steel Management is an experienced PEB contractor serving Ontario and beyond. We handle the complete process from building selection and site preparation through erection, interior buildout, and occupancy. Whether you need a warehouse, workshop, commercial garage, or agricultural building, PEBs deliver unmatched value.",
    ],
    highlights: [
      "Up to 50% faster construction than conventional building",
      "Lower cost per square foot than traditional construction",
      "Factory-controlled quality with precise tolerances",
      "Clear-span interiors up to 200+ feet",
      "Highly customizable facades, insulation, and finishes",
      "Engineered for Canadian snow loads and building codes",
    ],
    features: [
      {
        title: "Building Selection",
        description:
          "Expert guidance on PEB manufacturers, configurations, and specifications matched to your needs and budget.",
      },
      {
        title: "Site Preparation",
        description:
          "Complete site work including excavation, grading, drainage, and engineered foundation systems.",
      },
      {
        title: "Steel Erection",
        description:
          "Professional assembly of pre-engineered components by experienced crews with crane support.",
      },
      {
        title: "Building Envelope",
        description:
          "Wall panels, roof systems, insulation packages, doors, windows, and weatherproofing to suit your climate.",
      },
      {
        title: "Interior Buildout",
        description:
          "Office spaces, washrooms, mezzanines, and operational areas built to your specifications.",
      },
      {
        title: "Mechanical & Electrical",
        description:
          "Complete M&E systems including HVAC, lighting, power distribution, and fire protection.",
      },
    ],
    process: [
      {
        title: "Requirements & Budgeting",
        description:
          "Define your space needs, operational requirements, and budget to select the right PEB solution.",
      },
      {
        title: "Design & Engineering",
        description:
          "Building configuration, structural engineering, and shop drawings prepared for manufacturing.",
      },
      {
        title: "Manufacturing & Site Prep",
        description:
          "Components manufactured in controlled factory conditions while your site and foundations are prepared.",
      },
      {
        title: "Erection & Completion",
        description:
          "Rapid on-site assembly, envelope installation, interior buildout, and commissioning.",
      },
    ],
    faqs: [
      {
        question: "What is a pre-engineered steel building?",
        answer:
          "A pre-engineered building (PEB) is a steel structure where all components — frames, purlins, girts, panels, and fasteners — are designed and manufactured in a factory, then shipped to your site for assembly. This approach delivers faster construction, lower costs, and factory-controlled quality compared to conventional construction.",
      },
      {
        question: "How much does a pre-engineered steel building cost in Ontario?",
        answer:
          "PEB costs vary based on size, complexity, and finishes, but generally range from $25-$65 per square foot for the building shell. Total turnkey costs including site work, foundation, interior buildout, and mechanical/electrical typically range from $80-$150 per square foot. We provide detailed estimates during our consultation.",
      },
      {
        question: "Are pre-engineered buildings as durable as conventional construction?",
        answer:
          "Yes. PEBs are engineered to meet the same Ontario Building Code requirements as conventional construction, including snow loads, wind loads, and seismic standards. Modern PEBs feature high-quality galvanized steel, advanced insulation systems, and durable finishes that provide decades of reliable service.",
      },
      {
        question: "What can pre-engineered buildings be used for?",
        answer:
          "PEBs are extremely versatile and commonly used for warehouses, workshops, commercial garages, manufacturing facilities, retail stores, agricultural buildings, sports facilities, and aircraft hangars. They can be customized with offices, mezzanines, loading docks, and any interior layout you need.",
      },
    ],
    relatedServiceSlugs: ["steel-construction", "design-build"],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}

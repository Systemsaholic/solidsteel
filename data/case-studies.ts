export interface CaseStudyTestimonial {
  quote: string
  author: string
  position: string
  company?: string
  image?: string
}

export interface CaseStudyMetric {
  label: string
  value: string
  description?: string
  category: "timeline" | "budget" | "quality" | "safety" | "performance" | "stakeholder"
}

export interface CaseStudyTechnology {
  name: string
  category: "structural" | "mechanical" | "electrical" | "safety" | "materials" | "equipment"
  description: string
  impact?: string
}

export interface CaseStudyLesson {
  title: string
  description: string
  audience: "client" | "industry" | "both"
  category: "technical" | "management" | "financial" | "regulatory" | "safety"
}

export interface CaseStudyTimeline {
  phase: string
  duration: string
  description: string
  challenges?: string[]
  outcomes?: string[]
}

// Type-specific sections
export interface DistressedProjectDetails {
  originalContractor?: string
  reasonForTakeover: string
  percentageComplete: number
  stakeholders: string[]
  legalComplications?: string[]
  recoveryStrategy: string[]
}

export interface CommercialProjectDetails {
  tenantCoordination?: string[]
  regulatoryRequirements: string[]
  businessContinuity: string[]
  publicSafety?: string[]
}

export interface IndustrialProjectDetails {
  safetyProtocols: string[]
  specializedEquipment: string[]
  environmentalConsiderations?: string[]
  operationalRequirements: string[]
}

export interface CaseStudy {
  // Basic Information
  id: string
  slug: string // Same as project slug
  title: string
  subtitle: string
  projectSlug: string // Reference to the project

  // Core Content Sections
  projectOverview: string
  challengesFaced: string[]
  solutionsImplemented: {
    approach: string
    strategies: string[]
    execution: string
    executionDetails: string[]
  }
  technologiesUtilized: CaseStudyTechnology[]
  resultsAchieved: string[]
  lessonsLearned: CaseStudyLesson[]

  // Enhanced Metrics and Testimonials
  keyMetrics: CaseStudyMetric[]
  testimonials: CaseStudyTestimonial[]

  // Timeline and Process
  timeline?: CaseStudyTimeline[]

  // Type-specific Details
  distressedDetails?: DistressedProjectDetails
  commercialDetails?: CommercialProjectDetails
  industrialDetails?: IndustrialProjectDetails

  // Media and Documentation
  heroImage?: string
  galleryImages: string[]

  // Metadata
  featured: boolean
  publishedDate: Date
  lastUpdated: Date
  conclusion: string

  // SEO and Marketing
  metaDescription?: string
  keywords?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "candc-welding-completion",
    slug: "candc-welding-completion",
    title: "C & C Welding Project",
    subtitle: "Turning a Breakdown into a Breakthrough",
    projectSlug: "candc-welding-completion",

    projectOverview:
      "When C & C Welding set out to build their new facility in Vars, Ontario, no one expected the project to derail so early. After only a partial foundation had been poured, everything came to a halt. The original contractor had declared bankruptcy, leaving behind a half-started site, rising costs, and mounting legal disputes. With a severely constrained budget and urgent timeline requirements from the lender, Solid Steel Management was brought in to assess, stabilize, and complete this distressed industrial project.",

    challengesFaced: [
      "Partially completed foundation with uncertain structural integrity",
      "Bankrupt original contractor with incomplete documentation and missing permits",
      "Mounting legal disputes affecting project timeline and budget",
      "Severely constrained remaining budget with limited contingency",
      "Urgent timeline requirements from lender to avoid foreclosure",
      "Need to rebuild stakeholder confidence and trust",
      "Weather damage to exposed foundation and materials",
      "Subcontractor payment disputes and potential liens",
    ],

    solutionsImplemented: {
      approach:
        "Solid Steel Management implemented a three-phase recovery strategy: immediate stabilization, comprehensive assessment, and strategic execution. Our approach focused on maximizing value while ensuring quality and compliance within the constrained budget and timeline.",
      strategies: [
        "Conducted comprehensive site inspection and structural integrity assessment",
        "Reviewed prior budget and identified gaps in financial forecasting",
        "Engaged legal consultations to navigate dispute landscape and lien issues",
        "Sourced trusted engineering partners to validate and redesign project elements",
        "Redesigned site plan to maximize use of existing foundation where structurally sound",
        "Re-scoped the build and modified finishes to align with fiscal realities",
        "Established clear stakeholder communication protocols",
        "Implemented rigorous cost control and progress tracking systems",
      ],
      execution:
        "With the recovery plan approved, our team mobilized within 72 hours to begin implementation. We established a dedicated project management structure with daily oversight and weekly stakeholder reporting.",
      executionDetails: [
        "Carefully selected and re-hired qualified trades under strict oversight",
        "Implemented daily cost tracking and budget variance reporting",
        "Established clear communication protocols with lender, client, and legal teams",
        "Conducted daily site inspections and quality control measures",
        "Managed regulatory compliance and expedited permitting processes",
        "Provided weekly progress reports with photographic documentation",
        "Coordinated with legal team to resolve contractor disputes and liens",
        "Maintained strict safety protocols throughout recovery phase",
      ],
    },

    technologiesUtilized: [
      {
        name: "Structural Steel Framing",
        category: "structural",
        description: "Heavy-duty steel frame construction for industrial welding operations",
        impact: "Provided the robust structural foundation required for heavy welding equipment and operations",
      },
      {
        name: "Industrial Concrete Systems",
        category: "structural",
        description: "Specialized concrete flooring designed for heavy equipment loads",
        impact: "Ensured floor could support welding equipment and heavy material handling",
      },
      {
        name: "Industrial HVAC Systems",
        category: "mechanical",
        description: "Specialized ventilation for welding fume extraction and air quality",
        impact: "Critical for worker safety and regulatory compliance in welding operations",
      },
      {
        name: "Electrical Infrastructure",
        category: "electrical",
        description: "High-capacity electrical systems for welding equipment power requirements",
        impact: "Enabled full operational capacity for industrial welding operations",
      },
      {
        name: "Safety Systems Integration",
        category: "safety",
        description: "Fire suppression, emergency exits, and safety equipment integration",
        impact: "Ensured full compliance with industrial safety regulations",
      },
    ],

    resultsAchieved: [
      "Project completed within 6 months of takeover, meeting lender deadline",
      "Final delivery achieved within restructured budget parameters",
      "All legal complications successfully navigated and resolved",
      "Full occupancy permit granted immediately upon completion",
      "Zero safety incidents throughout the recovery and construction phase",
      "All stakeholder relationships restored and strengthened",
      "Facility became fully operational within days of completion",
      "Created a replicable blueprint for future distressed project takeovers",
    ],

    lessonsLearned: [
      {
        title: "Early Stakeholder Alignment is Critical",
        description:
          "Establishing clear communication protocols and expectations with all stakeholders from day one prevents misunderstandings and builds confidence throughout the recovery process.",
        audience: "both",
        category: "management",
      },
      {
        title: "Comprehensive Assessment Before Action",
        description:
          "Taking time for thorough structural, financial, and legal assessment upfront saves time and money during execution, even under urgent timelines.",
        audience: "industry",
        category: "technical",
      },
      {
        title: "Budget Realism in Distressed Projects",
        description:
          "Distressed projects require honest budget reassessment and scope adjustment. Attempting to maintain original scope with insufficient budget leads to further failure.",
        audience: "client",
        category: "financial",
      },
      {
        title: "Legal Resolution Parallel to Construction",
        description:
          "Running legal dispute resolution parallel to construction planning allows for faster mobilization once agreements are reached.",
        audience: "industry",
        category: "management",
      },
      {
        title: "Quality Cannot Be Compromised",
        description:
          "Even in budget-constrained recoveries, maintaining quality standards is essential for long-term success and stakeholder confidence.",
        audience: "both",
        category: "technical",
      },
    ],

    keyMetrics: [
      {
        label: "Recovery Timeline",
        value: "6 months",
        description: "From takeover to full completion and occupancy",
        category: "timeline",
      },
      {
        label: "Budget Performance",
        value: "Within restructured budget",
        description: "Completed within revised financial parameters",
        category: "budget",
      },
      {
        label: "Stakeholder Satisfaction",
        value: "100%",
        description: "All stakeholders expressed satisfaction with outcome",
        category: "stakeholder",
      },
      {
        label: "Safety Record",
        value: "Zero incidents",
        description: "No safety incidents during recovery phase",
        category: "safety",
      },
      {
        label: "Quality Delivery",
        value: "First-pass approval",
        description: "All inspections passed on first submission",
        category: "quality",
      },
      {
        label: "Legal Resolution",
        value: "100% resolved",
        description: "All legal disputes and liens successfully resolved",
        category: "performance",
      },
    ],

    testimonials: [
      {
        quote:
          "Solid Steel Management stepped in when our project seemed hopeless. Their strategic approach and unwavering commitment transformed a failed foundation into a fully operational facility. They didn't just complete our building – they restored our confidence in the construction process.",
        author: "C & C Welding Management",
        position: "Project Owner",
        company: "C & C Welding",
      },
      {
        quote:
          "The professionalism and transparency that Solid Steel Management brought to this troubled project was exactly what we needed to protect our investment. Their weekly reporting and proactive communication gave us confidence throughout the recovery process.",
        author: "Financial Institution Representative",
        position: "Senior Loan Officer",
        company: "Project Lender",
      },
    ],

    timeline: [
      {
        phase: "Emergency Assessment",
        duration: "Week 1-2",
        description: "Comprehensive site, structural, and financial assessment",
        challenges: ["Incomplete documentation", "Weather damage assessment", "Legal complexity"],
        outcomes: ["Structural viability confirmed", "Recovery plan developed", "Budget parameters established"],
      },
      {
        phase: "Stakeholder Alignment",
        duration: "Week 3-4",
        description: "Legal resolution and stakeholder agreement on recovery plan",
        challenges: ["Multiple stakeholder interests", "Legal dispute resolution", "Budget negotiations"],
        outcomes: ["All parties aligned", "Legal disputes resolved", "Funding secured"],
      },
      {
        phase: "Mobilization",
        duration: "Week 5-8",
        description: "Team assembly, permitting, and construction restart",
        challenges: ["Permit expediting", "Subcontractor vetting", "Material procurement"],
        outcomes: ["Full team mobilized", "Permits secured", "Construction resumed"],
      },
      {
        phase: "Construction Execution",
        duration: "Week 9-20",
        description: "Primary construction phase with weekly milestone tracking",
        challenges: ["Weather delays", "Quality control", "Budget monitoring"],
        outcomes: ["Structural completion", "Systems installation", "Quality standards maintained"],
      },
      {
        phase: "Final Completion",
        duration: "Week 21-24",
        description: "Final inspections, approvals, and handover",
        challenges: ["Inspection coordination", "Final systems testing", "Documentation completion"],
        outcomes: ["All inspections passed", "Occupancy permit granted", "Successful handover"],
      },
    ],

    distressedDetails: {
      originalContractor: "Regional Construction Company (Bankrupt)",
      reasonForTakeover: "Original contractor bankruptcy with incomplete foundation and mounting legal disputes",
      percentageComplete: 35,
      stakeholders: [
        "C & C Welding (Owner)",
        "Financial Institution (Lender)",
        "Receivership Firm",
        "Municipal Authorities",
        "Subcontractors",
      ],
      legalComplications: [
        "Contractor bankruptcy proceedings",
        "Subcontractor payment disputes",
        "Material supplier liens",
        "Permit compliance issues",
      ],
      recoveryStrategy: [
        "Immediate site stabilization and security",
        "Comprehensive structural and financial assessment",
        "Legal dispute resolution and stakeholder alignment",
        "Budget restructuring and scope optimization",
        "Phased construction approach with milestone tracking",
        "Enhanced quality control and safety protocols",
      ],
    },

    heroImage: "/placeholder-x4kg9.png",
    galleryImages: [
      "/abandoned-construction-site.png",
      "/construction-team-plans.png",
      "/industrial-welding-interior.png",
    ],

    featured: true,
    publishedDate: new Date("2023-04-15"),
    lastUpdated: new Date("2023-04-15"),

    conclusion:
      "The C & C Welding project exemplifies our specialized approach to distressed project recovery. By combining thorough assessment, strategic planning, stakeholder alignment, and expert execution, we transformed a troubled project into a successful completion. This case study demonstrates that with the right approach, even severely distressed projects can be recovered and completed successfully, preserving value for all stakeholders while delivering a quality facility that meets operational requirements.",

    metaDescription:
      "Learn how Solid Steel Management successfully rescued the C & C Welding facility project, transforming a bankrupt contractor situation into a completed industrial facility within 6 months.",
    keywords: [
      "distressed construction project takeover",
      "construction project rescue",
      "industrial facility completion",
      "contractor bankruptcy recovery",
      "construction project turnaround",
      "welding facility construction",
    ],
  },
]

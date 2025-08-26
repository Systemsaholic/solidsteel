import { caseStudies, type CaseStudy, type CaseStudyLesson, type CaseStudyTechnology } from "@/data/case-studies"
import { getProjectBySlug } from "@/lib/projects"

/**
 * Get all case studies
 */
export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
}

/**
 * Get a case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}

/**
 * Get featured case studies
 */
export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const featured = caseStudies
    .filter((caseStudy) => caseStudy.featured)
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get case studies by project category
 */
export function getCaseStudiesByCategory(category: string): CaseStudy[] {
  return caseStudies.filter((caseStudy) => {
    const project = getProjectBySlug(caseStudy.projectSlug)
    return project?.category === category
  })
}

/**
 * Check if a project has a case study
 */
export function projectHasCaseStudy(projectSlug: string): boolean {
  return caseStudies.some((caseStudy) => caseStudy.projectSlug === projectSlug)
}

/**
 * Get case study for a specific project
 */
export function getCaseStudyForProject(projectSlug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.projectSlug === projectSlug)
}

/**
 * Get related case studies (same category, excluding current)
 */
export function getRelatedCaseStudies(currentSlug: string, limit = 3): CaseStudy[] {
  const currentCaseStudy = getCaseStudyBySlug(currentSlug)
  if (!currentCaseStudy) return []

  const currentProject = getProjectBySlug(currentCaseStudy.projectSlug)
  if (!currentProject) return []

  return caseStudies
    .filter((caseStudy) => {
      if (caseStudy.slug === currentSlug) return false
      const project = getProjectBySlug(caseStudy.projectSlug)
      return project?.category === currentProject.category
    })
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, limit)
}

/**
 * Get all technologies used across case studies
 */
export function getAllCaseStudyTechnologies(): CaseStudyTechnology[] {
  const technologies = new Map<string, CaseStudyTechnology>()

  caseStudies.forEach((caseStudy) => {
    caseStudy.technologiesUtilized.forEach((tech) => {
      if (!technologies.has(tech.name)) {
        technologies.set(tech.name, tech)
      }
    })
  })

  return Array.from(technologies.values()).sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Get lessons learned by audience
 */
export function getLessonsByAudience(audience: "client" | "industry" | "both"): CaseStudyLesson[] {
  const lessons: CaseStudyLesson[] = []

  caseStudies.forEach((caseStudy) => {
    caseStudy.lessonsLearned.forEach((lesson) => {
      if (lesson.audience === audience || lesson.audience === "both") {
        lessons.push(lesson)
      }
    })
  })

  return lessons
}

/**
 * Get case study statistics
 */
export function getCaseStudyStatistics() {
  const totalCaseStudies = caseStudies.length
  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured).length

  const categories = new Set<string>()
  const technologies = new Set<string>()

  caseStudies.forEach((caseStudy) => {
    const project = getProjectBySlug(caseStudy.projectSlug)
    if (project) categories.add(project.category)

    caseStudy.technologiesUtilized.forEach((tech) => technologies.add(tech.name))
  })

  return {
    totalCaseStudies,
    featuredCaseStudies,
    categoriesCount: categories.size,
    technologiesCount: technologies.size,
    averageLessonsPerCase: Math.round(
      caseStudies.reduce((sum, cs) => sum + cs.lessonsLearned.length, 0) / totalCaseStudies,
    ),
  }
}

/**
 * Generate static params for all case studies
 */
export function generateCaseStudyStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

import { projects, type Project } from "@/data/projects"

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
  return projects
}

/**
 * Get a project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category)
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((project) => project.status === status)
}

/**
 * Get featured projects
 */
export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((project) => project.featured)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get projects by technology
 */
export function getProjectsByTechnology(technology: string): Project[] {
  return projects.filter((project) => project.technologies?.includes(technology))
}

/**
 * Search projects by term
 */
export function searchProjects(searchTerm: string): Project[] {
  const term = searchTerm.toLowerCase()
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term) ||
      project.tags?.some((tag) => tag.toLowerCase().includes(term)) ||
      project.technologies?.some((tech) => tech.toLowerCase().includes(term)),
  )
}

/**
 * Get related projects (same category, excluding current project)
 */
export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject) return []

  return projects
    .filter((project) => project.category === currentProject.category && project.slug !== currentSlug)
    .slice(0, limit)
}

/**
 * Get all unique categories
 */
export function getProjectCategories(): Project["category"][] {
  const categories = projects.map((project) => project.category)
  return [...new Set(categories)]
}

/**
 * Get all unique technologies
 */
export function getAllTechnologies(): string[] {
  const technologies = new Set<string>()
  projects.forEach((project) => {
    project.technologies?.forEach((tech) => technologies.add(tech))
  })
  return Array.from(technologies).sort()
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>()
  projects.forEach((project) => {
    project.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

/**
 * Get project statistics
 */
export function getProjectStatistics() {
  const totalProjects = projects.length
  const completedProjects = projects.filter((p) => p.status === "completed").length
  const inProgressProjects = projects.filter((p) => p.status === "in-progress").length
  const featuredProjects = projects.filter((p) => p.featured).length

  const totalValue = projects.reduce((sum, project) => {
    const value = Number.parseFloat(project.projectValue?.replace(/[^\d.]/g, "") || "0")
    return sum + value
  }, 0)

  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
    featuredProjects,
    totalValue,
    categories: getProjectCategories().length,
    technologies: getAllTechnologies().length,
  }
}

/**
 * Generate static params for all projects
 */
export function generateProjectStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

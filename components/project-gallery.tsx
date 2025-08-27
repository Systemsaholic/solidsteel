"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, Filter, Grid, List, MapPin, Calendar, Clock, Star, Loader2, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllProjects, getProjectCategories } from "@/lib/projects"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { useProjectImages } from "@/hooks/useProjectImages"
import type { Project } from "@/data/projects"

function getStatusColor(status: Project["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "planned":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ProjectGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  const router = useRouter()
  const allProjects = getAllProjects()
  const categories = getProjectCategories()

  // Get all unique technologies for filtering
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    allProjects.forEach((project) => {
      project.technologies?.forEach((tech) => techs.add(tech))
    })
    return Array.from(techs).sort()
  }, [allProjects])

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    const filtered = allProjects.filter((project) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.technologies?.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory

      // Status filter
      const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

      // Technology filter
      const matchesTechnology =
        selectedTechnologies.length === 0 || selectedTechnologies.some((tech) => project.technologies?.includes(tech))

      // Featured filter
      const matchesFeatured = !featuredOnly || project.featured

      return matchesSearch && matchesCategory && matchesStatus && matchesTechnology && matchesFeatured
    })

    // Sort projects
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0))
        break
      case "oldest":
        filtered.sort((a, b) => (a.year || 0) - (b.year || 0))
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "size":
        filtered.sort((a, b) => {
          const aSize = Number.parseInt(a.squareFootage?.replace(/[^\d]/g, "") || "0")
          const bSize = Number.parseInt(b.squareFootage?.replace(/[^\d]/g, "") || "0")
          return bSize - aSize
        })
        break
      default:
        break
    }

    return filtered
  }, [allProjects, searchTerm, selectedCategory, selectedStatus, selectedTechnologies, sortBy, featuredOnly])

  const handleTechnologyToggle = useCallback((technology: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology) ? prev.filter((t) => t !== technology) : [...prev, technology],
    )
  }, [])

  const handleProjectNavigation = useCallback(
    (slug: string) => {
      setIsNavigating(true)
      router.push(`/projects/${slug}`)
      setTimeout(() => setIsNavigating(false), 500)
    },
    [router],
  )

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedStatus("all")
    setSelectedTechnologies([])
    setFeaturedOnly(false)
  }, [])

  return (
    <>
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-900 mx-auto mb-4" />
            <p className="text-gray-600">Loading project...</p>
          </div>
        </div>
      )}

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search projects by title, description, technology, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="alphabetical">Alphabetical</SelectItem>
                        <SelectItem value="size">Size (Largest First)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Featured Only */}
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox id="featured" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Projects Only
                    </label>
                  </div>
                </div>

                {/* Technology Filters */}
                <div>
                  <label className="block text-sm font-medium mb-2">Technologies</label>
                  <div className="flex flex-wrap gap-2">
                    {allTechnologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant={selectedTechnologies.includes(tech) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-blue-100"
                        onClick={() => handleTechnologyToggle(tech)}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Showing {filteredProjects.length} of {allProjects.length} projects
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {filteredProjects.map((project) =>
                viewMode === "grid" ? (
                  <EnhancedProjectCard
                    key={project.id}
                    project={project}
                    onNavigate={handleProjectNavigation}
                  />
                ) : (
                  <ProjectListCard
                    key={project.id}
                    project={project}
                    onNavigate={handleProjectNavigation}
                  />
                ),
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

interface ProjectListCardProps {
  project: Project
  onNavigate: (slug: string) => void
}

function ProjectListCard({ project, onNavigate }: ProjectListCardProps) {
  const { heroImage, isLoading, error } = useProjectImages(project.slug)
  // Only use blob storage images - no fallbacks
  const imageSource = heroImage

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-500">Loading from Blob Storage...</span>
            </div>
          ) : error ? (
            <div className="w-full h-full bg-red-100 flex items-center justify-center">
              <div className="text-center p-4">
                <span className="text-red-600 text-sm">Failed to load image</span>
                <div className="text-xs text-red-500 mt-1">{error}</div>
              </div>
            </div>
          ) : imageSource ? (
            <img
              src={imageSource}
              alt={project.title}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
          <CardContent className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold mb-1 flex items-center gap-2">
                  {project.title}
                  {project.featured && <Star className="text-yellow-500 fill-current" size={16} />}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="capitalize">
                    {project.category}
                  </Badge>
                  <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
              {project.location && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {project.location}
                </div>
              )}
              {project.completionDate && (
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {project.completionDate}
                </div>
              )}
              {project.squareFootage && (
                <div className="flex items-center">
                  <Grid size={14} className="mr-1" />
                  {project.squareFootage}
                </div>
              )}
              {project.duration && (
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {project.duration}
                </div>
              )}
            </div>

            {project.technologies && (
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            <Button onClick={() => onNavigate(project.slug)} className="w-full md:w-auto">
              View Project Details
            </Button>
          </CardContent>
        </div>
      </Card>
    )
}

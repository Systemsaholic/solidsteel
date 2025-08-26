"use client"

import { useProjectImages } from "@/hooks/useProjectImages"
import { getAllProjects } from "@/lib/projects"

export default function TestHooks() {
  const projects = getAllProjects().slice(0, 5)
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Testing Project Images Hook</h1>
      {projects.map(project => (
        <ProjectImageTest key={project.slug} project={project} />
      ))}
    </div>
  )
}

function ProjectImageTest({ project }: { project: any }) {
  const { heroImage, galleryImages, isLoading, error } = useProjectImages(project.slug)
  
  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="font-bold">{project.title}</h2>
      <p>Slug: {project.slug}</p>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Error: {error || 'None'}</p>
      <p>Hero Image: {heroImage || 'None'}</p>
      <p>Fallback Image: {project.image}</p>
      <p>Gallery Count: {galleryImages.length}</p>
      {heroImage && (
        <div className="mt-2">
          <p className="text-sm">Testing hero image load:</p>
          <img 
            src={heroImage} 
            alt="Test" 
            width="200" 
            onLoad={() => console.log(`Loaded: ${project.slug}`)}
            onError={(e) => console.error(`Failed: ${project.slug}`, e)}
          />
        </div>
      )}
    </div>
  )
}
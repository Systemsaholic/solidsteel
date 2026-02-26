import fs from "fs/promises"
import path from "path"
import type { Project } from "@/data/projects"
import type { CaseStudy } from "@/data/case-studies"

const projectsPath = path.join(process.cwd(), "data/projects.ts")
const caseStudiesPath = path.join(process.cwd(), "data/case-studies.ts")

function formatDataAsTypeScript(variableName: string, data: any): string {
  const dataString = JSON.stringify(data, null, 2)
  return `import type { ${variableName === "projects" ? "Project" : "CaseStudy"} } from "@/lib/${variableName === "projects" ? "projects" : "case-studies"}";\n\nexport const ${variableName}: ${variableName === "projects" ? "Project[]" : "CaseStudy[]"} = ${dataString};\n`
}

export async function readProjectsFile(): Promise<Project[]> {
  try {
    const filePath = projectsPath
    const fileContent = await fs.readFile(filePath, "utf-8")

    // Extract the projects array from the TypeScript file
    const match = fileContent.match(/export const projects: Project\[\] = (\[[\s\S]*?\]);/)
    if (!match) {
      throw new Error("Could not parse projects file")
    }

    // Use eval to parse the array (in a real app, you'd want a proper parser)
    const projectsArray = eval(match[1])
    return projectsArray
  } catch (error) {
    console.error("Error reading projects file:", error)
    return []
  }
}

export async function writeProjectsFile(projects: Project[]): Promise<void> {
  try {
    const filePath = projectsPath

    const fileContent = formatDataAsTypeScript("projects", projects)

    await fs.writeFile(filePath, fileContent, "utf-8")
  } catch (error) {
    console.error("Error writing projects file:", error)
    throw error
  }
}

export async function readCaseStudiesFile(): Promise<CaseStudy[]> {
  try {
    const filePath = caseStudiesPath
    const fileContent = await fs.readFile(filePath, "utf-8")

    // Extract the case studies array from the TypeScript file
    const match = fileContent.match(/export const caseStudies: CaseStudy\[\] = (\[[\s\S]*?\]);/)
    if (!match) {
      throw new Error("Could not parse case studies file")
    }

    // Use eval to parse the array (in a real app, you'd want a proper parser)
    const caseStudiesArray = eval(match[1])
    return caseStudiesArray
  } catch (error) {
    console.error("Error reading case studies file:", error)
    return []
  }
}

export async function writeCaseStudiesFile(caseStudies: CaseStudy[]): Promise<void> {
  try {
    const filePath = caseStudiesPath

    const fileContent = formatDataAsTypeScript("caseStudies", caseStudies)

    await fs.writeFile(filePath, fileContent, "utf-8")
  } catch (error) {
    console.error("Error writing case studies file:", error)
    throw error
  }
}

export async function updateProjectsData(newProjects: Project[]): Promise<void> {
  const content = formatDataAsTypeScript("projects", newProjects)
  await fs.writeFile(projectsPath, content, "utf-8")
}

export async function updateCaseStudiesData(newCaseStudies: CaseStudy[]): Promise<void> {
  const content = formatDataAsTypeScript("caseStudies", newCaseStudies)
  await fs.writeFile(caseStudiesPath, content, "utf-8")
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

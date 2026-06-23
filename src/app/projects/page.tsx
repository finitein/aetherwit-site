import { getProjects } from "@/lib/tina";
import { ProjectsClient } from "./ProjectsClient";

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectsClient projects={projects} />;
}

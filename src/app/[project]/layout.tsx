import type { Metadata } from "next";
import { PROJECTS } from "./projects";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ project: string }> 
}): Promise<Metadata> {
  const { project: projectId } = await params;
  const project = PROJECTS[projectId as keyof typeof PROJECTS];
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  
  return {
    title: project.name,
    icons: {
      icon: `${project.url.replace(/\/$/, '')}/favicon.ico`,
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

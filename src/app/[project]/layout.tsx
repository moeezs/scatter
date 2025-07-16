import type { Metadata } from "next";
import { PROJECTS } from "./projects";

type Props = {
  params: { project: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = PROJECTS[params.project as keyof typeof PROJECTS];
  
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

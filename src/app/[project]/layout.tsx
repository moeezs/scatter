import { PROJECTS } from "./projects";

export const metadata = ({ params }: { params: { project: string } }) => {
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
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

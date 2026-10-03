import { projects } from "@/data/projects";

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return <main className="mx-auto min-h-screen max-w-5xl p-8"><h1 className="text-4xl font-bold">{project?.name ?? "Project"}</h1></main>;
}

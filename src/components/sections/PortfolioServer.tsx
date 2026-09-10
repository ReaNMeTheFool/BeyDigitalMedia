import { listProjects } from "@/lib/content";
import Portfolio from "./Portfolio";
import { defaultProjects } from "@/lib/defaultProjects";

interface PortfolioServerProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

export default async function PortfolioServer({
  title,
  subtitle,
  showAll = true,
}: PortfolioServerProps) {
  let cmsProjects: {
    id: number;
    title: string;
    category: string;
    services: { label: string; slug: string; breakBefore?: boolean }[];
    color: string;
    results: string;
    logo?: string;
    logoScale?: number;
    resultsColor?: string;
    smallTags?: boolean;
  }[] = [];

  try {
    const all = await listProjects();
    const docs = showAll ? all : all.slice(0, 6);
    cmsProjects = docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      services: (doc.services || []).map((tag) => ({
        label: tag.label,
        slug: tag.slug,
        breakBefore: tag.breakBefore ?? undefined,
      })),
      color: doc.color,
      results: doc.results,
      logo: doc.logo?.url || undefined,
      logoScale: doc.logoScale ?? undefined,
      resultsColor: doc.resultsColor ?? undefined,
      smallTags: doc.smallTags ?? undefined,
    }));
  } catch {
    cmsProjects = [];
  }

  // CMS verisi ile hardcoded veriyi merge et (logo eksikse hardcoded kullan)
  const mergedProjects = defaultProjects.map((defaultProject) => {
    const cmsProject = cmsProjects.find((p) => p.title === defaultProject.title);
    if (!cmsProject) return defaultProject;
    return {
      ...defaultProject,
      ...cmsProject,
      logo: cmsProject.logo || defaultProject.logo,
    };
  });

  return (
    <Portfolio
      title={title}
      subtitle={subtitle}
      projects={mergedProjects}
    />
  );
}

import { getPayloadClient } from "@/lib/payload";
import Portfolio from "./Portfolio";
import { defaultProjects } from "@/lib/defaultProjects";

interface PortfolioServerProps {
  title?: string;
  subtitle?: string;
}

export default async function PortfolioServer({
  title,
  subtitle,
}: PortfolioServerProps) {
  let cmsProjects: any[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      sort: "order",
    });
    cmsProjects = result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      category: doc.category,
      services: doc.services || [],
      color: doc.color || undefined,
      results: doc.results || undefined,
      logo: doc.logo?.url || undefined,
      logoScale: doc.logoScale,
      resultsColor: doc.resultsColor,
      smallTags: doc.smallTags,
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

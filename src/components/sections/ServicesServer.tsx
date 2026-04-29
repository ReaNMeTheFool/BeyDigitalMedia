import { getPayloadClient } from "@/lib/payload";
import Services from "./Services";
import { defaultServices } from "@/lib/defaultServices";

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface ServicesServerProps {
  showAll?: boolean;
  selectedSlugs?: string[];
}

export default async function ServicesServer({
  showAll = true,
  selectedSlugs,
}: ServicesServerProps) {
  let cmsServices: any[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      sort: "order",
    });
    cmsServices = result.docs.map((doc: any) => ({
      imageSrc: doc.icon?.url || undefined,
      title: doc.title,
      description: doc.description,
      link: `/${doc.slug}`,
      color: doc.accentColor ? `text-[${doc.accentColor}]` : undefined,
      bgColor: doc.accentColor && doc.accentColor.startsWith("#")
        ? hexToRgba(doc.accentColor, 0.1)
        : undefined,
    }));
  } catch {
    cmsServices = [];
  }

  // CMS verisi ile hardcoded veriyi merge et (logo/imageSrc eksikse hardcoded kullan)
  const mergedServices = defaultServices.map((defaultService) => {
    const cmsService = cmsServices.find((s) => s.link === defaultService.link);
    if (!cmsService) return defaultService;
    return {
      ...defaultService,
      title: cmsService.title || defaultService.title,
      description: cmsService.description || defaultService.description,
      imageSrc: cmsService.imageSrc || defaultService.imageSrc,
      color: cmsService.color || defaultService.color,
      bgColor: cmsService.bgColor || defaultService.bgColor,
    };
  });

  return (
    <Services
      showAll={showAll}
      selectedSlugs={selectedSlugs}
      services={mergedServices}
    />
  );
}

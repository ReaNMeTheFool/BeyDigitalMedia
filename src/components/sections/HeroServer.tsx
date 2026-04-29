import { getPayloadClient } from "@/lib/payload";
import Hero from "./Hero";

interface HeroServerProps {
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
}

export default async function HeroServer({
  description,
  primaryCta,
  secondaryCta,
}: HeroServerProps) {
  let stats = [
    { number: "150+", label: "Tamamlanan Proje" },
    { number: "100+", label: "Memnun Müşteri" },
    { number: "%100", label: "Müşteri Memnuniyeti" },
    { number: "8+", label: "Yıllık Deneyim" },
  ];

  try {
    const payload = await getPayloadClient();
    const siteSettings = await payload.findGlobal({ slug: "siteSettings" });
    if (siteSettings && (siteSettings as any).heroStats) {
      stats = (siteSettings as any).heroStats;
    }
  } catch {
    // fallback stats
  }

  return (
    <Hero
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      stats={stats}
    />
  );
}

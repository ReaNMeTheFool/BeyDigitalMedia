import { getPayloadClient } from "@/lib/payload";
import Hero from "./Hero";

interface HeroServerProps {
  titlePrefix?: string;
  titleSuffix?: string;
  animatedWords?: string[];
  subtitle?: string;
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
}

export default async function HeroServer({
  titlePrefix,
  titleSuffix,
  animatedWords,
  subtitle,
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
      titlePrefix={titlePrefix}
      titleSuffix={titleSuffix}
      animatedWords={animatedWords}
      subtitle={subtitle}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      stats={stats}
    />
  );
}

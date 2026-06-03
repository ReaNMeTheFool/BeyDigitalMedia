import HeroServer from "@/components/sections/HeroServer";
import Marquee from "@/components/sections/Marquee";
import ServicesServer from "@/components/sections/ServicesServer";
import PortfolioServer from "@/components/sections/PortfolioServer";
import TestimonialsServer from "@/components/sections/TestimonialsServer";
import FAQServer from "@/components/sections/FAQServer";
import AboutServer from "@/components/sections/AboutServer";
import AiAutomationServer from "@/components/sections/AiAutomationServer";
import WhyUsServer from "@/components/sections/WhyUsServer";
import Pricing from "@/components/sections/Pricing";
import PartnerBadges from "@/components/sections/PartnerBadges";

interface Block {
  blockType: string;
  [key: string]: unknown;
}

const blockOrder = [
  "hero",
  "marquee",
  "servicesGrid",
  "aiAutomation",
  "whyUs",
  "portfolioSlider",
  "about",
  "pricing",
  "partnerBadges",
  "testimonialsCarousel",
  "faqAccordion",
  "cta",
];

export default function BlocksRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null;

  // Eksik olan sabit blokları fallback olarak ekle
  const presentTypes = new Set(blocks.map((b) => b.blockType));
  const completeBlocks = [...blocks];

  if (!presentTypes.has("aiAutomation")) {
    completeBlocks.push({ blockType: "aiAutomation" });
  }
  if (!presentTypes.has("whyUs")) {
    completeBlocks.push({ blockType: "whyUs" });
  }

  // CMS'den gelen blokları kodda belirlenen sabit sıraya göre sırala
  const sortedBlocks = completeBlocks.sort((a, b) => {
    const aIndex = blockOrder.indexOf(a.blockType);
    const bIndex = blockOrder.indexOf(b.blockType);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <>
      {sortedBlocks.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            return (
              <HeroServer
                key={index}
                titlePrefix={(block.titlePrefix as string) || undefined}
                animatedWords={
                  ((block.animatedWords as { word: string }[]) || []).map(
                    (w) => w.word
                  )
                }
                titleSuffix={(block.titleSuffix as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                primaryCta={
                  (block.primaryCta as {
                    text: string;
                    link: string;
                  }) || undefined
                }
                secondaryCta={
                  (block.secondaryCta as {
                    text: string;
                    link: string;
                  }) || undefined
                }
              />
            );
          case "marquee":
            return (
              <Marquee
                key={index}
                items={
                  ((block.items as { text: string }[]) || []).map(
                    (i) => i.text
                  ) || []
                }
              />
            );
          case "servicesGrid":
            return (
              <ServicesServer
                key={index}
                showAll={Boolean(block.showAllServices)}
                selectedSlugs={
                  ((block.selectedServices as { slug: string }[]) || []).map(
                    (s) => s.slug
                  )
                }
              />
            );
          case "portfolioSlider":
            return (
              <PortfolioServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
              />
            );
          case "testimonialsCarousel":
            return (
              <TestimonialsServer
                key={index}
                title={(block.title as string) || undefined}
              />
            );
          case "faqAccordion":
            return (
              <FAQServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                showAll={Boolean(block.showAllFaqs)}
                selectedFaqs={(block.selectedFaqs as any[]) || undefined}
              />
            );
          case "about":
            return (
              <AboutServer
                key={index}
                image={
                  (block.image as { url?: string })?.url || undefined
                }
              />
            );
          case "aiAutomation":
            return (
              <AiAutomationServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
              />
            );
          case "whyUs":
            return (
              <WhyUsServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
              />
            );
          case "pricing":
            return (
              <Pricing
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                packages={
                  ((block.packages as {
                    name: string;
                    price: string;
                    features: { text: string }[];
                    highlighted?: boolean;
                    ctaText: string;
                    ctaLink: string;
                  }[]) || []).map((pkg) => ({
                    ...pkg,
                    features: (pkg.features || []).map((f) => f.text),
                  }))
                }
              />
            );
          case "partnerBadges":
            return (
              <PartnerBadges
                key={index}
                title={(block.title as string) || undefined}
                badges={
                  (block.badges as {
                    name: string;
                    icon: string;
                  }[]) || undefined
                }
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

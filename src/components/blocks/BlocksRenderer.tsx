import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import AiAutomation from "@/components/sections/AiAutomation";
import WhyUs from "@/components/sections/WhyUs";

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
  "testimonialsCarousel",
  "faqAccordion",
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
              <Hero
                key={index}
                description={(block.description as string) || ""}
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
              <Services
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
              <Portfolio
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
              />
            );
          case "testimonialsCarousel":
            return (
              <Testimonials
                key={index}
                title={(block.title as string) || undefined}
              />
            );
          case "faqAccordion":
            return (
              <FAQ
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                showAll={Boolean(block.showAllFaqs)}
              />
            );
          case "about":
            return (
              <About
                key={index}
                image={(block.image as string) || undefined}
              />
            );
          case "aiAutomation":
            return <AiAutomation key={index} />;
          case "whyUs":
            return <WhyUs key={index} />;
          default:
            return null;
        }
      })}
    </>
  );
}

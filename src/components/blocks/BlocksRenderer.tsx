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
import CTAServer from "@/components/sections/CTAServer";
import type { HeroBlock, PartnerBadgesBlock } from "@/types/content";

export interface Block {
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
          case "hero": {
            const icerik = block.icerik as HeroBlock["icerik"] | undefined;
            const cta = block.cta as HeroBlock["cta"] | undefined;
            const words = icerik?.animatedWords;
            return (
              <HeroServer
                key={index}
                titlePrefix={icerik?.titlePrefix || undefined}
                animatedWords={
                  words?.length ? words.map((w) => w.word) : undefined
                }
                titleSuffix={icerik?.titleSuffix || undefined}
                description={icerik?.subtitle || undefined}
                primaryCta={
                  cta?.primaryCta
                    ? {
                        text: cta.primaryCta.text || "",
                        link: cta.primaryCta.link || "",
                      }
                    : undefined
                }
                secondaryCta={
                  cta?.secondaryCta
                    ? {
                        text: cta.secondaryCta.text || "",
                        link: cta.secondaryCta.link || "",
                      }
                    : undefined
                }
              />
            );
          }
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
                sectionTitle={(block.sectionTitle as string) || undefined}
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
                showAll={block.showAllPortfolios !== false}
              />
            );
          case "testimonialsCarousel":
            return (
              <TestimonialsServer
                key={index}
                title={(block.title as string) || undefined}
                showAll={block.showAllTestimonials !== false}
              />
            );
          case "faqAccordion":
            return (
              <FAQServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                showAll={Boolean(block.showAllFaqs)}
                selectedFaqs={
                  (block.selectedFaqs as {
                    question: string;
                    answer: unknown;
                  }[]) || undefined
                }
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
          case "partnerBadges": {
            const rawBadges =
              (block.badges as PartnerBadgesBlock["badges"]) || undefined;
            // badges.icon CMS'te Media relation olabilir; sadece string URL'leri geç.
            const badges = rawBadges?.map((badge) => ({
              name: badge.name,
              icon:
                typeof badge.icon === "string"
                  ? badge.icon
                  : typeof badge.icon?.url === "string"
                    ? badge.icon.url
                    : undefined,
            }));
            return (
              <PartnerBadges
                key={index}
                title={(block.title as string) || undefined}
                badges={badges}
              />
            );
          }
          case "cta":
            return (
              <CTAServer
                key={index}
                title={(block.title as string) || undefined}
                subtitle={(block.subtitle as string) || undefined}
                ctaText={(block.ctaText as string) || undefined}
                ctaLink={(block.ctaLink as string) || undefined}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

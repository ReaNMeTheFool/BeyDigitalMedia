import type { CollectionConfig } from "payload";

import { HeroBlock, MarqueeBlock, ServicesGridBlock, PortfolioSliderBlock, TestimonialsCarouselBlock, FAQAccordionBlock, AboutBlock, AiAutomationBlock, WhyUsBlock, PricingBlock, PartnerBadgesBlock } from "../blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Sayfa",
    plural: "Sayfalar",
  },
  admin: {
    useAsTitle: "title",
    group: "İçerik",
    description: "Sayfaları yönetin. 'home' slug'ı ana sayfadır.",
  },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      admin: {
        position: "sidebar",
        description: "SEO başlığı.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      admin: {
        position: "sidebar",
        description: "SEO açıklaması.",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL adresi. 'home' ana sayfayı temsil eder.",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Sayfa Başlığı",
      required: true,
      admin: {
        description: "Panelde görünen sayfa adı.",
      },
    },
    {
      name: "content",
      type: "blocks",
      label: "Sayfa İçeriği",
      admin: {
        description: "Sayfa blokları.",
      },
      blocks: [
        HeroBlock,
        MarqueeBlock,
        ServicesGridBlock,
        PortfolioSliderBlock,
        TestimonialsCarouselBlock,
        FAQAccordionBlock,
        AboutBlock,
        AiAutomationBlock,
        WhyUsBlock,
        PricingBlock,
        PartnerBadgesBlock,
      ],
    },
  ],
};

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
    description: "Dinamik sayfalarınızı yönetin. 'home' slug'lu sayfa ana sayfa olarak kullanılır.",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Sayfanın URL adresi. 'home' özel olarak ana sayfayı temsil eder.",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Sayfa Başlığı",
      required: true,
      admin: {
        description: "Yönetim panelinde görünen sayfa adı.",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      admin: {
        description: "Tarayıcı sekmesinde ve arama sonuçlarında görünen başlık.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      admin: {
        description: "Arama motorlarında görünen sayfa açıklaması.",
      },
    },
    {
      name: "content",
      type: "blocks",
      label: "Sayfa İçeriği",
      admin: {
        description: "Sayfayı oluşturan bloklar. Blok sıralaması site tarafından sabitlenmiştir, sadece içerikleri değiştirebilirsiniz.",
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

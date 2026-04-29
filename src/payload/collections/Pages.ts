import type { CollectionConfig } from "payload";

import { HeroBlock } from "../blocks/Hero";
import { MarqueeBlock } from "../blocks/Marquee";
import { ServicesGridBlock } from "../blocks/ServicesGrid";
import { PortfolioSliderBlock } from "../blocks/PortfolioSlider";
import { TestimonialsCarouselBlock } from "../blocks/TestimonialsCarousel";
import { FAQAccordionBlock } from "../blocks/FAQAccordion";
import { AboutBlock } from "../blocks/About";
import { AiAutomationBlock } from "../blocks/AiAutomation";
import { WhyUsBlock } from "../blocks/WhyUs";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Sayfa",
    plural: "Sayfalar",
  },
  admin: {
    useAsTitle: "title",
    group: "Ana Site",
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
      ],
    },
  ],
};

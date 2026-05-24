import type { Block } from "payload";

export const CTABlock: Block = {
  slug: "cta",
  interfaceName: "CtaBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      admin: { description: "Buton üstü başlık" },
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      admin: { description: "Kısa açıklama" },
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Buton Metni",
      admin: { description: "Buton üzerindeki metin" },
      required: true,
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Link",
      admin: { description: "Yönlendirme linki" },
      required: true,
    },
  ],
};

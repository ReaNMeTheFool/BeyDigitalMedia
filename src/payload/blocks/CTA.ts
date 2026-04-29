import type { Block } from "payload";

export const CTABlock: Block = {
  slug: "cta",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
    },
    {
      name: "ctaText",
      type: "text",
      label: "CTA Buton Metni",
      required: true,
    },
    {
      name: "ctaLink",
      type: "text",
      label: "CTA Link",
      required: true,
    },
  ],
};

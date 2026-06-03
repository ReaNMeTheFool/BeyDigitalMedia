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
      defaultValue: "Harekete Geçin",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      admin: { description: "Kısa açıklama" },
      defaultValue: "Markanız için ilk adımı atın.",
    },
    {
      type: "row",
      fields: [
        {
          name: "ctaText",
          type: "text",
          label: "CTA Buton Metni",
          admin: { description: "Buton üzerindeki metin", width: "60%" },
          required: true,
          defaultValue: "Teklif Al",
        },
        {
          name: "ctaLink",
          type: "text",
          label: "CTA Link",
          admin: { description: "Yönlendirme linki", width: "40%" },
          required: true,
          defaultValue: "#contact",
        },
      ],
    },
  ],
};

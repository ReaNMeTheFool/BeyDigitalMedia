import type { Block } from "payload";

export const PricingBlock: Block = {
  slug: "pricing",
  interfaceName: "PricingBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      admin: { description: "Bölüm başlığı" },
      defaultValue: "Fiyatlandırma",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      admin: { description: "Kısa açıklama" },
      defaultValue: "Markanız için en uygun paketi seçin.",
    },
    {
      name: "packages",
      type: "array",
      label: "Paketler",
      admin: { description: "Fiyat paketleri" },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Paket Adı",
          required: true,
        },
        {
          name: "price",
          type: "number",
          label: "Fiyat",
          required: true,
        },
        {
          name: "highlighted",
          type: "checkbox",
          label: "Öne Çıkan Paket",
          defaultValue: false,
        },
        {
          name: "ctaText",
          type: "text",
          label: "CTA Buton Metni",
          required: true,
          defaultValue: "Teklif Al",
        },
        {
          name: "ctaLink",
          type: "text",
          label: "CTA Link",
          required: true,
          defaultValue: "#contact",
        },
        {
          name: "features",
          type: "array",
          label: "Özellikler",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Özellik",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

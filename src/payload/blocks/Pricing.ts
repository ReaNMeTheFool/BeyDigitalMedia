import type { Block } from "payload";

export const PricingBlock: Block = {
  slug: "pricing",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Baslik",
      defaultValue: "Fiyatlandirma",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Baslik",
      defaultValue: "Markaniz icin en uygun paketi secin.",
    },
    {
      name: "packages",
      type: "array",
      label: "Paketler",
      admin: {
        description: "Fiyatlandirma paketlerini buradan duzenleyin.",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Paket Adi",
          required: true,
        },
        {
          name: "price",
          type: "text",
          label: "Fiyat",
          required: true,
        },
        {
          name: "highlighted",
          type: "checkbox",
          label: "One Cikan Paket",
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
          label: "Ozellikler",
          fields: [
            {
              name: "text",
              type: "text",
              label: "Ozellik",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

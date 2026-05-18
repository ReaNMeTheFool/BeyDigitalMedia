import type { Block } from "payload";

export const PricingBlock: Block = {
  slug: "pricing",
  interfaceName: "PricingBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "icerik",
          label: "İçerik",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Başlık",
              defaultValue: "Fiyatlandırma",
            },
            {
              name: "subtitle",
              type: "textarea",
              label: "Alt Başlık",
              defaultValue: "Markaniz icin en uygun paketi secin.",
            },
          ],
        },
        {
          name: "paketler",
          label: "Paketler",
          fields: [
            {
              name: "packages",
              type: "array",
              label: "Paketler",
              admin: {
                description: "Fiyatlandırma paketlerini buradan düzenleyin.",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Paket Adı",
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
        },
      ],
    },
  ],
};

import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "SSS",
    plural: "SSS'ler",
  },
  admin: {
    useAsTitle: "question",
    group: "Referanslar",
    defaultColumns: ["question", "order", "createdAt"],
    description: "Sık sorulan soruları yönetin.",
  },
  fields: [
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Görünüm sırası. Küçük = üstte.",
      },
    },
    {
      name: "question",
      type: "text",
      label: "Soru",
      required: true,
      admin: {
        description: "Sık sorulan soru.",
      },
    },
    {
      name: "answer",
      type: "richText",
      label: "Cevap",
      required: true,
      admin: {
        description: "Sorunun detaylı cevabı.",
      },
    },
  ],
};

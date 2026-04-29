import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  labels: {
    singular: "SSS",
    plural: "SSS'ler",
  },
  admin: {
    useAsTitle: "question",
    group: "Ana Site",
    description: "Sıkça sorulan soruları buradan yönetin. Sorular ana sayfadaki akordeon bileşeninde listelenir.",
  },
  fields: [
    {
      name: "question",
      type: "text",
      label: "Soru",
      required: true,
      admin: {
        description: "Ziyaretçilerin sık sorduğu soruyu yazın. Net ve anlaşılır olun.",
      },
    },
    {
      name: "answer",
      type: "richText",
      label: "Cevap",
      required: true,
      admin: {
        description: "Sorunun detaylı cevabı. Paragraflar, listeler ve vurgular kullanabilirsiniz.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        description: "Soruların listedeki görünüm sırası. Küçük numara = üstte göster.",
      },
    },
  ],
};

import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Yorum",
    plural: "Yorumlar",
  },
  admin: {
    useAsTitle: "name",
    group: "Referanslar",
    defaultColumns: ["name", "company", "rating", "createdAt"],
    description: "Müşteri yorumlarını yönetin.",
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Fotoğraf",
      admin: {
        position: "sidebar",
        description: "Profil fotoğrafı.",
      },
    },
    {
      name: "rating",
      type: "number",
      label: "Puan (1-5)",
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        position: "sidebar",
        description: "Yıldız puanı.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Görünüm sırası. Küçük = önce.",
      },
    },
    {
      name: "name",
      type: "text",
      label: "İsim",
      required: true,
      admin: {
        description: "Müşteri adı soyadı.",
      },
    },
    {
      name: "company",
      type: "text",
      label: "Şirket",
      required: true,
      admin: {
        description: "Firma adı.",
      },
    },
    {
      name: "role",
      type: "text",
      label: "Pozisyon",
      admin: {
        description: "Ünvan. Örn: Genel Müdür",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: "Yorum Metni",
      required: true,
      admin: {
        description: "Müşteri deneyim yorumu.",
      },
    },
  ],
};

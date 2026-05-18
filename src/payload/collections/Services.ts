import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Hizmet",
    plural: "Hizmetler",
  },
  admin: {
    useAsTitle: "title",
    group: "Hizmetler",
    defaultColumns: ["title", "slug", "order", "createdAt"],
    description: "Hizmet sayfalarını yönetin.",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL adresi. Örn: sosyal-medya-yonetimi",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      admin: {
        description: "Görünen ad.",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Alt Başlık",
      required: true,
      admin: {
        description: "Başlık altındaki kısa açıklama.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Kısa Açıklama",
      required: true,
      admin: {
        description: "Hizmet kartlarında görünen özet.",
      },
    },
    {
      name: "longDescription",
      type: "richText",
      label: "Detaylı Açıklama",
      required: true,
      admin: {
        description: "Detay sayfasındaki uzun açıklama.",
      },
    },
    {
      name: "features",
      type: "array",
      label: "Özellikler",
      admin: {
        description: "Hizmetin sunduğu ana özellikler.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
    {
      name: "process",
      type: "array",
      label: "Süreç Adımları",
      admin: {
        description: "Hizmetin işleyiş adımları.",
      },
      fields: [
        {
          name: "step",
          type: "number",
          label: "Adım No",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      required: true,
      admin: {
        position: "sidebar",
        description: "SEO başlığı (max 60 karakter).",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      required: true,
      admin: {
        position: "sidebar",
        description: "SEO açıklaması (max 160 karakter).",
      },
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "İkon",
      admin: {
        position: "sidebar",
        description: "Hizmet kartı ikon görseli.",
      },
    },
    {
      name: "accentColor",
      type: "text",
      label: "Vurgu Rengi (HEX)",
      required: true,
      defaultValue: "#0040ff",
      admin: {
        position: "sidebar",
        description: "Hizmet sayfası ana rengi. Örn: #0040ff",
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
  ],
};

import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Proje",
    plural: "Projeler",
  },
  admin: {
    useAsTitle: "title",
    group: "Portfolyo",
    defaultColumns: ["title", "category", "order", "createdAt"],
    description: "Referans projeleri yönetin.",
  },
  fields: [
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
      type: "tabs",
      tabs: [
        {
          label: "Proje",
          fields: [
            {
              name: "slug",
              type: "text",
              label: "Slug",
              required: true,
              unique: true,
              admin: {
                description: "URL adresi. Örn: guzgun-tekstil",
              },
            },
            {
              name: "title",
              type: "text",
              label: "Proje Adı",
              required: true,
              admin: {
                description: "Projenin görünen adı.",
              },
            },
            {
              name: "category",
              type: "text",
              label: "Kategori",
              required: true,
              admin: {
                description: "Proje kategorisi.",
              },
            },
            {
              name: "services",
              type: "array",
              label: "İlişkili Servisler",
              admin: {
                description: "Projede kullanılan hizmet etiketleri.",
              },
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Etiket",
                  required: true,
                  defaultValue: "Hizmet Adı",
                },
                {
                  name: "slug",
                  type: "text",
                  label: "Slug",
                  required: true,
                  defaultValue: "hizmet-slug",
                },
                {
                  name: "breakBefore",
                  type: "checkbox",
                  label: "Önce Satır Sonu",
                  defaultValue: false,
                },
              ],
            },
            {
              name: "results",
              type: "text",
              label: "Sonuç Metni",
              required: true,
              defaultValue: "Etkileşim +%2000",
              admin: {
                description: "Proje sonucu. Örn: Etkileşim +%2000",
              },
            },
            {
              name: "resultsColor",
              type: "text",
              label: "Sonuç Rengi",
              defaultValue: "#fefefe",
              admin: {
                description: "Sonuç metni rengi.",
              },
            },
          ],
        },
        {
          label: "Görsel",
          fields: [
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo",
              admin: {
                description: "Müşteri logosu.",
              },
            },
            {
              name: "logoScale",
              type: "number",
              label: "Logo Scale",
              defaultValue: 1,
              admin: {
                description: "Logo büyütme oranı.",
              },
            },
            {
              name: "smallTags",
              type: "checkbox",
              label: "Küçük Etiketler",
              defaultValue: false,
              admin: {
                description: "Etiketleri küçük boyutta göster.",
              },
            },
            {
              name: "color",
              type: "text",
              label: "Gradient Renk",
              required: true,
              defaultValue: "from-blue-500 to-cyan-500",
              admin: {
                description: "Arka plan gradient. Örn: from-emerald-500 to-teal-600",
              },
            },
          ],
        },
      ],
    },
  ],
};

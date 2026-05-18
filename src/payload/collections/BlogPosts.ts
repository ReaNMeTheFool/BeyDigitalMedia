import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blogPosts",
  labels: {
    singular: "Blog Yazısı",
    plural: "Blog Yazıları",
  },
  admin: {
    useAsTitle: "title",
    group: "Blog",
    defaultColumns: ["title", "publishedDate", "createdAt"],
    description: "Blog yazılarını yönetin.",
  },
  fields: [
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Kapak Görseli",
      admin: {
        position: "sidebar",
        description: "Kapak görseli. 1200x630px önerilir.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Kategori",
      admin: {
        position: "sidebar",
        description: "Yazının kategorisi.",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      admin: {
        position: "sidebar",
        description: "SEO başlığı.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      admin: {
        position: "sidebar",
        description: "SEO açıklaması (max 160 karakter).",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "İçerik",
          fields: [
            {
              name: "slug",
              type: "text",
              label: "Slug",
              required: true,
              unique: true,
              admin: {
                description: "URL adresi. Örn: sosyal-medya-trendleri-2024",
              },
            },
            {
              name: "title",
              type: "text",
              label: "Başlık",
              required: true,
              admin: {
                description: "Yazının ana başlığı.",
              },
            },
            {
              name: "excerpt",
              type: "textarea",
              label: "Özet",
              required: true,
              admin: {
                description: "Listeleme sayfasında görünen kısa özet.",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "İçerik",
              required: true,
              admin: {
                description: "Yazının ana içeriği.",
              },
            },
            {
              name: "publishedDate",
              type: "date",
              label: "Yayın Tarihi",
              required: true,
              admin: {
                description: "Yayınlanma tarihi.",
              },
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "users",
              label: "Yazar",
              admin: {
                description: "Yazıyı yazan kişi.",
              },
            },
          ],
        },
        {
          label: "SEO",
          fields: [],
        },
      ],
    },
  ],
};

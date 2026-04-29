import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Kategori",
    plural: "Kategoriler",
  },
  admin: {
    useAsTitle: "name",
    group: "Blog",
    description: "Blog yazıları için kategorileri oluşturun ve yönetin. Her kategori benzersiz bir slug'a sahip olmalıdır.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Kategori Adı",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
    },
  ],
};

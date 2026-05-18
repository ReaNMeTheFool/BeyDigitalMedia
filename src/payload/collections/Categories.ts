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
    defaultColumns: ["name", "slug", "createdAt"],
    description: "Blog kategorilerini yönetin.",
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

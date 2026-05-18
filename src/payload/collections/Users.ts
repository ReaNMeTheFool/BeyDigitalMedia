import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Kullanıcı",
    plural: "Kullanıcılar",
  },
  admin: {
    useAsTitle: "username",
    group: "Sistem",
    description: "Kullanıcı hesaplarını yönetin.",
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: false,
      requireEmail: false,
      requireUsername: true,
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ad Soyad",
      admin: {
        description: "Görünen ad.",
      },
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      defaultValue: "editor",
      admin: {
        description: "Admin: Tam yetki | Editor: İçerik yönetimi",
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};

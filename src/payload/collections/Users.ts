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
    description: "Sistem yöneticileri ve editör kullanıcıları buradan yönetilir. Kullanıcı adı ve şifre ile giriş yapılır.",
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
        description: "Kullanıcının görünen adı",
      },
    },
    {
      name: "role",
      type: "select",
      label: "Rol",
      defaultValue: "editor",
      admin: {
        description: "Admin: Tam yetki | Editor: Sadece içerik yönetimi",
      },
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};

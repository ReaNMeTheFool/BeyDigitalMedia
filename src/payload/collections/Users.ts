import type { AccessArgs, CollectionConfig } from "payload";
import type { User } from "@/payload-types";

const isAdmin = ({ req: { user } }: { req: { user?: User | null } }) =>
  user?.role === "admin";

// Boş veritabanında ilk adminin oluşturulabilmesi için.
const canCreateUser = async ({ req }: AccessArgs<User>) => {
  if (req.user?.role === "admin") return true;
  const { totalDocs } = await req.payload.count({ collection: "users" });
  return totalDocs === 0;
};

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
  access: {
    create: canCreateUser,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    unlock: isAdmin,
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
      access: {
        update: isAdmin,
      },
    },
  ],
};

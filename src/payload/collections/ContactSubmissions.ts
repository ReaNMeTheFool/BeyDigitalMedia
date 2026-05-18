import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contactSubmissions",
  labels: {
    singular: "İletişim Formu",
    plural: "İletişim Formları",
  },
  admin: {
    useAsTitle: "name",
    group: "İletişim",
    defaultColumns: ["name", "email", "createdAt", "read"],
    description: "Gelen mesajları görüntüleyin.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Ad Soyad",
      required: true,
      admin: {
        description: "Gönderenin adı ve soyadı.",
      },
    },
    {
      name: "email",
      type: "email",
      label: "E-posta",
      required: true,
      admin: {
        description: "Geri dönüş e-posta adresi.",
      },
    },
    {
      name: "phone",
      type: "text",
      label: "Telefon",
      admin: {
        description: "Telefon numarası.",
      },
    },
    {
      name: "service",
      type: "text",
      label: "İlgilenilen Hizmetler",
      admin: {
        description: "İlgilenilen hizmetler.",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: "Mesaj",
      required: true,
      admin: {
        description: "Mesaj içeriği.",
      },
    },
    {
      name: "read",
      type: "checkbox",
      label: "Okundu",
      defaultValue: false,
      admin: {
        description: "Okundu olarak işaretle.",
      },
    },
  ],
};

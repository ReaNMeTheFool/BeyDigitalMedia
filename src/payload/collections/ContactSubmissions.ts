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
    description: "İletişim formu üzerinden gönderilen tüm mesajlar burada listelenir. Okunmamış mesajları takip etmek için 'Okundu' sütununu kullanın.",
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
        description: "Gönderen kişinin adı ve soyadı.",
      },
    },
    {
      name: "email",
      type: "email",
      label: "E-posta",
      required: true,
      admin: {
        description: "Geri dönüş yapılacak e-posta adresi.",
      },
    },
    {
      name: "phone",
      type: "text",
      label: "Telefon",
      admin: {
        description: "Opsiyonel telefon numarası.",
      },
    },
    {
      name: "service",
      type: "text",
      label: "İlgilenilen Hizmetler",
      admin: {
        description: "Ziyaretçinin ilgilendiği hizmetlerin virgülle ayrılmış listesi.",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: "Mesaj",
      required: true,
      admin: {
        description: "Ziyaretçinin gönderdiği detaylı mesaj.",
      },
    },
    {
      name: "read",
      type: "checkbox",
      label: "Okundu",
      defaultValue: false,
      admin: {
        description: "Mesajı okuduğunuzda bu kutuyu işaretleyin. Okunmamış mesajlar vurgulu gösterilir.",
      },
    },
  ],
};

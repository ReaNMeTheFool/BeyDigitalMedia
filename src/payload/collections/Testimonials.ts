import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Yorum",
    plural: "Yorumlar",
  },
  admin: {
    useAsTitle: "name",
    group: "Ana Site",
    description: "Müşteri yorumlarınızı ve referanslarınızı buradan yönetin. Yorumlar ana sayfadaki carousel'de otomatik döner.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "İsim",
      required: true,
      admin: {
        description: "Müşterinin adı ve soyadı.",
      },
    },
    {
      name: "company",
      type: "text",
      label: "Şirket",
      required: true,
      admin: {
        description: "Müşterinin çalıştığı firma adı.",
      },
    },
    {
      name: "role",
      type: "text",
      label: "Pozisyon",
      admin: {
        description: "Müşterinin ünvanı. Örn: Genel Müdür, Pazarlama Direktörü",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Fotoğraf",
      admin: {
        description: "Müşterinin profil fotoğrafı. Kare format (1:1) önerilir.",
      },
    },
    {
      name: "rating",
      type: "number",
      label: "Puan (1-5)",
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: "Yıldız derecelendirmesi. 5 = mükemmel, 1 = zayıf.",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: "Yorum Metni",
      required: true,
      admin: {
        description: "Müşterinin deneyimini anlatan yorum. 2-4 cümle idealdir.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        description: "Yorumların carousel'deki görünüm sırası. Küçük numara = önce göster.",
      },
    },
  ],
};

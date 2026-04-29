import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Proje",
    plural: "Projeler",
  },
  admin: {
    useAsTitle: "title",
    group: "Ana Site",
    description: "Referans projelerinizi buradan yönetin. Her proje portfolyo slider'ında ve proje detay sayfalarında görüntülenir.",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Projenin URL adresi. Örn: guzgun-tekstil",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Proje Adı",
      required: true,
      admin: {
        description: "Müşteri firmanın veya projenin görünen adı.",
      },
    },
    {
      name: "category",
      type: "text",
      label: "Kategori",
      required: true,
      admin: {
        description: "Projenin kategorisi. Örn: Dijital Pazarlama, Sosyal Medya, Web Tasarım",
      },
    },
    {
      name: "services",
      type: "array",
      label: "İlişkili Servisler",
      admin: {
        description: "Projede kullanılan hizmet etiketleri. 'Önce Satır Sonu' seçeneği etiketleri iki satıra böler.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Etiket",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          label: "Slug",
          required: true,
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
      name: "color",
      type: "text",
      label: "Gradient Renk",
      required: true,
      defaultValue: "from-blue-500 to-cyan-500",
      admin: {
        description: "Proje kartının arka plan gradient'i. Tailwind formatında yazın. Örn: from-emerald-500 to-teal-600",
      },
    },
    {
      name: "results",
      type: "text",
      label: "Sonuç Metni",
      required: true,
      admin: {
        description: "Projeden elde edilen sonucu özetleyin. Örn: Etkileşim Oranı +2000%",
      },
    },
    {
      name: "resultsColor",
      type: "text",
      label: "Sonuç Rengi",
      defaultValue: "#fefefe",
      admin: {
        description: "Sonuç metninin rengi. Kontrastlı olması için koyu veya açık renk seçin.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
      admin: {
        description: "Müşteri firmanın logosu. Beyaz/zeminli PNG önerilir.",
      },
    },
    {
      name: "logoScale",
      type: "number",
      label: "Logo Scale",
      defaultValue: 1,
      admin: {
        description: "Logonun büyütme oranı. 1 = normal, 1.5 = %50 daha büyük.",
      },
    },
    {
      name: "smallTags",
      type: "checkbox",
      label: "Küçük Etiketler",
      defaultValue: false,
      admin: {
        description: "Aktif edilirse servis etiketleri daha küçük boyutta görünür.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        description: "Projelerin portfolyodaki görünüm sırası. Küçük numara = önce göster.",
      },
    },
  ],
};

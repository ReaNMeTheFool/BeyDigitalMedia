import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Site Ayarları",
    description: "Sayfa alt bilgisini (footer) buradan yönetin. Sütunlar, linkler, telif metni ve bülten formu ayarları bulunur.",
  },
  fields: [
    {
      name: "columns",
      type: "array",
      label: "Sütunlar",
      admin: {
        description: "Footer'daki link sütunları. Her sütunun bir başlığı ve altında birden fazla linki olabilir.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Sütun Başlığı",
          required: true,
          admin: {
            description: "Sütunun başlığı. Örn: Hizmetler, Şirket, İletişim",
          },
        },
        {
          name: "links",
          type: "array",
          label: "Linkler",
          admin: {
            description: "Bu sütunda listelenecek linkler.",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: "Etiket",
              required: true,
              admin: {
                description: "Link metni. Örn: Hakkımızda, Gizlilik Politikası",
              },
            },
            {
              name: "href",
              type: "text",
              label: "Link",
              required: true,
              admin: {
                description: "Link adresi. İç link: /hakkimizda | Harici: https://...",
              },
            },
          ],
        },
      ],
    },
    {
      name: "bottomText",
      type: "text",
      label: "Alt Metin",
      defaultValue: "© 2024 Bey Digital Media. Tüm hakları saklıdır.",
      admin: {
        description: "Footer'ın en altında görünen telif hakkı veya yasal metin.",
      },
    },
    {
      name: "showNewsletter",
      type: "checkbox",
      label: "Bülten Formu Göster",
      defaultValue: false,
      admin: {
        description: "Aktif edilirse footer'da e-posta bültenine abone olma formu görünür.",
      },
    },
  ],
};

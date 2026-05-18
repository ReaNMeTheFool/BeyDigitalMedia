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
      name: "ctaTitle",
      type: "text",
      label: "CTA Başlık",
      defaultValue: 'Dijital <span class="text-[#ffd76e]">Dönüşüm</span> İçin <br /><span style="color: #04a5e5">Hazır mısınız?</span>',
      admin: {
        description: "Footer CTA bölümünün başlığı. HTML etiketleri kullanabilirsiniz.",
      },
    },
    {
      name: "ctaSubtitle",
      type: "textarea",
      label: "CTA Açıklama",
      defaultValue: "Markanızı bir üst seviyeye taşımak için hemen bizimle iletişime geçin. Ücretsiz danışmanlık için formu doldurun.",
    },
    {
      name: "ctaButtonText",
      type: "text",
      label: "CTA Buton Metni",
      defaultValue: "Ücretsiz Teklif Alın",
    },
    {
      name: "ctaButtonHref",
      type: "text",
      label: "CTA Buton Linki",
      defaultValue: "#contact",
    },
    {
      name: "brandTagline",
      type: "text",
      label: "Marka Sloganı",
      defaultValue: "Built for Digital Growth.",
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Sosyal Medya Linkleri",
      admin: {
        description:
          "Footer'da gösterilecek sosyal medya ikonları. Instagram, YouTube, Facebook, TikTok sırasıyla ekleyin.",
      },
      defaultValue: [
        {
          platform: "Instagram",
          url: "https://instagram.com/beydigitalmedia",
        },
        {
          platform: "YouTube",
          url: "https://www.youtube.com/@beydigitalmedia",
        },
        {
          platform: "Facebook",
          url: "https://www.facebook.com/beydigitalmedia",
        },
        {
          platform: "TikTok",
          url: "https://www.tiktok.com/@beydigitalmedia",
        },
      ],
      fields: [
        {
          name: "platform",
          type: "text",
          required: true,
          label: "Platform",
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL",
        },
      ],
    },
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

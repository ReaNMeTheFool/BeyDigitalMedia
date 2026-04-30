import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site Ayarları",
  admin: {
    group: "Site Ayarları",
    description: "Sitenin genel ayarlarını buradan yapın. Logo, favicon, SEO meta bilgileri ve iletişim bilgileri burada yönetilir.",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      label: "Site Adı",
      defaultValue: "Bey Digital Media",
      admin: {
        description: "Sitenin ana adı. Tarayıcı sekmesinde ve marka alanlarında kullanılır.",
      },
    },
    {
      name: "tagline",
      type: "text",
      label: "Slogan",
      defaultValue: "Bursa Dijital Pazarlama Ajansı",
      admin: {
        description: "Site alt başlığı veya slogan. SEO açıklamalarında ve bazı bileşenlerde kullanılır.",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
      admin: {
        description: "Sitenin ana logosu. Navbar ve footer'da görünür. Şeffaf arka planlı PNG önerilir.",
      },
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
      label: "Favicon",
      admin: {
        description: "Tarayıcı sekmesinde görünen küçük ikon. 32x32px veya 64x64px PNG önerilir.",
      },
    },
    {
      name: "defaultMetaTitle",
      type: "text",
      label: "Varsayılan SEO Başlığı",
      admin: {
        description: "Sayfa özel başlığı yoksa kullanılacak varsayılan SEO başlığı.",
      },
    },
    {
      name: "defaultMetaDescription",
      type: "textarea",
      label: "Varsayılan SEO Açıklaması",
      admin: {
        description: "Sayfa özel açıklaması yoksa kullanılacak varsayılan SEO açıklaması.",
      },
    },
    {
      name: "contactEmail",
      type: "email",
      label: "İletişim E-posta",
      defaultValue: "info@beydigitalmedia.com",
      admin: {
        description: "Sitenin ana iletişim e-posta adresi. Form bildirimleri ve footer'da kullanılır.",
      },
    },
    {
      name: "contactPhone",
      type: "text",
      label: "İletişim Telefon",
      admin: {
        description: "Sitenin iletişim telefon numarası. Footer ve iletişim alanlarında görünür.",
      },
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Sosyal Medya Linkleri",
      admin: {
        description: "Sitenin sosyal medya hesapları. Footer'da otomatik olarak listelenir.",
      },
      fields: [
        {
          name: "platform",
          type: "text",
          label: "Platform",
          required: true,
          admin: {
            description: "Sosyal medya platformunun adı. Örn: Instagram, LinkedIn, Twitter",
          },
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          required: true,
          admin: {
            description: "Profil bağlantısı. Tam URL formatında girin. Örn: https://instagram.com/...",
          },
        },
      ],
    },
    {
      name: "theme",
      type: "group",
      label: "Tema Renkleri",
      admin: {
        description: "Sitenin genel renk şemasını buradan değiştirebilirsiniz.",
      },
      fields: [
        {
          name: "primaryColor",
          type: "text",
          label: "Ana Renk (Primary)",
          defaultValue: "#0040ff",
        },
        {
          name: "accentColor",
          type: "text",
          label: "Vurgu Rengi (Accent)",
          defaultValue: "#ffd76e",
        },
        {
          name: "surfaceColor",
          type: "text",
          label: "Yüzey Rengi (Surface)",
          defaultValue: "#1e1e2e",
        },
        {
          name: "backgroundColor",
          type: "text",
          label: "Arka Plan Rengi",
          defaultValue: "#181825",
        },
        {
          name: "textColor",
          type: "text",
          label: "Metin Rengi",
          defaultValue: "#cdd6f4",
        },
      ],
    },
  ],
};

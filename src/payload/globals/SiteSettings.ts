import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  label: "Site Ayarları",
  admin: {
    group: "Site Ayarları",
    description: "Site adı, logo, SEO ve iletişim ayarları.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Genel",
          fields: [
            {
              name: "siteName",
              type: "text",
              label: "Site Adı",
              defaultValue: "Bey Digital Media",
            },
            {
              name: "tagline",
              type: "text",
              label: "Slogan",
              defaultValue: "Dijital Pazarlama Ajansi",
            },
            {
              name: "logo",
              type: "upload",
              relationTo: "media",
              label: "Logo",
              admin: {
                position: "sidebar",
                description: "Şeffaf arka planlı PNG önerilir.",
              },
            },
            {
              name: "favicon",
              type: "upload",
              relationTo: "media",
              label: "Favicon",
              admin: {
                position: "sidebar",
                description: "32x32px veya 64x64px PNG.",
              },
            },
            {
              name: "contactEmail",
              type: "email",
              label: "İletişim E-posta",
              defaultValue: "info@beydigitalmedia.com",
            },
            {
              name: "contactPhone",
              type: "text",
              label: "İletişim Telefon",
              admin: {
                position: "sidebar",
              },
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "defaultMetaTitle",
              type: "text",
              label: "Varsayılan SEO Başlığı",
              admin: {
                description: "Sayfa başlığı yoksa kullanılır.",
              },
            },
            {
              name: "defaultMetaDescription",
              type: "textarea",
              label: "Varsayılan SEO Açıklaması",
              admin: {
                description: "Sayfa açıklaması yoksa kullanılır.",
              },
            },
            {
              name: "googleVerification",
              type: "text",
              label: "Google Site Doğrulama",
              admin: {
                description: "Google Search Console doğrulama kodu.",
              },
            },
          ],
        },
        {
          label: "Tema",
          fields: [
            {
              name: "theme",
              type: "group",
              label: "Tema Renkleri",
              admin: {
                description: "Site renk şeması.",
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
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Sosyal Medya Linkleri",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          name: "platform",
          type: "text",
          label: "Platform",
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "URL",
          required: true,
        },
      ],
    },
  ],
};

import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Site Ayarları",
    description: "Footer CTA, linkler ve sosyal medya.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "İçerik",
          fields: [
            {
              name: "ctaTitle",
              type: "text",
              label: "CTA Başlık",
              defaultValue: 'Dijital <span class="text-[#ffd76e]">Dönüşüm</span> İçin <br /><span style="color: #04a5e5">Hazır mısınız?</span>',
              admin: {
                description: "HTML etiketleri kullanabilirsiniz.",
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
              name: "columns",
              type: "array",
              label: "Sütunlar",
              admin: {
                description: "Footer link sütunları.",
              },
              defaultValue: [
                {
                  title: "Hizmetler",
                  links: [
                    { label: "Sosyal Medya Yönetimi", href: "/sosyal-medya-yonetimi" },
                    { label: "Meta Ads", href: "/meta-ads" },
                    { label: "Google Ads", href: "/google-ads" },
                    { label: "Web Tasarım", href: "/web-tasarim" },
                    { label: "SEO", href: "/seo" },
                    { label: "Logo & Kurumsal Kimlik", href: "/logo-tasarimi" },
                  ],
                },
                {
                  title: "Şirket",
                  links: [
                    { label: "Hakkımızda", href: "#about" },
                    { label: "Portfolyo", href: "/portfolyo" },
                    { label: "SSS", href: "#faq" },
                    { label: "İletişim", href: "/iletisim" },
                  ],
                },
              ],
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Sütun Başlığı",
                  required: true,
                },
                {
                  name: "links",
                  type: "array",
                  label: "Linkler",
                  admin: {
                    description: "Bu sütundaki linkler.",
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Etiket",
                      required: true,
                    },
                    {
                      name: "href",
                      type: "text",
                      label: "Link",
                      required: true,
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
            },
            {
              name: "brandTagline",
              type: "text",
              label: "Marka Sloganı",
              defaultValue: "Built for Digital Growth.",
              admin: {
                position: "sidebar",
              },
            },
            {
              name: "showNewsletter",
              type: "checkbox",
              label: "Bülten Formu Göster",
              defaultValue: false,
              admin: {
                position: "sidebar",
              },
            },
          ],
        },
        {
          label: "Sosyal",
          fields: [
            {
              name: "socialLinks",
              type: "array",
              label: "Sosyal Medya Linkleri",
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
          ],
        },
      ],
    },
  ],
};

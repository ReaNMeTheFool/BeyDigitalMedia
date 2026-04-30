import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigasyon",
  admin: {
    group: "Site Ayarları",
    description: "Site başlığındaki (navbar) menü linklerini ve CTA butonunu buradan yönetin. Sıralama numarası küçük olanlar solda gösterilir.",
  },
  fields: [
    {
      name: "links",
      type: "array",
      label: "Menü Linkleri",
      admin: {
        description: "Navbar'da görünen sayfa linkleri. İç linkler # ile başlar (örn: #services). Dış linkler tam URL olmalıdır.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Etiket",
          required: true,
          admin: {
            description: "Menüde görünen metin. Örn: Hizmetler, Portfolyo, Blog",
          },
        },
        {
          name: "href",
          type: "text",
          label: "Link",
          required: true,
          admin: {
            description: "Link adresi. Sayfa içi: #services | Sayfa dışı: /blog | Harici: https://...",
          },
        },
        {
          name: "isExternal",
          type: "checkbox",
          label: "Dış Link",
          defaultValue: false,
          admin: {
            description: "Harici siteye yönlendiriyorsa işaretleyin. Yeni sekmede açılır.",
          },
        },
        {
          name: "order",
          type: "number",
          label: "Sıralama",
          defaultValue: 0,
          admin: {
            description: "Menüdeki soldan sağa sıralaması. 1, 2, 3... şeklinde numaralandırın.",
          },
        },
        {
          name: "children",
          type: "array",
          label: "Alt Linkler",
          admin: {
            description: "Bu linkin altında açılır menü olarak gösterilecek linkler. Örn: Hizmetler menüsü altındaki alt hizmetler.",
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
            {
              name: "isExternal",
              type: "checkbox",
              label: "Dış Link",
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      label: "CTA Buton Metni",
      defaultValue: "Ücretsiz Teklif Al",
      admin: {
        description: "Navbar'daki ana harekete geçirici butonun metni.",
      },
    },
    {
      name: "ctaHref",
      type: "text",
      label: "CTA Link",
      defaultValue: "#contact",
      admin: {
        description: "CTA butonunun yönlendireceği adres. Genellikle iletişim formuna (#contact) gider.",
      },
    },
  ],
};

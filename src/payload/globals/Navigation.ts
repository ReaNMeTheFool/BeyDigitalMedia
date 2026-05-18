import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigasyon",
  admin: {
    group: "Site Ayarları",
    description: "Navbar menü linkleri ve CTA butonu.",
  },
  fields: [
    {
      name: "links",
      type: "array",
      label: "Menü Linkleri",
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
        {
          name: "order",
          type: "number",
          label: "Sıralama",
          defaultValue: 0,
        },
        {
          name: "children",
          type: "array",
          label: "Alt Linkler",
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
        position: "sidebar",
      },
    },
    {
      name: "ctaHref",
      type: "text",
      label: "CTA Link",
      defaultValue: "#contact",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

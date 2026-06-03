import type { Block } from "payload";

export const AboutBlock: Block = {
  slug: "about",
  interfaceName: "AboutBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      admin: {
        description: "Bölüm başlığı",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
      required: true,
      admin: {
        description: "Şirket açıklaması",
      },
    },
    {
      name: "stats",
      type: "array",
      label: "İstatistikler",
      admin: {
        description: "Sayısal istatistikler",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Değer",
              required: true,
              defaultValue: "150+",
              admin: { width: "35%" },
            },
            {
              name: "label",
              type: "text",
              label: "Etiket",
              required: true,
              defaultValue: "Mutlu Müşteri",
              admin: { width: "65%" },
            },
          ],
        },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Görsel",
      admin: {
        position: "sidebar",
      },
    },
  ],
};

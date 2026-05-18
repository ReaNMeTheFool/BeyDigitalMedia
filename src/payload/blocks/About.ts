import type { Block } from "payload";

export const AboutBlock: Block = {
  slug: "about",
  interfaceName: "AboutBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "icerik",
          label: "İçerik",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Başlık",
              required: true,
            },
            {
              name: "content",
              type: "richText",
              label: "İçerik",
              required: true,
            },
            {
              name: "stats",
              type: "array",
              label: "İstatistikler",
              fields: [
                {
                  name: "value",
                  type: "text",
                  label: "Değer",
                  required: true,
                },
                {
                  name: "label",
                  type: "text",
                  label: "Etiket",
                  required: true,
                },
              ],
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

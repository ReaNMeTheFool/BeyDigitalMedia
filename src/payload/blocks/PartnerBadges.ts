import type { Block } from "payload";

export const PartnerBadgesBlock: Block = {
  slug: "partnerBadges",
  interfaceName: "PartnerBadgesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: "Birlikte Çalıştığımız Platformlar",
    },
    {
      name: "badges",
      type: "array",
      label: "Partner Rozetleri",
      admin: {
        description: "Partner platform rozetlerini buradan düzenleyin.",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Platform Adı",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "İkon",
          admin: {
            position: "sidebar",
          },
        },
      ],
    },
  ],
};

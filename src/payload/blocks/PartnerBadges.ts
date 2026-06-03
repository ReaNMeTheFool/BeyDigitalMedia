import type { Block } from "payload";

export const PartnerBadgesBlock: Block = {
  slug: "partnerBadges",
  interfaceName: "PartnerBadgesBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      admin: { description: "Bölüm başlığı" },
      defaultValue: "Birlikte Çalıştığımız Platformlar",
    },
    {
      name: "badges",
      type: "array",
      label: "Partner Rozetleri",
      admin: { description: "Platform rozetleri" },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Platform Adı",
          required: true,
          defaultValue: "Platform Adı",
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

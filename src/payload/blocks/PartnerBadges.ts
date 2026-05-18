import type { Block } from "payload";

export const PartnerBadgesBlock: Block = {
  slug: "partnerBadges",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Baslik",
      defaultValue: "Birlikte Calistigimiz Platformlar",
    },
    {
      name: "badges",
      type: "array",
      label: "Partner Rozetleri",
      admin: {
        description: "Partner platform rozetlerini buradan duzenleyin.",
      },
      fields: [
        {
          name: "name",
          type: "text",
          label: "Platform Adi",
          required: true,
        },
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "Ikon",
        },
      ],
    },
  ],
};

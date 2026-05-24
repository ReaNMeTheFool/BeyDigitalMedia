import type { Block } from "payload";

export const MarqueeBlock: Block = {
  slug: "marquee",
  interfaceName: "MarqueeBlock",
  fields: [
    {
      name: "items",
      type: "array",
      label: "Marquee Öğeleri",
      admin: { description: "Kayan şeritteki logolar" },
      required: true,
      fields: [
        {
          name: "text",
          type: "text",
          label: "Metin",
          required: true,
        },
      ],
    },
  ],
};

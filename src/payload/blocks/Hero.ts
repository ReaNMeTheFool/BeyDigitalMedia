import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Alt Başlık",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Açıklama",
      required: true,
    },
    {
      name: "primaryCta",
      type: "group",
      label: "Birincil CTA",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Buton Metni",
          required: true,
        },
        {
          name: "link",
          type: "text",
          label: "Link",
          required: true,
        },
      ],
    },
    {
      name: "secondaryCta",
      type: "group",
      label: "İkincil CTA",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Buton Metni",
        },
        {
          name: "link",
          type: "text",
          label: "Link",
        },
      ],
    },
  ],
};

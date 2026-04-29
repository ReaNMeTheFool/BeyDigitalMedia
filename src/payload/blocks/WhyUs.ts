import type { Block } from "payload";

export const WhyUsBlock: Block = {
  slug: "whyUs",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: "Neden Biz?",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
    },
  ],
};

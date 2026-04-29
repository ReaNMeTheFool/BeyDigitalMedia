import type { Block } from "payload";

export const AiAutomationBlock: Block = {
  slug: "aiAutomation",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: "AI & Otomasyon",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
    },
  ],
};

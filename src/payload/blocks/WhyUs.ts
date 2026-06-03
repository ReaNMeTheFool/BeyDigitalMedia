import type { Block } from "payload";

export const WhyUsBlock: Block = {
  slug: "whyUs",
  interfaceName: "WhyUsBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: 'Farkımız <span class="text-[#0040ff]">Ne?</span>',
      admin: {
        description: "Ana başlık",
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue: "Bey Digital Media olarak sadece bir ajans değil, dijital büyüme ortağınız olmayı hedefliyoruz.",
      admin: {
        description: "Kısa açıklama",
      },
    },
    {
      name: "reasons",
      type: "array",
      label: "Neden Biz?",
      admin: {
        description: "Neden biz? maddeleri",
      },
      fields: [
        {
          name: "icon",
          type: "text",
          label: "İkon Adı",
          defaultValue: "TrendingUp",
          admin: {
            description: "Lucide ikon adı. Örn: TrendingUp, Clock, Users, Award, Zap, CheckCircle2",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
          defaultValue: "Neden Başlığı",
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
          defaultValue: "Bu maddenin kısa açıklaması.",
        },
      ],
    },
  ],
};

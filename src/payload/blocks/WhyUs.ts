import type { Block } from "payload";

export const WhyUsBlock: Block = {
  slug: "whyUs",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: 'Farkımız <span class="text-[#0040ff]">Ne?</span>',
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue: "Bey Digital Media olarak sadece bir ajans değil, dijital büyüme ortağınız olmayı hedefliyoruz.",
    },
    {
      name: "reasons",
      type: "array",
      label: "Neden Biz?",
      fields: [
        {
          name: "icon",
          type: "text",
          label: "İkon Adı",
          admin: {
            description: "Lucide ikon adı. Örn: TrendingUp, Clock, Users, Award, Zap, CheckCircle2",
          },
        },
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
  ],
};

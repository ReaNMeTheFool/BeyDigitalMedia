import type { Block } from "payload";

export const AiAutomationBlock: Block = {
  slug: "aiAutomation",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue: 'Zamanınızı Geri Kazanın, <span class="text-[#8b5cf6]">İşinizi Otomatikleştirin</span>',
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue: "Tekrarlayan işlere değil, büyümeye odaklanın.",
    },
    {
      name: "description",
      type: "array",
      label: "Açıklama Paragrafları",
      fields: [
        {
          name: "paragraph",
          type: "textarea",
          label: "Paragraf",
          required: true,
        },
      ],
    },
    {
      name: "badge",
      type: "text",
      label: "Badge Metni",
      defaultValue: "AI × OTOMASYON",
    },
    {
      name: "features",
      type: "array",
      label: "Özellikler",
      fields: [
        {
          name: "icon",
          type: "text",
          label: "İkon Adı",
          admin: {
            description: "Lucide ikon adı. Örn: Workflow, Bot, BarChart3, MessageSquare, Zap, BrainCircuit",
          },
        },
        {
          name: "label",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "desc",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
  ],
};

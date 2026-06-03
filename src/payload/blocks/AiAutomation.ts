import type { Block } from "payload";

export const AiAutomationBlock: Block = {
  slug: "aiAutomation",
  interfaceName: "AiAutomationBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      defaultValue:
        'Zamanınızı Geri Kazanın, <span class="text-[#8b5cf6]">İşinizi Otomatikleştirin</span>',
      admin: {
        description: "Ana başlık",
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue: "Tekrarlayan işlere değil, büyümeye odaklanın.",
      admin: {
        description: "Kısa açıklama",
      },
    },
    {
      name: "description",
      type: "richText",
      label: "Açıklama",
      admin: {
        description: "Detaylı içerik",
      },
    },
    {
      name: "badge",
      type: "text",
      label: "Badge",
      defaultValue: "AI × OTOMASYON",
      admin: {
        position: "sidebar",
        description: "Köşe etiketi",
      },
    },
    {
      name: "features",
      type: "array",
      label: "Özellikler",
      admin: {
        description: "Öne çıkan özellikler",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "icon",
              type: "text",
              label: "İkon",
              defaultValue: "Zap",
              admin: {
                width: "25%",
                description:
                  "Lucide ikon adı. Örn: Workflow, Bot, BarChart3, MessageSquare, Zap, BrainCircuit",
              },
            },
            {
              name: "label",
              type: "text",
              label: "Başlık",
              required: true,
              defaultValue: "Özellik Başlığı",
              admin: { width: "75%" },
            },
          ],
        },
        {
          name: "desc",
          type: "textarea",
          label: "Açıklama",
          required: true,
          defaultValue: "Bu özelliğin kısa açıklaması.",
        },
      ],
    },
  ],
};

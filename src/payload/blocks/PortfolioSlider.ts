import type { Block } from "payload";

export const PortfolioSliderBlock: Block = {
  slug: "portfolioSlider",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      defaultValue: "Gerçek Başarı Hikayeleri",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue:
        "Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.",
    },
  ],
};

import type { Block } from "payload";

export const PortfolioSliderBlock: Block = {
  slug: "portfolioSlider",
  interfaceName: "PortfolioSliderBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      admin: { description: "Bölüm başlığı" },
      required: true,
      defaultValue: "Gerçek Başarı Hikayeleri",
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      admin: { description: "Kısa açıklama" },
      defaultValue:
        "Türkiye'nin önde gelen markalarıyla çalışarak dijital dünyada ölçülebilir sonuçlar elde ediyoruz.",
    },
    {
      name: "showAllPortfolios",
      type: "checkbox",
      label: "Tüm Projeleri Göster",
      admin: { description: "Tümünü otomatik getir" },
      defaultValue: true,
    },
    {
      name: "selectedPortfolios",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
      label: "Seçili Projeler",
      admin: {
        condition: (data, siblingData) => !siblingData.showAllPortfolios,
        description: "Manuel proje seçimi",
      },
    },
  ],
};

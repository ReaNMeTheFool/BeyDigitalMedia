import type { Block } from "payload";

export const FAQAccordionBlock: Block = {
  slug: "faqAccordion",
  interfaceName: "FaqAccordionBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      defaultValue: "Merak Ettikleriniz",
      admin: {
        description: "Bölüm başlığı",
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      label: "Alt Başlık",
      defaultValue:
        "Dijital pazarlama ve hizmetlerimiz hakkında en çok sorulan soruların cevapları.",
      admin: {
        description: "Kısa açıklama",
      },
    },
    {
      name: "showAllFaqs",
      type: "checkbox",
      label: "Tüm FAQ'ları Göster",
      defaultValue: true,
      admin: {
        description: "Tümünü otomatik getir",
      },
    },
    {
      name: "selectedFaqs",
      type: "relationship",
      relationTo: "faqs",
      hasMany: true,
      label: "Seçili FAQ'lar",
      admin: {
        condition: (data, siblingData) => !siblingData.showAllFaqs,
        description: "Manuel FAQ seçimi",
      },
    },
  ],
};

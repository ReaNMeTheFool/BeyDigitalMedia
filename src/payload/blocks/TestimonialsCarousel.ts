import type { Block } from "payload";

export const TestimonialsCarouselBlock: Block = {
  slug: "testimonialsCarousel",
  interfaceName: "TestimonialsCarouselBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      admin: { description: "Bölüm başlığı" },
      required: true,
      defaultValue: "Bizim Hakkımızda Ne Dediler?",
    },
    {
      name: "showAllTestimonials",
      type: "checkbox",
      label: "Tüm Referansları Göster",
      admin: { description: "Tümünü otomatik getir" },
      defaultValue: true,
    },
    {
      name: "selectedTestimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      label: "Seçili Referanslar",
      admin: {
        condition: (data, siblingData) => !siblingData.showAllTestimonials,
        description: "Manuel referans seçimi",
      },
    },
  ],
};

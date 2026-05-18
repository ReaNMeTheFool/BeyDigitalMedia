import type { Block } from "payload";

export const TestimonialsCarouselBlock: Block = {
  slug: "testimonialsCarousel",
  interfaceName: "TestimonialsCarouselBlock",
  fields: [
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      defaultValue: "Bizim Hakkımızda Ne Dediler?",
    },
  ],
};

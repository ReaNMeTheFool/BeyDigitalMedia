import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  fields: [
    {
      name: "titlePrefix",
      type: "text",
      label: "Başlık Ön Ek",
      defaultValue: "Dijital",
    },
    {
      name: "animatedWords",
      type: "array",
      label: "Animasyonlu Kelimeler",
      admin: {
        description: "Hero başlığında dönüşümlü gösterilecek kelimeler.",
      },
      fields: [
        {
          name: "word",
          type: "text",
          label: "Kelime",
          required: true,
        },
      ],
    },
    {
      name: "titleSuffix",
      type: "text",
      label: "Başlık Son Ek",
      defaultValue: "Çözümleri",
    },
    {
      name: "subtitle",
      type: "text",
      label: "Alt Başlık",
      defaultValue: "Turkiye'nin onde gelen dijital pazarlama ajansi olarak markanizi buyutmek icin buradayiz.",
    },
    {
      name: "description",
      type: "textarea",
      label: "Açıklama",
      defaultValue: "Markanızı dijital dünyada büyütmek için ihtiyacınız olan tüm hizmetler tek çatı altında.",
    },
    {
      name: "primaryCta",
      type: "group",
      label: "Birincil CTA",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Buton Metni",
          defaultValue: "Ücretsiz Teklif Al",
        },
        {
          name: "link",
          type: "text",
          label: "Link",
          defaultValue: "#contact",
        },
      ],
    },
    {
      name: "secondaryCta",
      type: "group",
      label: "İkincil CTA",
      fields: [
        {
          name: "text",
          type: "text",
          label: "Buton Metni",
          defaultValue: "Hizmetlerimizi Keşfet",
        },
        {
          name: "link",
          type: "text",
          label: "Link",
          defaultValue: "#services",
        },
      ],
    },
  ],
};

import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "icerik",
          label: "İçerik",
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
                description: "Dönüşümlü gösterilecek kelimeler.",
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
              defaultValue: "Türkiye'nin önde gelen dijital pazarlama ajansı olarak markanızı büyütmek için buradayız.",
            },
            {
              name: "description",
              type: "textarea",
              label: "Açıklama",
              defaultValue: "Markanızı dijital dünyada büyütmek için ihtiyacınız olan tüm hizmetler tek çatı altında.",
            },
          ],
        },
        {
          name: "cta",
          label: "CTA",
          fields: [
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
        },
      ],
    },
  ],
};

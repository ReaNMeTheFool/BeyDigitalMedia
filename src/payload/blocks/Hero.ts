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
              label: "Başlık Önü",
              admin: { description: "Sabit başlangıç metni" },
              defaultValue: "Dijital",
            },
            {
              name: "animatedWords",
              type: "array",
              label: "Dönen Kelimeler",
              admin: { description: "Sırayla değişen kelimeler" },
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
              label: "Başlık Sonu",
              admin: { description: "Sabit bitiş metni" },
              defaultValue: "Çözümleri",
            },
            {
              name: "subtitle",
              type: "textarea",
              label: "Alt Başlık",
              admin: { description: "Başlık altı açıklama" },
              defaultValue: "Türkiye'nin önde gelen dijital pazarlama ajansı olarak markanızı büyütmek için buradayız.",
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
              label: "Ana Buton",
              admin: { description: "Öne çıkan buton" },
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Metin",
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
              label: "İkinci Buton",
              admin: { description: "İkinci buton" },
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Metin",
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

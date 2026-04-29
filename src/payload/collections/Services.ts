import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Hizmet",
    plural: "Hizmetler",
  },
  admin: {
    useAsTitle: "title",
    group: "Ana Site",
    description: "Sunduğunuz hizmetleri buradan yönetin. Her hizmet otomatik olarak kendi detay sayfasını oluşturur. Sıralama numarası küçük olanlar önce gösterilir.",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "URL'de görünecek benzersiz kimlik. Örn: sosyal-medya-yonetimi",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      admin: {
        description: "Hizmetin görünen adı. Ana sayfa ve detay sayfasında kullanılır.",
      },
    },
    {
      name: "subtitle",
      type: "text",
      label: "Alt Başlık",
      required: true,
      admin: {
        description: "Başlığın altında görünen kısa açıklama.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Kısa Açıklama",
      required: true,
      admin: {
        description: "Hizmet kartlarında görünen 2-3 cümlelik özet.",
      },
    },
    {
      name: "longDescription",
      type: "richText",
      label: "Detaylı Açıklama",
      required: true,
      admin: {
        description: "Hizmet detay sayfasında görünen uzun açıklama. Başlıklar, listeler ve kalın metin kullanabilirsiniz.",
      },
    },
    {
      name: "features",
      type: "array",
      label: "Özellikler",
      admin: {
        description: "Bu hizmetin sunduğu ana özellikleri listeleyin. Her özellik başlık ve açıklama içerir.",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
    {
      name: "process",
      type: "array",
      label: "Süreç Adımları",
      admin: {
        description: "Hizmetin nasıl işlediğini adım adım anlatın. Adım numaraları sıralamayı belirler.",
      },
      fields: [
        {
          name: "step",
          type: "number",
          label: "Adım No",
          required: true,
        },
        {
          name: "title",
          type: "text",
          label: "Başlık",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Açıklama",
          required: true,
        },
      ],
    },
    {
      name: "accentColor",
      type: "text",
      label: "Vurgu Rengi (HEX)",
      required: true,
      defaultValue: "#0040ff",
      admin: {
        description: "Hizmet sayfasında kullanılan ana renk. HEX formatında girin. Örn: #0040ff",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      required: true,
      admin: {
        description: "Tarayıcı sekmesinde ve arama sonuçlarında görünen başlık. 60 karakteri geçmeyin.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      required: true,
      admin: {
        description: "Arama motorlarında görünen açıklama metni. 160 karakteri geçmeyin.",
      },
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
      label: "Servis İkonu",
      admin: {
        description: "Hizmet kartında görünecek ikon görseli. PNG veya SVG önerilir.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Sıralama",
      defaultValue: 0,
      admin: {
        description: "Hizmetlerin görünüm sırası. Küçük numara = önce göster.",
      },
    },
  ],
};

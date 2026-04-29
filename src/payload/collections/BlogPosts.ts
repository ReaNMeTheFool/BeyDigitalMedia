import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blogPosts",
  labels: {
    singular: "Blog Yazısı",
    plural: "Blog Yazıları",
  },
  admin: {
    useAsTitle: "title",
    group: "Blog",
    description: "Blog yazılarınızı buradan oluşturun, düzenleyin ve yayınlayın. Her yazı otomatik olarak kendi sayfasını oluşturur.",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Blog yazısının URL adresi. Örn: sosyal-medya-trendleri-2024",
      },
    },
    {
      name: "title",
      type: "text",
      label: "Başlık",
      required: true,
      admin: {
        description: "Yazının ana başlığı. Hem sayfada hem arama sonuçlarında görünür.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Özet",
      required: true,
      admin: {
        description: "Blog listeleme sayfasında görünen kısa özet. 2-3 cümle önerilir.",
      },
    },
    {
      name: "content",
      type: "richText",
      label: "İçerik",
      required: true,
      admin: {
        description: "Yazının ana içeriği. Başlıklar, paragraflar, listeler ve bağlantılar ekleyebilirsiniz.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Kategori",
      admin: {
        description: "Yazının ait olduğu kategori. Kategoriler 'Categories' koleksiyonundan yönetilir.",
      },
    },
    {
      name: "publishedDate",
      type: "date",
      label: "Yayın Tarihi",
      required: true,
      admin: {
        description: "Yazının yayınlanma tarihi. Gelecek tarihli yazılar otomatik olarak listelenmez.",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Kapak Görseli",
      admin: {
        description: "Blog listeleme ve detay sayfasında görünecek ana görsel. 1200x630px önerilir.",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Yazar",
      admin: {
        description: "Yazıyı yazan kişi. Kullanıcılar 'Users' koleksiyonundan seçilir.",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      label: "SEO Başlığı",
      admin: {
        description: "Arama motorlarında görünen başlık. Boş bırakılırsa yazı başlığı kullanılır.",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Açıklaması",
      admin: {
        description: "Arama sonuçlarında görünen açıklama. 160 karakteri geçmemeye özen gösterin.",
      },
    },
  ],
};

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { tr } from "@payloadcms/translations/languages/tr";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Categories } from "./payload/collections/Categories";
import { Services } from "./payload/collections/Services";
import { BlogPosts } from "./payload/collections/BlogPosts";
import { Projects } from "./payload/collections/Projects";
import { Testimonials } from "./payload/collections/Testimonials";
import { FAQs } from "./payload/collections/FAQs";
import { ContactSubmissions } from "./payload/collections/ContactSubmissions";
import { Pages } from "./payload/collections/Pages";

import { SiteSettings } from "./payload/globals/SiteSettings";
import { Navigation } from "./payload/globals/Navigation";
import { Footer } from "./payload/globals/Footer";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " | Bey Digital Media Admin",
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/beydigital_logo.webp",
        },
      ],
    },
    components: {
      beforeLogin: [],
      afterLogin: ["@/payload/components/PasswordToggle#PasswordToggle"],
      afterDashboard: [],
      graphics: {
        Icon: "@/payload/components/AdminIcon#AdminIcon",
        Logo: "@/payload/components/AdminLogo#AdminLogo",
      },
    },
    dateFormat: "dd MMMM yyyy, HH:mm",
  },
  i18n: {
    fallbackLanguage: "tr",
    supportedLanguages: { tr, en },
    translations: {
      tr: {
        authentication: {
          lockUntil: "Kilitleme Tarihi",
        },
        fields: {
          chooseBetweenCustomTextOrDocument:
            "Özel metin URL'si girme veya başka bir dokümana bağlantı verme arasında seçim yapın",
          itemsAndMore: "{{items}} ve {{count}} tane daha",
          labelRelationship: "{{label}} İlişkisi",
          relationTo: "İlişki",
        },
        general: {
          aboutToDeleteCount: "Silmek üzere olduğunuz öğe sayısı",
          editingLabel: "Düzenleniyor",
          of: " / ",
          or: "veya",
          order: "Sıra",
        },
        version: {
          changedFieldsCount: "Değiştirilen alan sayısı",
          confirmRevertToSaved: "Kaydedilen sürüme dönmeyi onayla",
        },
      },
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Services,
    BlogPosts,
    Projects,
    Testimonials,
    FAQs,
    ContactSubmissions,
    Pages,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  globals: [SiteSettings, Navigation, Footer],
  sharp,
  plugins: [],
});

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { tr } from "@payloadcms/translations/languages/tr";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users, Media, Categories, Services, BlogPosts, Projects, Testimonials, FAQs, ContactSubmissions, Pages } from "./payload/collections";

import { SiteSettings, Navigation, Footer } from "./payload/globals";

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
      afterLogin: ["@/payload/components/PasswordToggle#PasswordToggle"],
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

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import NavbarServer from "@/components/ui/NavbarServer";
import FooterServer from "@/components/sections/FooterServer";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";
import { getPayloadClient } from "@/lib/payload";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    });
    const page = result.docs[0];
    if (page) {
      const title =
        (page.metaTitle as string) || "Bey Digital Media | Dijital Pazarlama Ajansi";
      const description =
        (page.metaDescription as string) ||
        "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.";
      return mergeMetadata(defaultSeoFields, {
        title,
        description,
        alternates: { canonical: "/" },
        openGraph: { title, description, url: "https://beydigitalmedia.com" },
        twitter: { title, description },
      });
    }
  } catch {
    // fallback
  }

  return mergeMetadata(defaultSeoFields, {
    title: "Bey Digital Media | Dijital Pazarlama Ajansi",
    description:
      "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Bey Digital Media | Dijital Pazarlama Ajansi",
      description:
        "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.",
      url: "https://beydigitalmedia.com",
    },
    twitter: {
      title: "Bey Digital Media | Dijital Pazarlama Ajansi",
      description:
        "Dijital pazarlama ajansi. Sosyal medya yonetimi, web tasarim, SEO ve kurumsal kimlik calismalari ile markanizi buyutuyoruz.",
    },
  });
}

export default async function Home() {
  let page = null;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    });
    page = result.docs[0] || null;
  } catch {
    page = null;
  }

  const blocks = page?.content || [];
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  return (
    <>
      <NavbarServer />
      <main>
        {hasBlocks ? (
          <BlocksRenderer blocks={blocks} />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-[#181825] text-[#cdd6f4]">
            <div className="text-center px-4">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Ana Sayfa Henuz Olusturulmadi
              </h1>
              <p className="text-lg text-[#cdd6f4]/80 mb-8 max-w-lg mx-auto">
                Payload Admin paneline gidip &quot;home&quot; slug&apos;lu bir sayfa olusturun. Tum section&apos;lari CMS&apos;den yonetebilirsiniz.
              </p>
              <a
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0040ff] text-white rounded-xl font-semibold hover:bg-[#0033cc] transition-colors shadow-lg shadow-[#0040ff]/25"
              >
                Admin Panele Git
              </a>
            </div>
          </div>
        )}
      </main>
      <FooterServer />
    </>
  );
}

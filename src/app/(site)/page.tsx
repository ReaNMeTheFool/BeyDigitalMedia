export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import NavbarServer from "@/components/ui/NavbarServer";
import FooterServer from "@/components/sections/FooterServer";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";
import type { Block } from "@/components/blocks/BlocksRenderer";
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
        (page.metaTitle as string) || "Bey Digital Media | Dijital Pazarlama Ajansı";
      const description =
        (page.metaDescription as string) ||
        "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.";
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
    title: "Bey Digital Media | Dijital Pazarlama Ajansı",
    description:
      "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Bey Digital Media | Dijital Pazarlama Ajansı",
      description:
        "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
      url: "https://beydigitalmedia.com",
    },
    twitter: {
      title: "Bey Digital Media | Dijital Pazarlama Ajansı",
      description:
        "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
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

  const blocks = (page?.content || []) as unknown as Block[];
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  return (
    <>
      <NavbarServer />
      <main>
        {hasBlocks ? (
          <BlocksRenderer blocks={blocks} />
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-paper text-ink">
            <div className="text-center px-4">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Bu sayfa henüz hazırlanmadı
              </h1>
              <p className="text-lg text-pencil mb-8 max-w-lg mx-auto">
                Yönetim panelinden &quot;home&quot; sayfasını oluşturarak tüm
                bölümleri yönetebilirsiniz.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-[3px] font-semibold hover:bg-kase transition-colors"
              >
                Yönetim Paneline Git
              </Link>
            </div>
          </div>
        )}
      </main>
      <FooterServer />
    </>
  );
}

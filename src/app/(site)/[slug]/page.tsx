import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageContent from "@/components/sections/ServicePageContent";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";
import type { Block } from "@/components/blocks/BlocksRenderer";
import { ServiceJsonLd, BreadcrumbListJsonLd } from "@/components/SEO/JsonLd";
import { getPayloadClient } from "@/lib/payload";
import { lexicalToHtml } from "@/lib/lexicalToHtml";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { ServiceData } from "@/lib/services-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      limit: 100,
    });
    return result.docs.map((doc) => ({ slug: doc.slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const service = result.docs[0];
    if (service) {
      const title =
        (service.metaTitle as string) || (service.title as string);
      const description = service.metaDescription as string;
      return mergeMetadata(defaultSeoFields, {
        title,
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: {
          title,
          description,
          url: `https://beydigitalmedia.com/${slug}`,
        },
        twitter: { title, description },
      });
    }
  } catch {
    // fallback to pages
  }

  // Fallback: pages koleksiyonunda ara
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const page = result.docs[0];
    if (page) {
      const title =
        (page.metaTitle as string) || (page.title as string) || slug;
      const description = page.metaDescription as string;
      return mergeMetadata(defaultSeoFields, {
        title,
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: {
          title,
          description,
          url: `https://beydigitalmedia.com/${slug}`,
        },
        twitter: { title, description },
      });
    }
  } catch {
    // fallback
  }

  return { title: "Sayfa Bulunamadı | Bey Digital Media" };
}

function mapPayloadServiceToServiceData(doc: Record<string, unknown>): ServiceData {
  const longDescriptionRaw = doc.longDescription;
  let longDescriptionHtml = "";
  if (longDescriptionRaw && typeof longDescriptionRaw === "object" && "root" in longDescriptionRaw) {
    longDescriptionHtml = lexicalToHtml(longDescriptionRaw);
  }

  return {
    slug: (doc.slug as string) || "",
    title: (doc.title as string) || "",
    subtitle: (doc.subtitle as string) || "",
    description: (doc.description as string) || "",
    longDescription: longDescriptionHtml ? [longDescriptionHtml] : [""],
    longDescriptionHtml,
    features:
      ((doc.features as Array<{ title: string; description: string }>) || []).map(
        (f) => ({
          title: f.title,
          description: f.description,
        })
      ) || [],
    process:
      ((doc.process as Array<{ step: number; title: string; description: string }>) || []).map(
        (p) => ({
          step: Number(p.step),
          title: p.title,
          description: p.description,
        })
      ) || [],
    accentColor: (doc.accentColor as string) || "#0040ff",
    metaTitle: (doc.metaTitle as string) || "",
    metaDescription: (doc.metaDescription as string) || "",
  };
}

async function findServiceDoc(slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

async function findPageDoc(slug: string) {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  // Once services koleksiyonunda dene
  const serviceDoc = await findServiceDoc(slug);
  if (serviceDoc) {
    const service = mapPayloadServiceToServiceData(
      serviceDoc as unknown as Record<string, unknown>,
    );
    return (
      <>
        <Navbar />
        <ServiceJsonLd
          name={service.title}
          url={`https://beydigitalmedia.com/${service.slug}`}
          description={service.description || service.metaDescription}
          provider={{
            name: "Bey Digital Media",
            url: "https://beydigitalmedia.com",
          }}
        />
        <BreadcrumbListJsonLd
          items={[
            { name: "Ana Sayfa", url: "https://beydigitalmedia.com" },
            {
              name: service.title,
              url: `https://beydigitalmedia.com/${service.slug}`,
            },
          ]}
        />
        <ServicePageContent service={service} />
        <Footer />
      </>
    );
  }

  // pages koleksiyonunda dene
  const pageDoc = await findPageDoc(slug);
  if (pageDoc) {
    const blocks = (pageDoc.content || []) as unknown as Block[];
    return (
      <>
        <Navbar />
        <main>
          {Array.isArray(blocks) && blocks.length > 0 ? (
            <BlocksRenderer blocks={blocks} />
          ) : (
            <div className="min-h-screen flex items-center justify-center bg-[#181825] text-[#cdd6f4]">
              <div className="text-center px-4">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  {(pageDoc.title as string) || slug}
                </h1>
                <p className="text-lg text-[#cdd6f4]/80">
                  Bu sayfada henüz içerik bulunmuyor.
                </p>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </>
    );
  }

  notFound();
}

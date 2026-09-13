import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageContent from "@/components/sections/ServicePageContent";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";
import type { Block } from "@/components/blocks/BlocksRenderer";
import { ServiceJsonLd, BreadcrumbListJsonLd } from "@/components/SEO/JsonLd";
import { getPage, getService } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { ServiceData } from "@/lib/services-data";
import type { Service } from "@/types/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const service = await getService(slug);
    if (service) {
      const title = service.metaTitle || service.title;
      const description = service.metaDescription;
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

  // Fallback: pages tablosunda ara
  try {
    const page = await getPage(slug);
    if (page) {
      const title = page.metaTitle || page.title || slug;
      const description = page.metaDescription ?? undefined;
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

function mapServiceToServiceData(doc: Service): ServiceData {
  const paragraphs = doc.longDescription
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: doc.slug || "",
    title: doc.title || "",
    subtitle: doc.subtitle || "",
    description: doc.description || "",
    longDescription: paragraphs.length > 0 ? paragraphs : [""],
    features: (doc.features || []).map((f) => ({
      title: f.title,
      description: f.description,
    })),
    process: (doc.process || []).map((p) => ({
      step: Number(p.step),
      title: p.title,
      description: p.description,
    })),
    accentColor: doc.accentColor || "#0040ff",
    metaTitle: doc.metaTitle || "",
    metaDescription: doc.metaDescription || "",
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  // Once services tablosunda dene
  const serviceDoc = await getService(slug);
  if (serviceDoc) {
    const service = mapServiceToServiceData(serviceDoc);
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

  // pages tablosunda dene
  const pageDoc = await getPage(slug);
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
                  {pageDoc.title || slug}
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

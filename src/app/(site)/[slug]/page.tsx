import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ServicePageContent from "@/components/sections/ServicePageContent";
import { getPayloadClient } from "@/lib/payload";
import { lexicalToHtml } from "@/lib/lexicalToHtml";
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
    if (!service) {
      return { title: "Sayfa Bulunamadı | Bey Digital Media" };
    }
    return {
      title: (service.metaTitle as string) || service.title,
      description: service.metaDescription as string,
      alternates: {
        canonical: `/${slug}`,
      },
    };
  } catch {
    return { title: "Sayfa Bulunamadı | Bey Digital Media" };
  }
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  let service: ServiceData | null = null;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const doc = result.docs[0];
    if (doc) {
      service = mapPayloadServiceToServiceData(doc);
    }
  } catch {
    service = null;
  }

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ServicePageContent service={service} />
      <Footer />
    </>
  );
}

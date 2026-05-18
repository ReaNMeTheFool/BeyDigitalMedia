import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPayloadClient } from "@/lib/payload";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
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
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const project = result.docs[0];
    if (!project) {
      return mergeMetadata(defaultSeoFields, {
        title: "Proje Bulunamadi | Bey Digital Media",
      });
    }
    return mergeMetadata(defaultSeoFields, {
      title: `${project.title} | Bey Digital Media`,
      description: `${project.title} - ${project.category} projesi. ${project.results}`,
      alternates: {
        canonical: `/portfolyo/${slug}`,
      },
      openGraph: {
        title: `${project.title} | Bey Digital Media`,
        description: `${project.title} - ${project.category} projesi. ${project.results}`,
        url: `https://beydigitalmedia.com/portfolyo/${slug}`,
      },
    });
  } catch {
    return mergeMetadata(defaultSeoFields, {
      title: "Proje Detayi | Bey Digital Media",
    });
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Record<string, unknown> | null = null;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    project = result.docs[0] || null;
  } catch {
    project = null;
  }

  if (!project) notFound();

  const title = (project.title as string) || "";
  const category = (project.category as string) || "";
  const services = (project.services as { label: string; slug: string }[]) || [];
  const color = (project.color as string) || "from-blue-500 to-cyan-500";
  const results = (project.results as string) || "";
  const resultsColor = (project.resultsColor as string) || "#fefefe";
  const logo = (project.logo as { url?: string })?.url || "";

  const displayServices = services.map((s) => s.label);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#181825] pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#portfolio"
            className="text-[#0040ff] text-sm font-medium mb-8 inline-block hover:underline"
          >
            ← Tum Projeler
          </Link>

          {/* Project Header */}
          <div className="mb-12">
            <span className="bg-[#0040ff]/10 text-[#0040ff] px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
              {title}
            </h1>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {displayServices.map((service) => (
                <span
                  key={service}
                  className="bg-[#1e1e2e] border border-[#2d2d44] text-[#cdd6f4]/70 px-3 py-1 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Project Image - Gradient Card */}
          <div
            className={`relative aspect-video rounded-2xl overflow-hidden mb-12 bg-gradient-to-br ${color}`}
          >
            {logo ? (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full max-w-md aspect-[2/1]">
                  <Image
                    src={logo}
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-lg">{title}</span>
              </div>
            )}
          </div>

          {/* Results Section */}
          {results && (
            <div className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] p-8 mb-12">
              <h2 className="text-xl font-bold text-[#cdd6f4] mb-4">
                Proje Sonuclari
              </h2>
              <div className="flex items-center gap-4">
                <div
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: resultsColor }}
                >
                  {results}
                </div>
              </div>
            </div>
          )}

          {/* Project Description */}
          <div className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] p-8 mb-12">
            <h2 className="text-xl font-bold text-[#cdd6f4] mb-4">
              Proje Detaylari
            </h2>
            <p className="text-[#cdd6f4]/70 leading-relaxed">
              {title} markasina sundugumuz {category.toLowerCase()} hizmeti
              kapsaminda, markanin dijital varligini guclendirmek ve hedef
              kitlesiyle daha etkili bir iletisim kurmasini saglamak icin
              kapsamli bir strateji uyguladik. Proje surecinde{" "}
              {displayServices.slice(0, 3).join(", ")} alanlarinda calistik.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-[#0040ff] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#cdd6f4] mb-4">
              Sizin Icin de Basarili Bir Proje Gelistirelim
            </h2>
            <p className="text-[#cdd6f4]/80 mb-8 max-w-xl mx-auto">
              Markanizin dijital potansiyelini kesfetmek icin bugun bizimle
              iletisime gecin.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-[#ffd76e] text-[#181825] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-[#ffd76e]/25 transition-all duration-300"
            >
              Ucretsiz Teklif Al
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getProject } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { Project } from "@/types/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    if (!project) {
      return mergeMetadata(defaultSeoFields, {
        title: "Proje Bulunamadı | Bey Digital Media",
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
      title: "Proje Detayı | Bey Digital Media",
    });
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  const project: Project | null = await getProject(slug);

  if (!project) notFound();

  const title = project.title;
  const category = project.category;
  const services = project.services || [];
  const color = project.color || "from-blue-500 to-cyan-500";
  const results = project.results;
  const resultsColor = project.resultsColor || "#fefefe";
  const logo = project.logo?.url || "";

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
            ← Tüm Projeler
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
                Proje Sonuçları
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

          {/* CTA */}
          <div className="text-center bg-[#0040ff] rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#cdd6f4] mb-4">
              Sizin İçin de Başarılı Bir Proje Geliştirelim
            </h2>
            <p className="text-[#cdd6f4]/80 mb-8 max-w-xl mx-auto">
              Markanızın dijital potansiyelini keşfetmek için bugün bizimle
              iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-[#ffd76e] text-[#181825] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-[#ffd76e]/25 transition-all duration-300"
            >
              Ücretsiz Teklif Al
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

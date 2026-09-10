import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getProject } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { Project } from "@/types/content";
import SerialStrip from "@/components/document/SerialStrip";
import KaseStamp from "@/components/document/KaseStamp";
import ActionStamp from "@/components/document/ActionStamp";

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

  let project: Project | null = null;
  try {
    project = await getProject(slug);
  } catch {
    project = null;
  }

  if (!project) notFound();

  const title = project.title;
  const category = project.category;
  const services = project.services || [];
  const results = project.results;
  const logo = project.logo?.url || "";

  const displayServices = services.map((s) => s.label);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SerialStrip serial={slug} label="Bitmiş İş Belgesi" />

          {/* Proje basligi */}
          <div className="mt-8 mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
              {category}
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-ink mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {displayServices.map((service) => (
                <span
                  key={service}
                  className="rounded-[3px] border border-ink/40 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Musteri logosu */}
          <div className="rounded-[3px] border border-ink/40 bg-paper-alt shadow-doc overflow-hidden mb-12">
            <div className="relative aspect-video">
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
                  <span className="font-mono text-pencil text-lg uppercase tracking-[0.16em]">{title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sonuc cetveli + dogrulama kasesi */}
          {results && (
            <div className="rounded-[3px] border border-ink/40 bg-paper p-6 sm:p-8 mb-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil border-b border-ink/20 pb-2 mb-6">
                Proje Sonuçları
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <div className="flex items-baseline gap-3 flex-1 min-w-0 w-full">
                  <span className="text-xs sm:text-sm uppercase tracking-[0.12em] text-pencil shrink-0">
                    Sonuç
                  </span>
                  <span aria-hidden="true" className="dots-leader" />
                  <span className="font-mono font-bold text-ink tabular-nums text-lg sm:text-2xl text-right">
                    {results}
                  </span>
                </div>
                <KaseStamp
                  text="BEY DIGITAL MEDIA • PERFORMANS KAYDI •"
                  centerText="✓"
                  subText="DOĞRULANDU"
                  size={140}
                  rotate={9}
                  className="shrink-0 self-center sm:self-auto"
                />
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-[3px] border border-ink/40 bg-paper-alt p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-ink mb-4">
              Sizin İçin de Başarılı Bir Proje Geliştirelim
            </h2>
            <p className="text-pencil mb-8 max-w-xl mx-auto">
              Markanızın dijital potansiyelini keşfetmek için bugün bizimle
              iletişime geçin.
            </p>
            <ActionStamp href="/iletisim" size="lg">
              Ücretsiz Teklif Al
            </ActionStamp>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

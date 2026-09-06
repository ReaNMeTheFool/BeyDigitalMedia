import Link from "next/link";
import {
  CalendarDays,
  Clapperboard,
  Hash,
  TrendingUp,
  BarChart3,
  Users,
  Sparkles,
  Mail,
  Phone,
} from "lucide-react";
import type { ServiceData } from "@/lib/services-data";
import SerialStrip from "@/components/document/SerialStrip";
import PerforationDivider from "@/components/document/PerforationDivider";
import ActionStamp from "@/components/document/ActionStamp";

const contactInfo = {
  email: "info@beydigitalmedia.com",
  phone: "+90 544 376 03 39",
};

const featureIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
  "İçerik Takvimi": CalendarDays,
  "Görsel & Video Üretimi": Clapperboard,
  "Topluluk Yönetimi": Users,
  "Hashtag Stratejisi": Hash,
  "Etkileşim Optimizasyonu": TrendingUp,
  "Aylık Raporlama": BarChart3,
};

function getFeatureIcon(title: string) {
  const Icon = featureIconMap[title] ?? Sparkles;
  return Icon;
}

/* Hizmet föyü: her hizmet resmi bir belge olarak sunulur */
export default function ServicePageContent({
  service,
}: {
  service: ServiceData;
}) {
  return (
    <main className="min-h-screen bg-paper pt-24">
      {/* Foy basligi */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SerialStrip serial={service.slug} label="Hizmet Föyü" />

          <div className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil mb-8 flex-wrap">
            <Link
              href="/"
              className="hover:text-ink transition-colors"
            >
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/#services"
              className="hover:text-ink transition-colors"
            >
              Hizmetler
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink font-bold">{service.title}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink mb-5 leading-tight">
            {service.title}
          </h1>

          <p className="text-pencil text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            {service.subtitle}
          </p>

          <ActionStamp href="/#contact" size="lg">
            Ücretsiz Teklif Alın
          </ActionStamp>
        </div>
      </section>

      {/* Uzun aciklama */}
      <section className="bg-paper-alt">
        <PerforationDivider tone="paper" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            {service.longDescriptionHtml ? (
              <div
                className="text-pencil text-lg leading-relaxed space-y-5 [&_p]:text-pencil [&_p]:text-lg [&_p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.longDescriptionHtml }}
              />
            ) : (
              service.longDescription.map((para, i) => (
                <p
                  key={i}
                  className="text-pencil text-lg leading-relaxed mb-5 last:mb-0"
                >
                  {para}
                </p>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Kapsam: ne sunuyoruz */}
      <section className="bg-paper">
        <PerforationDivider tone="paper-alt" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink mb-10">
            Ne Sunuyoruz?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.features.map((feature) => {
              const Icon = getFeatureIcon(feature.title);
              return (
                <div
                  key={feature.title}
                  className="rounded-[3px] border border-ink/30 bg-paper p-5 transition-shadow duration-200 hover:shadow-doc"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-[3px] bg-ink flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-paper" />
                    </div>
                    <h3 className="text-ink font-bold text-[15px] sm:text-base leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-pencil text-[15px] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Surec: numarali cetvel satirlari */}
      <section className="bg-paper-alt">
        <PerforationDivider tone="paper" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink mb-3">
            Nasıl Çalışıyoruz?
          </h2>
          <p className="text-pencil mb-10">
            Şeffaf ve sistematik çalışma sürecimiz
          </p>

          <div className="border-y border-ink/40">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 py-4 border-b border-dashed border-ink/25 last:border-b-0"
              >
                <span className="font-mono text-sm font-bold text-kase shrink-0 w-8 pt-0.5 tabular-nums">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-ink font-bold text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-pencil text-[15px] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper">
        <PerforationDivider tone="paper-alt" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-ink mb-4">
            {service.title} için Hazır mısınız?
          </h2>
          <p className="text-pencil text-lg mb-10 max-w-3xl mx-auto">
            Ücretsiz danışmanlık için hemen iletişime geçin. Size özel
            çözümler geliştirmek için buradayız.
          </p>
          <ActionStamp href="/#contact" size="lg">
            İletişime Geç
          </ActionStamp>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-10 font-mono text-xs sm:text-sm">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 text-pencil hover:text-ink transition-colors"
            >
              <Mail size={14} aria-hidden="true" />
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-pencil hover:text-ink transition-colors"
            >
              <Phone size={14} aria-hidden="true" />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

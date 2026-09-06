"use client";

import { iconMap } from "@/lib/icon-map";
import PerforationDivider from "@/components/document/PerforationDivider";

const defaultReasons = [
  {
    icon: "TrendingUp",
    title: "Sonuç Odaklı Yaklaşım",
    description: "Her projede ölçülebilir KPI'lar belirliyor ve düzenli raporlarla ilerlemeyi takip ediyoruz.",
  },
  {
    icon: "Clock",
    title: "7/24 Destek",
    description: "Müşterilerimize haftanın her günü, günün her saati destek sağlıyoruz.",
  },
  {
    icon: "Users",
    title: "Deneyimli Ekip",
    description: "8+ yıllık sektör deneyimiyle uzman kadromuz hizmetinizde.",
  },
  {
    icon: "Award",
    title: "Profesyonel İş Ahlakı",
    description: "Şeffaf iletişim, dürüst fiyatlandırma ve zamanında teslimat ilkelerimizdir.",
  },
  {
    icon: "Zap",
    title: "Hızlı Dönüş",
    description: "Taleplerinize en hızlı şekilde yanıt veriyor ve aksiyon alıyoruz.",
  },
  {
    icon: "CheckCircle2",
    title: "Özelleştirilmiş Stratejiler",
    description: "Her marka farklıdır. Size özel, kişiselleştirilmiş çözümler sunuyoruz.",
  },
];

export default function WhyUs({
  title = 'Farkımız <span class="text-[#0040ff]">Ne?</span>',
  subtitle = "Bey Digital Media olarak sadece bir ajans değil, dijital büyüme ortağınız olmayı hedefliyoruz.",
  reasons: propReasons,
}: {
  title?: string;
  subtitle?: string;
  reasons?: { icon: string; title: string; description: string }[];
}) {
  const activeReasons = propReasons && propReasons.length > 0 ? propReasons : defaultReasons;
  return (
    <section id="why-us" className="relative py-20 bg-paper overflow-hidden">
      <PerforationDivider tone="paper-alt" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Bolum basligi */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Beyan / Neden Biz
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-pencil text-lg max-w-3xl">{subtitle}</p>
        </div>

        {/* Beyan cetvelleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeReasons.map((reason) => (
            <div
              key={reason.title}
              className="group p-5 rounded-[3px] border border-ink/30 bg-paper transition-shadow duration-200 hover:shadow-doc"
            >
              <div className="flex items-center gap-4 mb-4 w-full">
                <div className="w-11 h-11 shrink-0 rounded-[3px] bg-ink flex items-center justify-center">
                  {(() => {
                    const IconComponent = iconMap[reason.icon];
                    return IconComponent ? (
                      <IconComponent className="w-5 h-5 text-paper" aria-hidden="true" />
                    ) : null;
                  })()}
                </div>
                <h3 className="flex-1 text-base font-bold text-ink leading-tight">
                  {reason.title}
                </h3>
              </div>
              <p className="text-pencil leading-relaxed text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

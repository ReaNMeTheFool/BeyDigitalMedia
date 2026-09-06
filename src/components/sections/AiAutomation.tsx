"use client";

import { iconMap } from "@/lib/icon-map";
import ActionStamp from "@/components/document/ActionStamp";
import PerforationDivider from "@/components/document/PerforationDivider";

const defaultFeatures = [
  { icon: "Workflow", label: "Süreç Otomasyonu", desc: "Bir kez kurulur, sonsuza kadar çalışır — ekibiniz asıl işine bakar" },
  { icon: "Bot", label: "AI Asistan", desc: "Müşteri taleplerini anlar, yönlendirir ve çözer — sizin yerinize" },
  { icon: "BarChart3", label: "Akıllı Analitik", desc: "Neyin işe yaradığını görün, neyin yaramadığını anlayın" },
  { icon: "MessageSquare", label: "Chatbot", desc: "Ziyaretçiyi müşteriye dönüştüren akıllı sohbet deneyimi" },
  { icon: "Zap", label: "Hız & Verimlilik", desc: "Saatlik işleri dakikaya, günlük işleri saate indirin" },
  { icon: "BrainCircuit", label: "AI Entegrasyonu", desc: "Sistemleriniz değişmez — sadece çok daha akıllı hale gelir" },
];

export default function AiAutomation({
  title = 'Zamanınızı Geri Kazanın, <span class="text-[#8b5cf6]">İşinizi Otomatikleştirin</span>',
  subtitle = "Tekrarlayan işlere değil, büyümeye odaklanın.",
  description = [
    "Başarılı işletmeler zamanlarını tekrarlayan görevlere değil; büyümeye, inovasyona ve müşterilerine ayırıyor. Yapay zeka çözümlerimizle iş akışlarınızı otomatikleştiriyor, operasyonel yükü minimize ediyor ve ekibinizin gerçek değer ürettiği alanlara odaklanmasını sağlıyoruz.",
    "Hazır şablonlar değil — işletmenizin yapısını, süreçlerini ve hedeflerini anlayarak sıfırdan tasarlanmış, gerçekten işe yarayan AI sistemleri kuruyoruz.",
  ],
  features: propFeatures,
  badge = "AI × OTOMASYON",
}: {
  title?: string;
  subtitle?: string;
  description?: string[];
  features?: { icon: string; label: string; desc: string }[];
  badge?: string;
}) {
  const activeFeatures = propFeatures && propFeatures.length > 0 ? propFeatures : defaultFeatures;
  return (
    <section id="ai-otomasyon" className="relative py-20 xl:py-28 bg-paper overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 xl:gap-24 items-center">

          {/* Sol: özellik cetvelleri */}
          <div className="relative">
            <div className="relative rounded-[3px] border border-ink/40 bg-paper-alt p-5 xl:p-7 flex flex-col">
              {/* Baslik etiketi */}
              <div className="flex items-center justify-center gap-2 mb-5 xl:mb-7">
                <span aria-hidden="true" className="dots-leader text-ink" />
                <span className="text-kase font-mono text-xs uppercase tracking-[0.24em] font-bold">
                  {badge}
                </span>
                <span aria-hidden="true" className="dots-leader text-ink" />
              </div>

              {/* Ozellik kayitlari */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-4">
                {activeFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-[3px] border border-ink/25 bg-paper p-4 xl:p-5 transition-shadow duration-200 hover:shadow-doc"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-[3px] bg-ink flex items-center justify-center shrink-0">
                        {(() => {
                          const IconComponent = iconMap[f.icon];
                          return IconComponent ? (
                            <IconComponent className="w-4.5 h-4.5 text-paper" aria-hidden="true" />
                          ) : null;
                        })()}
                      </div>
                      <p className="text-ink text-sm xl:text-base font-bold leading-tight">
                        {f.label}
                      </p>
                    </div>
                    <p className="text-pencil text-xs xl:text-sm leading-snug">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sag: icerik */}
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-4 xl:mb-6 leading-tight break-words hyphens-auto"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <p className="text-pencil text-base xl:text-lg mb-5 xl:mb-7 font-bold">
              {subtitle}
            </p>

            <div className="space-y-4 text-pencil text-base xl:text-lg leading-relaxed mb-8 xl:mb-10">
              {description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ActionStamp variant="ink" href="/ai-otomasyon" size="lg">
              Ayrıntılara Bak
            </ActionStamp>
          </div>
        </div>
      </div>
    </section>
  );
}

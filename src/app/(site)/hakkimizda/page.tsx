import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import SerialStrip from "@/components/document/SerialStrip";
import PerforationDivider from "@/components/document/PerforationDivider";
import ActionStamp from "@/components/document/ActionStamp";
import SignatureLine from "@/components/document/SignatureLine";
import KaseStamp from "@/components/document/KaseStamp";

export async function generateMetadata(): Promise<Metadata> {
  return mergeMetadata(defaultSeoFields, {
    title: "Hakkımızda | Bey Digital Media",
    description:
      "Bey Digital Media, 8 yılı aşkın deneyimiyle markaların dijital dünyada büyümesine yardımcı oluyor. Ekibimizi, misyonumuzu ve vizyonumuzu keşfedin.",
    alternates: {
      canonical: "/hakkimizda",
    },
    openGraph: {
      title: "Hakkımızda | Bey Digital Media",
      description:
        "Bey Digital Media, 8 yılı aşkın deneyimiyle markaların dijital dünyada büyümesine yardımcı oluyor.",
      url: "https://beydigitalmedia.com/hakkimizda",
    },
  });
}

export default function HakkimizdaPage() {
  const stats = [
    { value: "150+", label: "Tamamlanan Proje" },
    { value: "100+", label: "Memnun Müşteri" },
    { value: "8+", label: "Yıllık Deneyim" },
    { value: "%100", label: "Müşteri Memnuniyeti" },
  ];

  const values = [
    {
      title: "Misyonumuz",
      description:
        "Markaların dijital dünyada güçlü bir kimlik kazanmasını sağlamak, renklerin psikolojik etkisini kullanarak akılda kalıcı ve etkili markalar yaratmak.",
    },
    {
      title: "Vizyonumuz",
      description:
        "Türkiye'nin önde gelen dijital pazarlama ajanslarından biri olmak, global standartlarda hizmet vererek markaları uluslararası arenaya taşımak.",
    },
  ];

  const team = [
    {
      name: "Yiğit Emre Balaban",
      role: "Kurucu & Dijital Strateji Direktörü",
      description:
        "8 yılı aşkın dijital pazarlama deneyimiyle markaların büyüme stratejilerini yönlendiriyor.",
    },
    {
      name: "Ekip Arkadaşlarımız",
      role: "Tasarım, İçerik ve Reklam Uzmanları",
      description:
        "Sosyal medya yönetimi, grafik tasarım, içerik üretimi, Meta & Google reklamcılığı ve web geliştirme alanlarında uzman kadromuz.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper">
        {/* Dosyaye basligi */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SerialStrip serial="H-01" label="Kurucu Dosyesi" />
            <div className="mt-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-ink mb-6">
                Dijitalde Büyümenin{" "}
                <span className="text-[#0040ff]">Güvenilir Ortağı</span>
              </h1>
              <p className="text-pencil text-lg md:text-xl max-w-3xl mx-auto">
                Bey Digital Media olarak 8 yılı aşkın süredir markaların dijital
                dünyada büyümesine yardımcı oluyoruz. Renklerin psikolojisinden
                ilham alarak, markaların kimliğini en iyi şekilde yansıtan
                stratejiler geliştiriyoruz.
              </p>
            </div>
          </div>
        </section>

        {/* Sayilar cetveli */}
        <section className="pb-16 bg-paper-alt">
          <PerforationDivider tone="paper" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="border-y border-ink/40">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline gap-3 py-3 px-1 border-b border-dashed border-ink/25 last:border-b-0"
                >
                  <span className="text-xs sm:text-sm uppercase tracking-[0.12em] text-pencil">
                    {stat.label}
                  </span>
                  <span aria-hidden="true" className="dots-leader" />
                  <span className="font-mono font-bold text-ink tabular-nums text-lg sm:text-xl">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Misyon ve vizyon */}
        <section className="py-16 bg-paper">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-[3px] border border-ink/30 bg-paper-alt"
                >
                  <h2 className="text-xl font-bold text-ink mb-4">
                    {item.title}
                  </h2>
                  <p className="text-pencil leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ekip dosyeleri */}
        <section className="py-16 bg-paper-alt">
          <PerforationDivider tone="paper" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-ink text-center mb-4">
              Ekibimiz
            </h2>
            <p className="text-pencil text-center mb-12 max-w-xl mx-auto">
              Markanızı bir sonraki seviyeye taşımak için tutkulu ve deneyimli
              bir ekiple çalışıyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-8 rounded-[3px] border border-ink/30 bg-paper transition-shadow duration-200 hover:shadow-doc"
                >
                  <div className="w-14 h-14 rounded-[3px] bg-ink flex items-center justify-center mb-4">
                    <span className="text-paper text-xl font-black">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-1">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-kase font-bold mb-3">
                    {member.role}
                  </p>
                  <p className="text-pencil text-sm leading-relaxed mb-6">
                    {member.description}
                  </p>
                  {member.name === "Yiğit Emre Balaban" && (
                    <SignatureLine name={member.name} caption="İmza" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper">
          <PerforationDivider tone="paper-alt" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative">
            <div className="flex justify-center mb-6">
              <KaseStamp
                text="BEY DIGITAL MEDIA • DİJİTAL PAZARLAMA AJANSI •"
                centerText="BDM"
                subText="TÜRKİYE"
                size={150}
                rotate={-8}
              />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-ink mb-4">
              Siz de Büyüme Yolculuğuna Katılın
            </h2>
            <p className="text-pencil text-lg mb-8 max-w-2xl mx-auto">
              Markanızı bir üst seviyeye taşımak için bugün bizimle iletişime geçin.
            </p>
            <ActionStamp href="/iletisim" size="lg">
              İletişime Geç
            </ActionStamp>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

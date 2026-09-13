import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";

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
      color: "from-[#0040ff] to-[#0033cc]",
    },
    {
      title: "Vizyonumuz",
      description:
        "Türkiye'nin önde gelen dijital pazarlama ajanslarından biri olmak, global standartlarda hizmet vererek markaları uluslararası arenaya taşımak.",
      color: "from-[#ffd76e] to-[#f9a825]",
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
      <main className="min-h-screen bg-[#181825]">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-20 bg-[#1e1e2e] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0040ff]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ffd76e]/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#cdd6f4] mb-6">
              Dijitalde Büyümenin{" "}
              <span className="text-[#0040ff]">Güvenilir Ortağı</span>
            </h1>
            <p className="text-[#cdd6f4]/80 text-lg md:text-xl max-w-3xl mx-auto">
              Bey Digital Media olarak 8 yılı aşkın süredir markaların dijital
              dünyada büyümesine yardımcı oluyoruz. Renklerin psikolojisinden
              ilham alarak, markaların kimliğini en iyi şekilde yansıtan
              stratejiler geliştiriyoruz.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#181825]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-[#1e1e2e] border border-[#2d2d44]"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#0040ff] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#cdd6f4]/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-[#1e1e2e]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((item) => (
                <div
                  key={item.title}
                  className="relative p-8 rounded-2xl bg-[#181825] border border-[#2d2d44] overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                  />
                  <h2 className="text-2xl font-bold text-[#cdd6f4] mb-4">
                    {item.title}
                  </h2>
                  <p className="text-[#cdd6f4]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-[#181825]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#cdd6f4] text-center mb-4">
              Ekibimiz
            </h2>
            <p className="text-[#cdd6f4]/60 text-center mb-12 max-w-xl mx-auto">
              Markanızı bir sonraki seviyeye taşımak için tutkulu ve deneyimli
              bir ekiple çalışıyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-8 rounded-2xl bg-[#1e1e2e] border border-[#2d2d44] hover:border-[#0040ff]/30 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0040ff] to-[#0033cc] flex items-center justify-center mb-4">
                    <span className="text-[#cdd6f4] text-xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#cdd6f4] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#0040ff] text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-[#cdd6f4]/60 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-[#0040ff]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#cdd6f4] mb-4">
              Siz de Büyüme Yolculuğuna Katılın
            </h2>
            <p className="text-[#cdd6f4]/80 text-lg mb-8 max-w-2xl mx-auto">
              Markanızı bir üst seviyeye taşımak için bugün bizimle iletişime geçin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-[#ffd76e] text-[#181825] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-lg hover:shadow-[#ffd76e]/25 transition-all duration-300"
            >
              İletişime Geç
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

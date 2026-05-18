import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/ui/ContactForm";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return mergeMetadata(defaultSeoFields, {
    title: "Iletisim | Bey Digital Media",
    description:
      "Bey Digital Media ile iletisime gecin. Ucretsiz analiz ve teklif icin hemen bize ulasin. Telefon, e-posta ve adres bilgilerimiz bu sayfada.",
    alternates: {
      canonical: "/iletisim",
    },
    openGraph: {
      title: "Iletisim | Bey Digital Media",
      description:
        "Bey Digital Media ile iletisime gecin. Ucretsiz analiz ve teklif icin hemen bize ulasin.",
      url: "https://beydigitalmedia.com/iletisim",
    },
  });
}

export default function IletisimPage() {
  const contactInfo = [
    {
      label: "Telefon",
      value: "+90 501 392 70 88",
      href: "tel:+905013927088",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "E-posta",
      value: "Beydigitalmedia@gmail.com",
      href: "mailto:Beydigitalmedia@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
    {
      label: "Adres",
      value: "Turkiye",
      href: "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
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
              Bizimle <span className="text-[#0040ff]">Iletisime</span> Gecin
            </h1>
            <p className="text-[#cdd6f4]/80 text-lg md:text-xl max-w-3xl mx-auto">
              Markaniz icin ucretsiz analiz ve teklif almak, sorularinizi sormak
              veya isbirligi detaylarini konusmak icin bize ulasin.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 bg-[#181825]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] p-8">
                  <h2 className="text-2xl font-bold text-[#cdd6f4] mb-2">
                    Mesaj Gonder
                  </h2>
                  <p className="text-[#cdd6f4]/60 mb-8">
                    Projeniz hakkinda bilgi verin, en kisa surede donus yapalim.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] p-8">
                  <h3 className="text-xl font-bold text-[#cdd6f4] mb-6">
                    Iletisim Bilgileri
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-start gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0040ff]/10 flex items-center justify-center text-[#0040ff] shrink-0 group-hover:bg-[#0040ff] group-hover:text-[#cdd6f4] transition-all">
                          {info.icon}
                        </div>
                        <div>
                          <div className="text-[#cdd6f4]/50 text-xs uppercase tracking-wider mb-0.5">
                            {info.label}
                          </div>
                          <div className="text-[#cdd6f4] font-medium group-hover:text-[#0040ff] transition-colors">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Google Maps Placeholder */}
                <div className="bg-[#1e1e2e] rounded-2xl border border-[#2d2d44] overflow-hidden">
                  <div className="aspect-video bg-[#2d2d44]/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#cdd6f4]/30 mx-auto mb-3"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className="text-[#cdd6f4]/40 text-sm">
                        Google Maps konum bilgisi
                      </p>
                      <p className="text-[#cdd6f4]/20 text-xs mt-1">
                        Turkiye
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Proof Card */}
                <div className="bg-gradient-to-br from-[#0040ff]/10 to-[#ffd76e]/5 rounded-2xl border border-[#2d2d44] p-8">
                  <h3 className="text-lg font-bold text-[#cdd6f4] mb-4">
                    Neden Bizi Secmelisiniz?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Ucretsiz ilk analiz ve danismanlik",
                      "Size ozel strateji ve fiyatlandirma",
                      "150+ basarili proje deneyimi",
                      "7/24 iletisim ve destek",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[#cdd6f4]/70 text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#0040ff] shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

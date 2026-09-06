import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ContactForm from "@/components/ui/ContactForm";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import SerialStrip from "@/components/document/SerialStrip";

export async function generateMetadata(): Promise<Metadata> {
  return mergeMetadata(defaultSeoFields, {
    title: "İletişim | Bey Digital Media",
    description:
      "Bey Digital Media ile iletişime geçin. Ücretsiz analiz ve teklif için hemen bize ulaşın. Telefon, e-posta ve adres bilgilerimiz bu sayfada.",
    alternates: {
      canonical: "/iletisim",
    },
    openGraph: {
      title: "İletişim | Bey Digital Media",
      description:
        "Bey Digital Media ile iletişime geçin. Ücretsiz analiz ve teklif için hemen bize ulaşın.",
      url: "https://beydigitalmedia.com/iletisim",
    },
  });
}

export default function IletisimPage() {
  const contactInfo: {
    label: string;
    value: string;
    href?: string;
    icon: React.ReactNode;
  }[] = [
    {
      label: "Telefon",
      value: "+90 544 376 03 39",
      href: "tel:+905443760339",
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
      value: "info@beydigitalmedia.com",
      href: "mailto:info@beydigitalmedia.com",
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
      value: "Türkiye",
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
      <main className="min-h-screen bg-paper">
        {/* Belge basligi */}
        <section className="pt-24 pb-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SerialStrip serial="I-01" label="Teklif Talebi" />
            <div className="mt-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-ink mb-6">
                Bizimle <span className="text-[#0040ff]">İletişime</span> Geçin
              </h1>
              <p className="text-pencil text-lg md:text-xl max-w-3xl mx-auto">
                Markanız için ücretsiz analiz ve teklif almak, sorularınızı sormak
                veya iş birliği detaylarını konuşmak için bize ulaşın.
              </p>
            </div>
          </div>
        </section>

        {/* Form belgesi */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
              {/* Teklif formu */}
              <div className="lg:col-span-3">
                <div className="rounded-[3px] border border-ink/40 bg-paper shadow-doc p-6 sm:p-8">
                  <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-pencil mb-6">
                    <span>Teklif Formu</span>
                    <span aria-hidden="true" className="dots-leader" />
                    <span>BDM-{new Date().getFullYear()}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-ink mb-2">
                    Mesaj Gönder
                  </h2>
                  <p className="text-pencil mb-8">
                    Projeniz hakkında bilgi verin, en kısa sürede dönüş yapalım.
                  </p>
                  <ContactForm />
                </div>
              </div>

              {/* Iletisim kayitlari */}
              <div className="lg:col-span-2 space-y-5">
                <div className="rounded-[3px] border border-ink/30 bg-paper-alt p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-ink mb-6">
                    İletişim Bilgileri
                  </h3>
                  <div className="space-y-6">
                    {contactInfo.map((info) => {
                      const inner = (
                        <>
                          <div className="w-10 h-10 rounded-[3px] bg-ink flex items-center justify-center text-paper shrink-0">
                            {info.icon}
                          </div>
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pencil mb-0.5">
                              {info.label}
                            </div>
                            <div className="text-ink font-bold">
                              {info.value}
                            </div>
                          </div>
                        </>
                      );
                      return info.href ? (
                        <a
                          key={info.label}
                          href={info.href}
                          className="flex items-start gap-4 group"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          key={info.label}
                          className="flex items-start gap-4 group"
                        >
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Neden bizi secmelisiniz */}
                <div className="rounded-[3px] border border-ink/30 bg-paper p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-ink mb-4">
                    Neden Bizi Seçmelisiniz?
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Ücretsiz ilk analiz ve danışmanlık",
                      "Size özel strateji ve fiyatlandırma",
                      "150+ başarılı proje deneyimi",
                      "7/24 iletişim ve destek",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-pencil text-sm"
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
                          className="text-kase shrink-0"
                          aria-hidden="true"
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

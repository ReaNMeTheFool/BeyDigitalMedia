"use client";

import { Home, ArrowLeft, Search } from "lucide-react";
import SerialStrip from "@/components/document/SerialStrip";
import ActionStamp from "@/components/document/ActionStamp";

/* 404 belgesi: "Kayit bulunamadi" kaydi */
export default function NotFoundDocument() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-24">
      <div className="max-w-2xl w-full">
        <div className="rounded-[3px] border border-ink/40 bg-paper shadow-doc p-8 sm:p-12">
          <SerialStrip serial="404" label="Bulunamadı" />

          <div className="mt-10 mb-8 flex items-center justify-center gap-6">
            <span
              className="font-mono text-[96px] sm:text-[140px] font-bold leading-none text-ink/10 select-none"
              aria-hidden="true"
            >
              404
            </span>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] border border-ink/40 bg-paper-alt flex items-center justify-center shrink-0">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-pencil" aria-hidden="true" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink mb-4">
              Kayıt Bulunamadı
            </h1>
            <p className="text-pencil text-lg mb-8 max-w-md mx-auto">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış
              olabilir. Ana sayfaya dönebilir veya başka bir sayfa arayabilirsiniz.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ActionStamp
                variant="ink"
                size="md"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Geri Dön</span>
              </ActionStamp>
              <ActionStamp href="/" size="md">
                <Home size={16} aria-hidden="true" />
                <span>Ana Sayfa</span>
              </ActionStamp>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-dashed border-ink/30">
            <p className="text-pencil mb-4 text-sm">Yardımcı olabilecek sayfalar:</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {[
                { name: "Hizmetler", href: "/#services" },
                { name: "Portfolyo", href: "/#portfolio" },
                { name: "Hakkımızda", href: "/#about" },
                { name: "Blog", href: "/blog" },
                { name: "İletişim", href: "/#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-kase hover:underline underline-offset-4"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

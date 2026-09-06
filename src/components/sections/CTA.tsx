"use client";

import { sanitizeHtml } from "@/lib/sanitize-html";
import ActionStamp from "@/components/document/ActionStamp";
import PerforationDivider from "@/components/document/PerforationDivider";
import LedgerRow from "@/components/document/LedgerRow";

export default function CTA({
  title = 'Dijital <span class="text-[#ffd76e]">Büyüme</span> Yolculuğuna Bugün Başlayın',
  subtitle = 'Dijitalde büyümek için ilk adımı atın. Uzman ekibimizle ücretsiz analiz ve teklif için hemen iletişime geçin.',
  ctaText = 'Ücretsiz Teklif Al',
  ctaLink = '#contact',
  contactPhone,
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  contactPhone?: string;
}) {
  return (
    <section className="bg-paper-alt relative overflow-hidden">
      <PerforationDivider tone="paper" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Seri satiri */}
          <div className="flex items-center justify-center gap-2 mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-pencil">
            <span className="h-1.5 w-1.5 rounded-full bg-kase" aria-hidden="true" />
            <span>Ücretsiz Analiz - Hemen Başlayın</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}
          />
          <p className="text-pencil text-lg md:text-xl max-w-3xl mx-auto mb-10">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ActionStamp href={ctaLink} size="lg">
              {ctaText}
            </ActionStamp>
            {contactPhone && (
              <ActionStamp
                variant="ink"
                size="lg"
                href={`tel:${contactPhone.replace(/\s/g, "")}`}
              >
                Hemen Ara
              </ActionStamp>
            )}
          </div>

          {/* Cetvel: guven satirlari */}
          <div className="max-w-2xl mx-auto mt-12 border-y border-ink/40 text-left">
            <LedgerRow label="Tamamlanan Proje" value="150+" className="py-3 px-1 border-b border-dashed border-ink/25" />
            <LedgerRow label="Memnun Müşteri" value="100+" className="py-3 px-1 border-b border-dashed border-ink/25" />
            <LedgerRow label="Yıllık Deneyim" value="8+" className="py-3 px-1 border-b border-dashed border-ink/25" />
            <LedgerRow label="Müşteri Memnuniyeti" value="%100" className="py-3 px-1" />
          </div>
        </div>
      </div>
    </section>
  );
}

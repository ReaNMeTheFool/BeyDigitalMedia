"use client";

const defaultItems = [
  "Sosyal Medya Yönetimi",
  "Meta Ads",
  "Google Ads",
  "Web Tasarım",
  "SEO",
  "Logo Tasarımı",
  "Kurumsal Kimlik",
  "Dijital Büyüme",
];

export default function Marquee({ items }: { items?: string[] }) {
  const displayItems = items?.length ? items : defaultItems;
  return (
    <section className="py-5 bg-paper-alt border-y border-ink/20 overflow-hidden">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...displayItems, ...displayItems].map((item, index) => (
            <div key={index} className="flex items-center shrink-0" aria-hidden={index >= displayItems.length}>
              <span className="font-mono uppercase tracking-[0.16em] text-ink/80 text-xs sm:text-sm px-5 sm:px-8">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-ink/50" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="py-8 bg-[#313244] overflow-hidden">
      <div className="relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...displayItems, ...displayItems].map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="text-[#cdd6f4]/90 text-base sm:text-lg font-medium px-4 sm:px-8">
                {item}
              </span>
              <span className="text-[#ffd76e] text-2xl shrink-0">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

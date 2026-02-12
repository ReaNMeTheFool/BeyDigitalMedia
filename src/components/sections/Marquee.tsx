"use client";

const items = [
  "Sosyal Medya Yönetimi",
  "Meta Ads",
  "Google Ads",
  "Web Tasarım",
  "SEO",
  "Logo Tasarımı",
  "Kurumsal Kimlik",
  "Dijital Büyüme",
];

export default function Marquee() {
  return (
    <section className="py-8 bg-[#0033aa] overflow-hidden">
      <div className="relative">
        <div
          className="flex whitespace-nowrap animate-marquee"
        >
          {/* Double the items for seamless loop */}
          {[...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center shrink-0">
              <span className="text-[#cdd6f4]/90 text-lg font-medium px-8 sm:px-16">
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

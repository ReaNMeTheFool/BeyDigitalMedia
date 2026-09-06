"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";

interface Badge {
  name: string;
  icon?: string;
}

const LinkedinIcon = ({ className }: { className?: string }) => (
  <Linkedin className={className} size={40} strokeWidth={1.5} />
);

const defaultBadges: (Badge | { name: string; iconComponent: typeof LinkedinIcon })[] = [
  { name: "Meta", icon: "/media/meta_logo_icon_214665.png" },
  { name: "Google Ads", icon: "/media/google-ads-transparent.png" },
  { name: "LinkedIn", iconComponent: LinkedinIcon },
  { name: "Instagram & Facebook", icon: "/media/instaxfacebook.png" },
];

export default function PartnerBadges({
  title = "Birlikte Çalıştığımız Platformlar",
  badges = defaultBadges,
}: {
  title?: string;
  badges?: (Badge | { name: string; iconComponent: typeof LinkedinIcon })[];
}) {
  return (
    <section className="relative py-16 bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Baslik */}
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Ek Belge / Platformlar
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-ink mb-4">
            {title}
          </h2>
          <p className="text-pencil text-lg max-w-xl mx-auto">
            Markanızın dijital büyümesi için en güçlü platformlarla çalışıyoruz.
          </p>
        </div>

        {/* Platform kayitlari */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-[3px] border border-ink/25 bg-paper-alt"
            >
              <div className="h-10 flex items-center justify-center">
                {"iconComponent" in badge ? (
                  <badge.iconComponent className="text-ink" />
                ) : badge.icon ? (
                  <Image
                    src={badge.icon}
                    alt={badge.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                ) : null}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pencil text-center">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

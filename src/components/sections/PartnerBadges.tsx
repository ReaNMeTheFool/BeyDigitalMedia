"use client";

import { motion } from "framer-motion";
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
    <section className="relative py-20 bg-[#1e1e2e] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0040ff]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#cdd6f4] mb-4">
            {title}
          </h2>
          <p className="text-[#cdd6f4]/60 text-lg max-w-xl mx-auto">
            Markanızın dijital büyümesi için en güçlü platformlarla çalışıyoruz.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[#181825] border border-[#2d2d44] hover:border-[#0040ff]/30 hover:shadow-[0_0_30px_rgba(0,64,255,0.1)] transition-all duration-300"
            >
              <div className="h-10 flex items-center justify-center">
                {"iconComponent" in badge ? (
                  <badge.iconComponent className="text-[#cdd6f4]/80" />
                ) : badge.icon ? (
                  <Image
                    src={badge.icon}
                    alt={badge.name}
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : null}
              </div>
              <span className="text-[#cdd6f4]/50 text-xs font-medium text-center">
                {badge.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

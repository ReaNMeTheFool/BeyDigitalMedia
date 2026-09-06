"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { defaultServices, type Service } from "@/lib/defaultServices";
import { iconMap } from "@/lib/icon-map";
import PerforationDivider from "@/components/document/PerforationDivider";

export default function Services({
  sectionTitle,
  showAll = true,
  selectedSlugs,
  services: propServices,
}: {
  sectionTitle?: string;
  showAll?: boolean;
  selectedSlugs?: string[];
  services?: Service[];
}) {
  const sourceServices = propServices || defaultServices;
  const displayedServices = showAll
    ? sourceServices
    : sourceServices.filter((s) => selectedSlugs?.includes(s.link.replace(/^\//, "")));
  return (
    <section id="services" className="relative py-20 bg-paper overflow-hidden">
      <PerforationDivider tone="paper-alt" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Bolum basligi */}
        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pencil mb-4">
            Fihrist / Hizmetler
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink mb-5">
            {sectionTitle || (
              <>
                Dijital <span className="text-kase">Büyüme</span> Çözümleri
              </>
            )}
          </h2>
          <p className="text-pencil text-lg max-w-3xl">
            Markanızı dijital dünyada büyütmek için ihtiyacınız olan tüm hizmetler tek çatı altında.
          </p>
        </div>

        {/* Hizmet cetvelleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayedServices.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col h-full rounded-[3px] border border-ink/30 bg-paper p-5 transition-shadow duration-200 hover:shadow-doc"
            >
              {/* Seri satiri */}
              <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-pencil mb-4">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="dots-leader" />
                <span>Hizmet</span>
              </div>

              {/* Ikon plakasi: murekkep zemin */}
              <div className="relative w-12 h-12 rounded-[3px] bg-ink mb-5 overflow-hidden shrink-0">
                {service.imageSrc ? (
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                    style={service.imageStyle}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {service.icon ? (
                      (() => {
                        const IconComponent = iconMap[service.icon];
                        return IconComponent ? (
                          <IconComponent className="w-6 h-6 text-paper" aria-hidden="true" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-paper/40" aria-hidden="true" />
                        );
                      })()
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-paper/40" aria-hidden="true" />
                    )}
                  </div>
                )}
              </div>

              {/* Icerik */}
              <h3 className="text-lg font-bold text-ink mb-2.5">{service.title}</h3>
              <p className="text-pencil text-sm leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Link */}
              <Link
                href={service.link}
                className="group/link mt-5 pt-3 border-t border-dashed border-ink/30 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink hover:text-kase transition-colors"
              >
                <span>Detaylı Bilgi</span>
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

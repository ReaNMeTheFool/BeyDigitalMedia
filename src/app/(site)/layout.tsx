import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { OrganizationJsonLd } from "@/components/SEO/JsonLd";
import { WebSiteJsonLd } from "@/components/SEO/JsonLd";
import { getPayloadClient } from "@/lib/payload";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { SiteSetting } from "@/payload-types";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const viewport: Viewport = {
  themeColor: "#181825",
};

export async function generateMetadata(): Promise<Metadata> {
  let siteSettings: Partial<SiteSetting> = {};

  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({ slug: "siteSettings" });
  } catch {
    siteSettings = {};
  }

  const siteName = (siteSettings.siteName as string) || "Bey Digital Media";
  const tagline =
    (siteSettings.tagline as string) || "Dijital Pazarlama Ajansı";
  const description =
    (siteSettings.defaultMetaDescription as string) ||
    "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.";
  const title =
    (siteSettings.defaultMetaTitle as string) || `${siteName} | ${tagline}`;

  const verification: Record<string, string> = {};
  const googleCode = siteSettings.googleVerification as string | undefined;
  if (googleCode) {
    verification.google = googleCode;
  }

  return mergeMetadata(defaultSeoFields, {
    title,
    description,
    keywords: [
      "dijital pazarlama",
      "sosyal medya ajansı",
      "web tasarım",
      "SEO uzmanı",
      "logo tasarım",
      "kurumsal kimlik",
      "Bey Digital Media",
    ],
    authors: [{ name: "Yiğit Emre Balaban" }],
    creator: siteName,
    publisher: siteName,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "https://beydigitalmedia.com",
    },
    twitter: {
      title,
      description,
    },
    verification,
  });
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} dark`}
      suppressHydrationWarning
      style={{ colorScheme: "dark" }}
      data-scroll-behavior="smooth"
    >
      <head>
        <OrganizationJsonLd
          name="Bey Digital Media"
          url="https://beydigitalmedia.com"
          logo="https://beydigitalmedia.com/beydigital_logo.webp"
          telephone="+905443760339"
          email="info@beydigitalmedia.com"
          description="Türk dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO, AI otomasyon ve kurumsal kimlik hizmetleri."
        />
        <WebSiteJsonLd
          url="https://beydigitalmedia.com"
          name="Bey Digital Media"
          description="Dijital pazarlama ajansı - Sosyal medya yönetimi, web tasarım, SEO ve AI otomasyon çözümleri"
        />
      </head>
      <body
        className="font-sans antialiased bg-[#181825] text-[#cdd6f4] overflow-x-hidden"
        suppressHydrationWarning
        style={{ backgroundColor: "#181825", color: "#cdd6f4" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--theme-primary)] focus:text-white focus:rounded-lg"
        >
          Ana içeriğe atla
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}

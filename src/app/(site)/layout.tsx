import type { Metadata, Viewport } from "next";
import { Archivo, Courier_Prime } from "next/font/google";
import "../globals.css";
import { OrganizationJsonLd } from "@/components/SEO/JsonLd";
import { WebSiteJsonLd } from "@/components/SEO/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});

const courierPrime = Courier_Prime({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-courier",
});

export const viewport: Viewport = {
  themeColor: "#f6f4ec",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const siteName = siteSettings.siteName || "Bey Digital Media";
  const tagline = siteSettings.tagline || "Dijital Pazarlama Ajansı";
  const description =
    siteSettings.defaultMetaDescription ||
    "Dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.";
  const title = siteSettings.defaultMetaTitle || `${siteName} | ${tagline}`;

  const verification: Record<string, string> = {};
  const googleCode = siteSettings.googleVerification;
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
      className={`${archivo.variable} ${courierPrime.variable}`}
      suppressHydrationWarning
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
        className="font-sans antialiased bg-paper text-ink overflow-x-hidden"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-ink focus:text-paper focus:font-mono focus:text-sm focus:tracking-wider"
        >
          Ana içeriğe atla
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Bey Digital Media | Bursa Dijital Pazarlama Ajansı",
  description:
    "Bursa merkezli dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
  keywords: [
    "Bursa dijital pazarlama",
    "sosyal medya ajansı",
    "web tasarım Bursa",
    "SEO uzmanı",
    "logo tasarım",
    "kurumsal kimlik",
    "Bey Digital Media",
  ],
  authors: [{ name: "Yiğit Emre Balaban" }],
  creator: "Bey Digital Media",
  publisher: "Bey Digital Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://beydigitalmedia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bey Digital Media | Bursa Dijital Pazarlama Ajansı",
    description:
      "Bursa merkezli dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
    url: "https://beydigitalmedia.com",
    siteName: "Bey Digital Media",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bey Digital Media - Bursa Dijital Pazarlama Ajansı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bey Digital Media | Bursa Dijital Pazarlama Ajansı",
    description:
      "Bursa merkezli dijital pazarlama ajansı. Sosyal medya yönetimi, web tasarım, SEO ve kurumsal kimlik çalışmaları ile markanızı büyütüyoruz.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} dark`}
      suppressHydrationWarning
      style={{ colorScheme: 'dark' }}
    >
      <body
        className="font-sans antialiased bg-[#181825] text-[#cdd6f4] overflow-x-hidden"
        suppressHydrationWarning
        style={{ backgroundColor: '#181825', color: '#cdd6f4' }}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NotFoundContent from "./(site)/not-found";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Bey Digital Media",
};

/* Kok not-found: (site) disindaki eslesmeyen adresler icin html/body kabugu
   404 SSR icin gerekli; icerik (site) 404 ile ayni eski tasarimi kullanir. */
export default function RootNotFound() {
  return (
    <html lang="tr">
      <body className="font-sans antialiased bg-[#181825] text-[#cdd6f4] overflow-x-hidden">
        <NotFoundContent />
      </body>
    </html>
  );
}

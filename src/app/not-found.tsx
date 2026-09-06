import type { Metadata } from "next";
import "./globals.css";
import NotFoundDocument from "@/components/document/NotFoundDocument";

export const metadata: Metadata = {
  title: "Kayıt Bulunamadı | Bey Digital Media",
};

/* Kok not-found: (site) disindaki eslesmeyen adresler icin belge 404 */
export default function RootNotFound() {
  return (
    <html lang="tr">
      <body className="font-sans antialiased bg-paper text-ink">
        <NotFoundDocument />
      </body>
    </html>
  );
}

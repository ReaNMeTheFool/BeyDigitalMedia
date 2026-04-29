import type React from "react";

export interface Service {
  icon?: string;
  imageSrc?: string;
  imageStyle?: React.CSSProperties;
  title: string;
  description: string;
  link: string;
  color?: string;
  bgColor?: string;
  bgStyle?: React.CSSProperties;
}

export const defaultServices: Service[] = [
  {
    icon: "Users",
    imageSrc: "/instaxfacebook.png",
    imageStyle: { marginLeft: "2px" },
    title: "Sosyal Medya Yönetimi",
    description:
      "Hedef kitlenizle güçlü bir bağ kurun. Özgün içerik stratejileri ve proaktif topluluk yönetimi ile organik büyümenizi ve marka bilinirliğinizi artırıyoruz.",
    link: "/sosyal-medya-yonetimi",
    color: "text-blue-600",
    bgColor: "rgba(59, 130, 246, 0.1)",
  },
  {
    icon: "Target",
    imageSrc: "/meta_logo_icon_214665.png",
    imageStyle: { filter: "brightness(0) invert(1)" },
    title: "Meta Ads",
    description:
      "Doğru kitleye, doğru bütçeyle ulaşın. Dönüşüm odaklı Meta kampanyaları ve ileri düzey hedefleme algoritmalarıyla reklam getirinizi (ROAS) maksimize edin.",
    link: "/meta-ads",
    color: "text-indigo-600",
    bgColor: "",
    bgStyle: { backgroundColor: "rgba(24, 119, 242, 0.40)" },
  },
  {
    icon: "Search",
    imageSrc: "/google-ads-transparent.png",
    imageStyle: { marginLeft: "2px" },
    title: "Google Ads",
    description:
      "Satın alma eğilimi yüksek müşterileri yakalayın. Optimize edilmiş anahtar kelime stratejileriyle arama ağındaki görünürlüğünüzü doğrudan satışa çevirin.",
    link: "/google-ads",
    color: "text-green-600",
    bgColor: "",
    bgStyle: { backgroundColor: "rgba(66, 133, 244, 0.20)" },
  },
  {
    icon: "Globe",
    title: "Web Tasarım",
    description:
      "Markanızın dijital vitrinini yeniden yaratıyoruz. Sektörünüzde fark yaratan, modern arayüz tasarımlarına sahip, güven veren ve akılda kalıcı kurumsal web deneyimleri.",
    link: "/web-tasarim",
    color: "text-purple-600",
    bgColor: "rgba(147, 51, 234, 0.1)",
  },
  {
    icon: "Megaphone",
    title: "SEO",
    description:
      "Arama motorlarında sektör otoritesi olun. Kapsamlı teknik SEO, kaliteli içerik ve güçlü backlink stratejileriyle sürdürülebilir organik trafik elde edin.",
    link: "/seo",
    color: "text-orange-600",
    bgColor: "rgba(234, 88, 12, 0.1)",
  },
  {
    icon: "PenTool",
    title: "Logo Tasarımı",
    description:
      "Markanızın hikayesini yansıtan ikonik vizyonlar. İlk bakışta güven veren, akılda kalıcı, modern ve tüm mecralara uyumlu logo çözümleri.",
    link: "/logo-tasarimi",
    color: "text-pink-600",
    bgColor: "rgba(219, 39, 119, 0.1)",
  },
  {
    icon: "Palette",
    title: "Kurumsal Kimlik",
    description:
      "Profesyonel imajınızı her alanda standartlaştırın. Dijitalden baskıya tüm temas noktalarında markanıza değer katan, bütüncül bir görsel iletişim dili yaratıyoruz.",
    link: "/kurumsal-kimlik",
    color: "text-rose-600",
    bgColor: "rgba(225, 29, 72, 0.1)"
  },
  {
    icon: "FileText",
    title: "Raporlama",
    description:
      "Büyümenizi şansa bırakmayın. Şeffaf performans metrikleri, derinlemesine analizler ve veriye dayalı aksiyon planlarıyla stratejinizi sürekli geliştiriyoruz.",
    link: "/detayli-raporlama",
    color: "text-cyan-600",
    bgColor: "rgba(8, 145, 178, 0.1)"
  },
];

export interface ServiceTag {
  label: string;
  slug: string;
  breakBefore?: boolean;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  services: ServiceTag[];
  color: string;
  results: string;
  logo?: string;
  logoScale?: number;
  resultsColor?: string;
  smallTags?: boolean;
}

export const defaultProjects: Project[] = [
  {
    id: 2,
    title: "Guzgun Tekstil",
    category: "Dijital Pazarlama",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
      { label: "Web Tasarım", slug: "web-tasarim" },
      { label: "Google Ads", slug: "google-ads", breakBefore: true },
      { label: "SEO", slug: "seo" },
    ],
    color: "from-emerald-500 to-teal-600",
    results: "Etkileşim Oranı +2000%",
    logo: "/guzgunlar_logo.webp",
    resultsColor: "#fefefe",
    smallTags: true,
  },
  {
    id: 4,
    title: "İşbir Yatak",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-violet-500 to-purple-600",
    results: "Etkileşim oranı +150%",
    logo: "/isbir_yatak.webp",
    resultsColor: "#d93b38",
  },
  {
    id: 5,
    title: "Lada Wedding",
    category: "Reklam",
    services: [{ label: "Meta Ads", slug: "meta-ads" }],
    color: "from-rose-500 to-pink-600",
    results: "Dönüşüm oranı +300%",
    logo: "/lada_logo.webp",
  },
  {
    id: 6,
    title: "Nil Forklift",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-amber-500 to-orange-600",
    results: "Etkileşim Oranı +200%",
    logo: "/nilforkliftt.webp",
    resultsColor: "#f59e0b",
  },
  {
    id: 7,
    title: "Emfa Pet",
    category: "Sosyal Medya",
    services: [
      { label: "Sosyal Medya Yönetimi", slug: "sosyal-medya-yonetimi" },
      { label: "Meta Ads", slug: "meta-ads" },
    ],
    color: "from-cyan-500 to-blue-600",
    results: "Etkileşim Oranı +500%",
    logo: "/emfa.webp",
    logoScale: 1.35,
    resultsColor: "#fc031c",
  },
];

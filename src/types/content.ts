/**
 * D1 veri katmani tip tanimlari. src/payload-types.ts'in kullanilan
 * yuzeyinin portu; richText alanlari string, upload alanlari MediaRef'tir.
 */

export interface MediaRef {
  id: number;
  url: string;
  alt: string | null;
}

export interface MediaItem extends MediaRef {
  filename: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features?:
    | {
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  process?:
    | {
        step: number;
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  metaTitle: string;
  metaDescription: string;
  icon?: MediaRef | null;
  accentColor: string;
  order?: number | null;
}

export interface Project {
  id: number;
  order?: number | null;
  slug: string;
  title: string;
  category: string;
  services?:
    | {
        label: string;
        slug: string;
        breakBefore?: boolean | null;
        id?: string | null;
      }[]
    | null;
  results: string;
  resultsColor?: string | null;
  logo?: MediaRef | null;
  logoScale?: number | null;
  smallTags?: boolean | null;
  color: string;
}

export interface Testimonial {
  id: number;
  image?: MediaRef | null;
  rating?: number | null;
  order?: number | null;
  name: string;
  company: string;
  role?: string | null;
  text: string;
}

export interface Faq {
  id: number;
  order?: number | null;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  featuredImage?: MediaRef | null;
  category?: Category | null;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  read?: boolean | null;
  ip?: string | null;
  createdAt: string;
}

export interface HeroBlock {
  icerik?: {
    titlePrefix?: string | null;
    animatedWords?:
      | {
          word: string;
          id?: string | null;
        }[]
      | null;
    titleSuffix?: string | null;
    subtitle?: string | null;
  };
  cta?: {
    primaryCta?: {
      text?: string | null;
      link?: string | null;
    };
    secondaryCta?: {
      text?: string | null;
      link?: string | null;
    };
  };
  id?: string | null;
  blockName?: string | null;
  blockType: "hero";
}

export interface MarqueeBlock {
  items: {
    text: string;
    id?: string | null;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: "marquee";
}

export interface ServicesGridBlock {
  sectionTitle?: string | null;
  showAllServices?: boolean | null;
  selectedServices?: (number | Service)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "servicesGrid";
}

export interface PortfolioSliderBlock {
  title: string;
  subtitle?: string | null;
  showAllPortfolios?: boolean | null;
  selectedPortfolios?: (number | Project)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "portfolioSlider";
}

export interface TestimonialsCarouselBlock {
  title: string;
  showAllTestimonials?: boolean | null;
  selectedTestimonials?: (number | Testimonial)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "testimonialsCarousel";
}

export interface FaqAccordionBlock {
  title: string;
  subtitle?: string | null;
  showAllFaqs?: boolean | null;
  selectedFaqs?: (number | Faq)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "faqAccordion";
}

export interface AboutBlock {
  title: string;
  content: string;
  stats?:
    | {
        value: string;
        label: string;
        id?: string | null;
      }[]
    | null;
  image?: MediaRef | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "about";
}

export interface AiAutomationBlock {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  badge?: string | null;
  features?:
    | {
        icon?: string | null;
        label: string;
        desc: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "aiAutomation";
}

export interface WhyUsBlock {
  title?: string | null;
  subtitle?: string | null;
  reasons?:
    | {
        icon?: string | null;
        title: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "whyUs";
}

export interface PricingBlock {
  title?: string | null;
  subtitle?: string | null;
  packages?:
    | {
        name: string;
        price: number;
        highlighted?: boolean | null;
        ctaText: string;
        ctaLink: string;
        features?:
          | {
              text: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "pricing";
}

export interface PartnerBadgesBlock {
  title?: string | null;
  badges?:
    | {
        name: string;
        icon?: MediaRef | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: "partnerBadges";
}

export interface CtaBlock {
  title: string;
  subtitle?: string | null;
  ctaText: string;
  ctaLink: string;
  id?: string | null;
  blockName?: string | null;
  blockType: "cta";
}

export type PageBlock =
  | HeroBlock
  | MarqueeBlock
  | ServicesGridBlock
  | PortfolioSliderBlock
  | TestimonialsCarouselBlock
  | FaqAccordionBlock
  | AboutBlock
  | AiAutomationBlock
  | WhyUsBlock
  | PricingBlock
  | PartnerBadgesBlock
  | CtaBlock;

export interface Page {
  id: number;
  slug: string;
  title: string;
  content?: PageBlock[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface SiteSettings {
  siteName?: string | null;
  tagline?: string | null;
  logo?: MediaRef | null;
  favicon?: MediaRef | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  defaultMetaTitle?: string | null;
  defaultMetaDescription?: string | null;
  googleVerification?: string | null;
  theme?: {
    primaryColor?: string | null;
    accentColor?: string | null;
    surfaceColor?: string | null;
    backgroundColor?: string | null;
    textColor?: string | null;
  };
  socialLinks?:
    | {
        platform: string;
        url: string;
        id?: string | null;
      }[]
    | null;
}

export interface Navigation {
  links?:
    | {
        label: string;
        href: string;
        isExternal?: boolean | null;
        order?: number | null;
        children?:
          | {
              label: string;
              href: string;
              isExternal?: boolean | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface Footer {
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
  ctaButtonText?: string | null;
  columns?:
    | {
        title: string;
        links?:
          | {
              label: string;
              href: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  bottomText?: string | null;
  brandTagline?: string | null;
  showNewsletter?: boolean | null;
  socialLinks?:
    | {
        platform: string;
        url: string;
        id?: string | null;
      }[]
    | null;
}

export interface User {
  id: number;
  name?: string | null;
  username: string;
  email?: string | null;
  role?: ("admin" | "editor") | null;
}

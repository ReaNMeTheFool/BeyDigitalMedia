import { getSiteSettings } from "@/lib/content";
import CTA from "./CTA";

interface CTAServerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default async function CTAServer({
  title,
  subtitle,
  ctaText,
  ctaLink,
}: CTAServerProps) {
  const siteSettings = await getSiteSettings();

  const phone = siteSettings.contactPhone || "+905443760339";

  return (
    <CTA
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      ctaLink={ctaLink}
      contactPhone={phone}
    />
  );
}

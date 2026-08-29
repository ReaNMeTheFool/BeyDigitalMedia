import { getPayloadClient } from "@/lib/payload";
import CTA from "./CTA";
import type { SiteSetting } from "@/payload-types";

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
  let siteSettings: Partial<SiteSetting> = {};

  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({ slug: "siteSettings" });
  } catch {
    siteSettings = {};
  }

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

import { getPayloadClient } from "@/lib/payload";
import Footer from "./Footer";

export default async function FooterServer() {
  let footerData: any = {};
  let siteSettings: any = {};

  try {
    const payload = await getPayloadClient();
    footerData = await payload.findGlobal({ slug: "footer" });
  } catch {
    footerData = {};
  }

  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({ slug: "siteSettings" });
  } catch {
    siteSettings = {};
  }

  const columns = footerData?.columns || [];

  const footerLinks = {
    services:
      columns.find((c: any) =>
        ["Hizmetler", "Services", "hizmetler", "services"].includes(c.title)
      )?.links?.map((l: any) => ({ label: l.label, href: l.href })) ||
      undefined,
    company:
      columns.find((c: any) =>
        ["Şirket", "Company", "şirket", "company", "Hakkımızda", "About"].includes(c.title)
      )?.links?.map((l: any) => ({ label: l.label, href: l.href })) ||
      undefined,
    social:
      siteSettings?.socialLinks?.map((s: any) => ({
        label: s.platform,
        href: s.url,
        platform: s.platform?.toLowerCase() || "",
      })) || undefined,
  };

  return (
    <Footer
      ctaTitle={footerData?.ctaTitle || undefined}
      ctaSubtitle={footerData?.ctaSubtitle || undefined}
      ctaButtonText={footerData?.ctaButtonText || undefined}
      ctaButtonHref={footerData?.ctaButtonHref || undefined}
      brandName={siteSettings?.siteName || undefined}
      brandTagline={footerData?.brandTagline || undefined}
      footerLinks={
        footerLinks.services || footerLinks.company || footerLinks.social
          ? footerLinks
          : undefined
      }
      contactEmail={siteSettings?.contactEmail || undefined}
      contactPhone={siteSettings?.contactPhone || undefined}
      bottomText={footerData?.bottomText || undefined}
    />
  );
}

import { getPayloadClient } from "@/lib/payload";
import Footer from "./Footer";

export default async function FooterServer() {
  let footerData: any = {};
  let siteSettings: any = {};

  try {
    const payload = await getPayloadClient();
    [footerData, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: "footer" }).catch(() => ({})),
      payload.findGlobal({ slug: "siteSettings" }).catch(() => ({})),
    ]);
  } catch {
    // fallback to empty defaults
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
    social: (() => {
      const raw = footerData?.socialLinks || siteSettings?.socialLinks;
      if (!raw) return undefined;
      const order: Record<string, number> = {
        instagram: 0,
        youtube: 1,
        facebook: 2,
        tiktok: 3,
      };
      const mapped = raw.map((s: any) => ({
        label: s.platform,
        href: s.url,
        platform: s.platform?.toLowerCase() || "",
      }));
      mapped.sort(
        (a: any, b: any) =>
          (order[a.platform] ?? 999) - (order[b.platform] ?? 999)
      );
      return mapped;
    })(),
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

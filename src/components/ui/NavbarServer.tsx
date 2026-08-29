import { getPayloadClient } from "@/lib/payload";
import Navbar from "./Navbar";
import type { Navigation, SiteSetting } from "@/payload-types";

export default async function NavbarServer() {
  let navData: Partial<Navigation> = {};
  let siteSettings: Partial<SiteSetting> = {};

  try {
    const payload = await getPayloadClient();
    [navData, siteSettings] = await Promise.all([
      payload.findGlobal({ slug: "navigation" }).catch(() => ({})),
      payload.findGlobal({ slug: "siteSettings" }).catch(() => ({})),
    ]);
  } catch {
    // fallback to empty defaults
  }

  const links = (navData?.links || [])
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((link) => ({
      name: link.label,
      href: link.href,
      children: link.children
        ? link.children.map((child) => ({
            name: child.label,
            href: child.href,
          }))
        : undefined,
    }));

  return (
    <Navbar
      logoSrc={
        (siteSettings?.logo && typeof siteSettings.logo === "object"
          ? siteSettings.logo.url
          : undefined) || "/beydigital_logo.webp"
      }
      brandName={siteSettings?.siteName || "Bey Digital Media"}
      navLinks={links.length > 0 ? links : undefined}
      ctaLabel={navData?.ctaLabel ?? undefined}
      ctaHref={navData?.ctaHref ?? undefined}
    />
  );
}

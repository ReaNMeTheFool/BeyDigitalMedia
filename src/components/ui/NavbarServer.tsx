import { getPayloadClient } from "@/lib/payload";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  let navData: any = {};
  let siteSettings: any = {};

  try {
    const payload = await getPayloadClient();
    navData = await payload.findGlobal({ slug: "navigation" });
  } catch {
    navData = {};
  }

  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({ slug: "siteSettings" });
  } catch {
    siteSettings = {};
  }

  const links = (navData?.links || [])
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((link: any) => ({
      name: link.label,
      href: link.href,
      children: link.children
        ? link.children.map((child: any) => ({
            name: child.label,
            href: child.href,
          }))
        : undefined,
    }));

  return (
    <Navbar
      logoSrc={siteSettings?.logo?.url || "/beydigital_logo.webp"}
      brandName={siteSettings?.siteName || "Bey Digital Media"}
      navLinks={links.length > 0 ? links : undefined}
      ctaLabel={navData?.ctaLabel ?? undefined}
      ctaHref={navData?.ctaHref ?? undefined}
    />
  );
}

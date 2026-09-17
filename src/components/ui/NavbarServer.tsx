import { getNavigation, getSiteSettings } from "@/lib/content";
import Navbar from "./Navbar";

export default async function NavbarServer() {
  const navData = await getNavigation();
  const siteSettings = await getSiteSettings();

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
      logoSrc={siteSettings?.logo?.url || "/beydigital_logo.webp"}
      brandName={siteSettings?.siteName || "Bey Digital Media"}
      navLinks={links.length > 0 ? links : undefined}
    />
  );
}

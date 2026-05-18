import { getPayloadClient } from "@/lib/payload";
import CTA from "./CTA";

export default async function CTAServer() {
  let siteSettings: Record<string, unknown> = {};

  try {
    const payload = await getPayloadClient();
    siteSettings = await payload.findGlobal({ slug: "siteSettings" });
  } catch {
    siteSettings = {};
  }

  const phone = (siteSettings.contactPhone as string) || "+905013927088";

  return (
    <CTA
      contactPhone={phone}
    />
  );
}

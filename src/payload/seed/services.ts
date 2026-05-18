import type { Payload } from "payload";
import servicesData from "@/lib/services-data";
import { richText } from "./richText";

export async function seedServices(payload: Payload) {
  for (const [slug, service] of Object.entries(servicesData)) {
    try {
      const existing = await payload.find({
        collection: "services",
        where: { slug: { equals: slug } },
        limit: 1,
      });
      if (existing.docs.length === 0) {
        await payload.create({
          collection: "services",
          data: {
            slug: service.slug,
            title: service.title,
            subtitle: service.subtitle,
            description: service.description,
            longDescription: richText(service.longDescription.join("\n\n")),
            features: service.features,
            process: service.process,
            accentColor: service.accentColor,
            metaTitle: service.metaTitle,
            metaDescription: service.metaDescription,
          },
        });
        console.log(`✅ Service: ${service.title}`);
      } else {
        console.log(`ℹ️ Service exists: ${service.title}`);
      }
    } catch (e) {
      console.error(`❌ Service ${slug} error:`, e);
    }
  }
}

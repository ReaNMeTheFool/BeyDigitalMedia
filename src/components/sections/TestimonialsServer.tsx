import { getPayloadClient } from "@/lib/payload";
import Testimonials from "./Testimonials";

interface TestimonialsServerProps {
  title?: string;
  showAll?: boolean;
}

export default async function TestimonialsServer({
  title,
  showAll = true,
}: TestimonialsServerProps) {
  let testimonials: {
    id: number;
    name: string;
    company: string;
    role: string;
    image: string;
    rating: number;
    text: string;
  }[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "testimonials",
      sort: "name",
      ...(showAll ? {} : { limit: 5 }),
    });
    testimonials = result.docs.map((doc) => ({
      // CMS belge id'leri string döner; bileşen prop tipi hardcoded veriden number bekliyor.
      id: doc.id as unknown as number,
      name: doc.name,
      company: doc.company,
      role: doc.role || "",
      image:
        (doc.image && typeof doc.image === "object"
          ? doc.image.url
          : doc.image) || "",
      rating: doc.rating || 5,
      text: doc.text,
    }));
  } catch {
    testimonials = [];
  }

  return (
    <Testimonials
      title={title}
      testimonials={testimonials.length > 0 ? testimonials : undefined}
    />
  );
}

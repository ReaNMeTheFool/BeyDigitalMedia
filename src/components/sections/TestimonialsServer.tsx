import { getPayloadClient } from "@/lib/payload";
import Testimonials from "./Testimonials";

interface TestimonialsServerProps {
  title?: string;
}

export default async function TestimonialsServer({
  title,
}: TestimonialsServerProps) {
  let testimonials: any[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "testimonials",
      sort: "name",
    });
    testimonials = result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      company: doc.company,
      role: doc.role || "",
      image: doc.image?.url || doc.image,
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

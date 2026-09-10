import { listTestimonials } from "@/lib/content";
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
    let docs = await listTestimonials();
    // Eski CMS davranisi korunur: isme gore sirala, gerekirse ilk 5 ile sinirla
    docs = [...docs].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    if (!showAll) docs = docs.slice(0, 5);
    testimonials = docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      company: doc.company,
      role: doc.role || "",
      image: doc.image?.url || "",
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

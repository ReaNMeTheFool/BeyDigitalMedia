import { listFaqs } from "@/lib/content";
import FAQ from "./FAQ";

interface FAQServerProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  selectedFaqs?: { question: string; answer: unknown }[];
}

export default async function FAQServer({
  title,
  subtitle,
  showAll = true,
  selectedFaqs,
}: FAQServerProps) {
  let faqs: { question: string; answer: string }[] = [];

  if (showAll) {
    try {
      const docs = await listFaqs();
      faqs = docs.map((doc) => ({
        question: doc.question,
        answer: doc.answer,
      }));
    } catch {
      faqs = [];
    }
  } else if (selectedFaqs && selectedFaqs.length > 0) {
    faqs = selectedFaqs.map((doc) => ({
      question: doc.question,
      answer: typeof doc.answer === "string" ? doc.answer : "",
    }));
  }

  return (
    <FAQ
      title={title}
      subtitle={subtitle}
      showAll={true}
      faqs={faqs.length > 0 ? faqs : undefined}
    />
  );
}

import { getPayloadClient } from "@/lib/payload";
import FAQ from "./FAQ";
import { lexicalToHtml } from "@/lib/lexicalToHtml";

interface FAQServerProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  selectedFaqs?: any[];
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
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "faqs",
        sort: "order",
      });
      faqs = result.docs.map((doc: any) => ({
        question: doc.question,
        answer: lexicalToHtml(doc.answer),
      }));
    } catch {
      faqs = [];
    }
  } else if (selectedFaqs && selectedFaqs.length > 0) {
    faqs = selectedFaqs.map((doc: any) => ({
      question: doc.question,
      answer: lexicalToHtml(doc.answer),
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

import { getPayloadClient } from "@/lib/payload";
import { lexicalToHtml } from "@/lib/lexicalToHtml";
import About from "./About";
import { Award, Users, Heart, Briefcase } from "lucide-react";

interface AboutServerProps {
  image?: string;
  title?: string;
  paragraphs?: string[];
  stats?: { icon: string; value: string; label: string }[];
}

const iconMap: Record<string, React.ElementType> = {
  Award,
  Users,
  Heart,
  Briefcase,
};

export default async function AboutServer({
  image,
  title,
  paragraphs,
  stats,
}: AboutServerProps) {
  let aboutParagraphs = paragraphs;

  if (!aboutParagraphs) {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "pages",
        where: { slug: { equals: "about" } },
        limit: 1,
      });
      const aboutPage = result.docs[0] as any;
      if (aboutPage?.content) {
        aboutParagraphs = [lexicalToHtml(aboutPage.content)];
      }
    } catch {
      // fallback
    }
  }

  const mappedStats = stats?.map((s) => ({
    icon: iconMap[s.icon] || Award,
    value: s.value,
    label: s.label,
  }));

  return (
    <About
      image={image}
      title={title}
      paragraphs={aboutParagraphs}
      stats={mappedStats}
    />
  );
}

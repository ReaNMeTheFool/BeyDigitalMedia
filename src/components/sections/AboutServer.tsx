import { getPage } from "@/lib/content";
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
    // about sayfasi icerigi PageBlock[] icindeki "about" blogunda saklanir
    const aboutPage = await getPage("about");
    const aboutBlock = aboutPage?.content?.find(
      (block) => block.blockType === "about"
    );
    if (aboutBlock) {
      aboutParagraphs = [aboutBlock.content];
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

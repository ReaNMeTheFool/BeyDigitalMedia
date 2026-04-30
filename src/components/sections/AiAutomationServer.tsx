import AiAutomation from "./AiAutomation";

interface AiAutomationServerProps {
  title?: string;
  subtitle?: string;
  description?: string[];
  badge?: string;
  features?: { icon: string; label: string; desc: string }[];
}

export default async function AiAutomationServer({
  title,
  subtitle,
  description,
  badge,
  features,
}: AiAutomationServerProps) {
  return (
    <AiAutomation
      title={title}
      subtitle={subtitle}
      description={description}
      badge={badge}
      features={features}
    />
  );
}

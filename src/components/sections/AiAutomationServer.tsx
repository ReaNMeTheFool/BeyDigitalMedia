import AiAutomation from "./AiAutomation";

interface AiAutomationServerProps {
  title?: string;
  subtitle?: string;
}

export default async function AiAutomationServer({
  title,
  subtitle,
}: AiAutomationServerProps) {
  return (
    <AiAutomation
      title={title}
      subtitle={subtitle}
    />
  );
}

import WhyUs from "./WhyUs";

interface WhyUsServerProps {
  title?: string;
  subtitle?: string;
  reasons?: { icon: string; title: string; description: string }[];
}

export default async function WhyUsServer({
  title,
  subtitle,
  reasons,
}: WhyUsServerProps) {
  return (
    <WhyUs
      title={title}
      subtitle={subtitle}
      reasons={reasons}
    />
  );
}

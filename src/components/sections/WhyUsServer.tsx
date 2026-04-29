import WhyUs from "./WhyUs";

interface WhyUsServerProps {
  title?: string;
  subtitle?: string;
}

export default async function WhyUsServer({
  title,
  subtitle,
}: WhyUsServerProps) {
  return (
    <WhyUs
      title={title}
      subtitle={subtitle}
    />
  );
}

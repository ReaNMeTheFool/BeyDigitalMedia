import Hero from "./Hero";

interface HeroServerProps {
  titlePrefix?: string;
  titleSuffix?: string;
  animatedWords?: string[];
  description?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
}

export default function HeroServer({
  titlePrefix,
  titleSuffix,
  animatedWords,
  description,
  primaryCta,
  secondaryCta,
}: HeroServerProps) {
  return (
    <Hero
      titlePrefix={titlePrefix}
      titleSuffix={titleSuffix}
      animatedWords={animatedWords}
      description={description}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    />
  );
}

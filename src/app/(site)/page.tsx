import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import BlocksRenderer from "@/components/blocks/BlocksRenderer";
import { getPayloadClient } from "@/lib/payload";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import About from "@/components/sections/About";
import AiAutomation from "@/components/sections/AiAutomation";
import WhyUs from "@/components/sections/WhyUs";

export default async function Home() {
  let page = null;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
    });
    page = result.docs[0] || null;
  } catch {
    page = null;
  }

  const blocks = page?.content || [];
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  return (
    <>
      <Navbar />
      <main>
        {hasBlocks ? (
          <BlocksRenderer blocks={blocks} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <Services />
            <AiAutomation />
            <WhyUs />
            <Portfolio />
            <About />
            <Testimonials />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

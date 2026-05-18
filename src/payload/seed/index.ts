import { getPayload } from "payload";
import config from "@payload-config";
import { seedUsers } from "./users";
import { seedServices } from "./services";
import { seedBlogPosts } from "./blogPosts";
import { seedProjects } from "./projects";
import { seedTestimonials } from "./testimonials";
import { seedFAQs } from "./faqs";
import { seedHomePage } from "./homePage";
import { seedGlobals } from "./globals";

async function seed() {
  const payload = await getPayload({ config });

  console.log("🌱 Seeding started...");

  await seedUsers(payload);
  await seedServices(payload);
  await seedBlogPosts(payload);
  await seedProjects(payload);
  await seedTestimonials(payload);
  await seedFAQs(payload);
  await seedHomePage(payload);
  await seedGlobals(payload);

  console.log("🌱 Seeding completed!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});

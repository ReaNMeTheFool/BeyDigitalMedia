import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPayloadClient } from "@/lib/payload";

export const metadata = {
  title: "Blog | Bey Digital Media",
  description:
    "Dijital pazarlama, sosyal medya, SEO ve web tasarım hakkında uzman içerikler.",
};

export default async function BlogPage() {
  let posts: Record<string, unknown>[] = [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blogPosts",
      sort: "-publishedDate",
      limit: 100,
    });
    posts = result.docs;
  } catch {
    posts = [];
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#181825] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#cdd6f4] mb-4">
            Blog
          </h1>
          <p className="text-[#cdd6f4]/70 text-lg mb-12">
            Dijital pazarlama dünyasından uzman içerikler.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              const slug = post.slug as string;
              const title = post.title as string;
              const excerpt = post.excerpt as string;
              const category = (post.category as { name?: string })?.name || "";
              const date = post.publishedDate
                ? new Date(post.publishedDate as string).toLocaleDateString(
                    "tr-TR"
                  )
                : "";
              const image = (post.featuredImage as { url?: string })?.url || "";

              return (
                <article
                  key={slug}
                  className="group bg-[#1e1e2e] rounded-2xl overflow-hidden border border-[#2d2d44] hover:border-[#0040ff]/30 transition-all duration-300"
                >
                  <Link href={`/blog/${slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0040ff]/20 to-[#ffd76e]/20" />
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-[#cdd6f4]/60 mb-3">
                        {category && (
                          <span className="bg-[#0040ff]/10 text-[#0040ff] px-2 py-0.5 rounded-full text-xs font-medium">
                            {category}
                          </span>
                        )}
                        <span>{date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-[#cdd6f4] mb-2 group-hover:text-[#0040ff] transition-colors">
                        {title}
                      </h2>
                      <p className="text-[#cdd6f4]/70 text-sm line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

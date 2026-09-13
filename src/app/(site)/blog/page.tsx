import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { listBlogPosts } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { BlogPost } from "@/types/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return mergeMetadata(defaultSeoFields, {
    title: "Blog | Bey Digital Media",
    description:
      "Dijital pazarlama, sosyal medya, SEO ve web tasarım hakkında uzman içerikler.",
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Blog | Bey Digital Media",
      description:
        "Dijital pazarlama, sosyal medya, SEO ve web tasarım hakkında uzman içerikler.",
      url: "https://beydigitalmedia.com/blog",
      type: "website",
    },
    twitter: {
      title: "Blog | Bey Digital Media",
      description:
        "Dijital pazarlama, sosyal medya, SEO ve web tasarım hakkında uzman içerikler.",
    },
  });
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await listBlogPosts();
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

          {posts.length === 0 && (
            <p className="text-[#cdd6f4]/60 text-lg">
              Henüz yayınlanmış bir yazı bulunmuyor.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              const slug = post.slug;
              const title = post.title;
              const excerpt = post.excerpt;
              const category =
                post.category && typeof post.category === "object"
                  ? post.category.name
                  : "";
              const date = post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("tr-TR")
                : "";
              const image =
                post.featuredImage && typeof post.featuredImage === "object"
                  ? post.featuredImage.url || ""
                  : "";

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

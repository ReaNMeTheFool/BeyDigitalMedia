import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { listBlogPosts } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import type { BlogPost } from "@/types/content";
import SerialStrip from "@/components/document/SerialStrip";

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
    posts = await listBlogPosts(100);
  } catch {
    posts = [];
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SerialStrip serial="B-01" label="Arşiv Kayıtları" />

          <div className="mt-8 mb-12">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-ink mb-4">
              Blog
            </h1>
            <p className="text-pencil text-lg">
              Dijital pazarlama dünyasından uzman içerikler.
            </p>
          </div>

          {posts.length === 0 && (
            <div className="rounded-[3px] border border-dashed border-ink/40 bg-paper-alt px-6 py-16 text-center max-w-2xl mx-auto">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-kase font-bold mb-4">
                Arşiv hazırlanıyor
              </p>
              <p className="text-pencil text-lg">
                Henüz yayınlanmış bir yazı bulunmuyor.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  className="group rounded-[3px] overflow-hidden border border-ink/30 bg-paper transition-shadow duration-200 hover:shadow-doc"
                >
                  <Link href={`/blog/${slug}`}>
                    <div className="relative aspect-video overflow-hidden border-b border-ink/20 bg-paper-alt">
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-mono text-4xl font-bold text-ink/20" aria-hidden="true">
                            {title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-pencil mb-3">
                        {category && (
                          <span className="text-kase font-bold">
                            {category}
                          </span>
                        )}
                        <span>{date}</span>
                      </div>
                      <h2 className="text-lg font-bold text-ink mb-2 group-hover:underline underline-offset-4">
                        {title}
                      </h2>
                      <p className="text-pencil text-sm line-clamp-3">
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

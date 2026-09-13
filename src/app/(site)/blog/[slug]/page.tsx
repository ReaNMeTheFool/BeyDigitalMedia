import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getBlogPost } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import { ArticleJsonLd } from "@/components/SEO/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    if (!post) return { title: "Sayfa Bulunamadı | Bey Digital Media" };

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt;
    const image = post.featuredImage?.url || "";

    return mergeMetadata(defaultSeoFields, {
      title,
      description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://beydigitalmedia.com/blog/${slug}`,
        type: "article",
        ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
      },
      twitter: {
        title,
        description,
        ...(image ? { images: [image] } : {}),
      },
    });
  } catch {
    return { title: "Sayfa Bulunamadı | Bey Digital Media" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const title = post.title;
  const excerpt = post.excerpt;
  const date = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("tr-TR")
    : "";
  const image = post.featuredImage?.url || "";
  const category = post.category?.name || "";
  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#181825] pt-32 pb-24">
        <ArticleJsonLd
          title={title}
          url={`https://beydigitalmedia.com/blog/${slug}`}
          description={excerpt}
          image={image || undefined}
          datePublished={
            post.publishedDate
              ? new Date(post.publishedDate).toISOString()
              : undefined
          }
          publisherName="Bey Digital Media"
        />
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-[#0040ff] text-sm font-medium mb-6 inline-block hover:underline"
          >
            Tum Yazilar
          </Link>

          <div className="flex items-center gap-2 text-sm text-[#cdd6f4]/60 mb-4">
            {category && (
              <span className="bg-[#0040ff]/10 text-[#0040ff] px-2 py-0.5 rounded-full text-xs font-medium">
                {category}
              </span>
            )}
            <span>{date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#cdd6f4] mb-6">
            {title}
          </h1>

          <p className="text-xl text-[#cdd6f4]/80 mb-10 leading-relaxed">
            {excerpt}
          </p>

          {image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-[#cdd6f4] prose-p:text-[#cdd6f4]/80 prose-a:text-[#0040ff]">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

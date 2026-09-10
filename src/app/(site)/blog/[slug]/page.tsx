import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getBlogPost } from "@/lib/content";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import { ArticleJsonLd } from "@/components/SEO/JsonLd";
import SerialStrip from "@/components/document/SerialStrip";

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-paper pt-24 pb-24">
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
          <SerialStrip serial={slug} label="Arşiv Kaydı" />

          <Link
            href="/blog"
            className="inline-block mt-6 mb-8 font-mono text-[11px] uppercase tracking-[0.16em] text-pencil hover:text-ink transition-colors"
          >
            Tum Yazilar
          </Link>

          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-pencil mb-4 flex-wrap">
            {category && (
              <span className="text-kase font-bold">
                {category}
              </span>
            )}
            <span>{date}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-ink mb-6">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-pencil mb-10 leading-relaxed border-l-2 border-kase pl-4">
            {excerpt}
          </p>

          {image && (
            <div className="relative aspect-video rounded-[3px] border border-ink/40 bg-paper-alt overflow-hidden mb-12 shadow-doc">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-ink [&_h1]:mt-10 [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-pencil [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:text-pencil [&_li]:mb-1.5 [&_a]:text-kase [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-ink [&_blockquote]:border-y [&_blockquote]:border-dashed [&_blockquote]:border-ink/40 [&_blockquote]:py-1 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-pencil [&_img]:rounded-[3px] [&_hr]:border-dashed [&_hr]:border-ink/40 [&_hr]:my-8"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}

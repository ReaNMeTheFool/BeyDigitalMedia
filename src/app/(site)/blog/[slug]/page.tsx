import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPayloadClient } from "@/lib/payload";
import { lexicalToHtml } from "@/lib/lexicalToHtml";
import { mergeMetadata, defaultSeoFields } from "@/lib/metadata";
import { ArticleJsonLd } from "@/components/SEO/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blogPosts",
      limit: 100,
    });
    return result.docs.map((doc) => ({ slug: doc.slug as string }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blogPosts",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    const post = result.docs[0];
    if (!post) return { title: "Sayfa Bulunamadi | Bey Digital Media" };

    const title = (post.metaTitle as string) || (post.title as string);
    const description =
      (post.metaDescription as string) || (post.excerpt as string);
    const image = (post.featuredImage as { url?: string })?.url || "";

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
    return { title: "Sayfa Bulunamadi | Bey Digital Media" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "blogPosts",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const post = result.docs[0];
  if (!post) notFound();

  const title = post.title as string;
  const excerpt = post.excerpt as string;
  const date = post.publishedDate
    ? new Date(post.publishedDate as string).toLocaleDateString("tr-TR")
    : "";
  const image = (post.featuredImage as { url?: string })?.url || "";
  const category = (post.category as { name?: string })?.name || "";
  const author = (post.author as { name?: string })?.name || "";

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
              ? new Date(post.publishedDate as string).toISOString()
              : undefined
          }
          authorName={author || undefined}
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
            {author && <span>- {author}</span>}
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

          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:text-[#cdd6f4] prose-p:text-[#cdd6f4]/80 prose-a:text-[#0040ff]"
            dangerouslySetInnerHTML={{
              __html: lexicalToHtml(post.content as object),
            }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}

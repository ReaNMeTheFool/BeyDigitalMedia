import Link from "next/link";
import { notFound } from "next/navigation";
import { listCategories, listMedia } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { getBlogPostById } from "@/lib/admin-data";
import { upsertBlogPostAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import { SelectField, TextAreaField, TextField } from "@/components/admin/fields";

export const metadata = { title: "Blog yazısı" };

export default async function BlogPostEditPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();

  const { id } = await params;
  const isNew = id === "new";
  const numericId = Number(id);
  if (!isNew && !Number.isFinite(numericId)) notFound();

  const [post, media, categories] = await Promise.all([
    isNew ? Promise.resolve(null) : getBlogPostById(numericId),
    listMedia(),
    listCategories(),
  ]);
  if (!isNew && !post) notFound();

  const mediaOptions = media.map((item) => ({ value: String(item.id), label: item.filename }));
  const categoryOptions = categories.map((category) => ({
    value: String(category.id),
    label: category.name,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{isNew ? "Yeni yazı" : `Yazı: ${post?.title}`}</h1>
        <Link href="/admin/blog" className="text-sm text-neutral-600 underline underline-offset-2">
          Listeye dön
        </Link>
      </div>

      <ActionForm action={upsertBlogPostAction} submitLabel="Kaydet" className="max-w-3xl space-y-5">
        {!isNew && <input type="hidden" name="id" value={post?.id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Slug" name="slug" defaultValue={post?.slug} required hint="URL: /blog/<slug>" />
          <TextField
            label="Yayın tarihi"
            name="publishedDate"
            type="date"
            defaultValue={post?.publishedDate}
          />
        </div>
        <TextField label="Başlık" name="title" defaultValue={post?.title} required />
        <TextAreaField label="Özet" name="excerpt" defaultValue={post?.excerpt} rows={3} />
        <TextAreaField
          label="İçerik (HTML)"
          name="content"
          defaultValue={post?.content}
          rows={16}
          monospace
          hint="HTML olarak kaydedilir. Örnek: <p>, <h2>, <ul>."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Kategori"
            name="categoryId"
            defaultValue={post?.category?.id ?? ""}
            options={categoryOptions}
            emptyLabel="— yok —"
          />
          <SelectField
            label="Kapak görseli"
            name="featuredImageMediaId"
            defaultValue={post?.featuredImage?.id ?? ""}
            options={mediaOptions}
            emptyLabel="— yok —"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Meta başlık" name="metaTitle" defaultValue={post?.metaTitle} />
          <TextField label="Meta açıklama" name="metaDescription" defaultValue={post?.metaDescription} />
        </div>
      </ActionForm>
    </div>
  );
}

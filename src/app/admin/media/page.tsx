import Link from "next/link";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { listMedia } from "@/lib/content";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteMediaAction, uploadMediaAction } from "@/app/admin/actions";
import ActionForm from "@/components/admin/ActionForm";
import { TextField } from "@/components/admin/fields";
import { adminDangerButtonClass, adminGhostButtonClass } from "@/components/admin/styles";
import type { MediaItem } from "@/types/content";

export const metadata = { title: "Medya" };

interface PublicFile {
  filename: string;
  url: string;
  alt: null;
}

/** public/media içindeki dosyaları okur; dosya sistemi yoksa boş döner. */
async function listPublicMedia(): Promise<PublicFile[]> {
  try {
    const dir = path.join(process.cwd(), "public", "media");
    const names = (await readdir(dir)).filter((name) => !name.startsWith("."));
    return names.map((filename) => ({ filename, url: `/media/${filename}`, alt: null }));
  } catch {
    return [];
  }
}

export default async function MediaAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const deleteIdRaw = typeof params.delete === "string" ? Number(params.delete) : null;
  const deleteId = deleteIdRaw != null && Number.isFinite(deleteIdRaw) ? deleteIdRaw : null;

  const [uploads, publicFiles] = await Promise.all([listMedia(), listPublicMedia()]);

  const uploadNames = new Set(uploads.map((item) => item.filename));
  const localOnly = publicFiles.filter((file) => !uploadNames.has(file.filename));

  const rows: { key: string; item: MediaItem | PublicFile; source: "r2" | "public" }[] = [
    ...uploads.map((item) => ({ key: `r2-${item.id}`, item: item as MediaItem, source: "r2" as const })),
    ...localOnly.map((file) => ({ key: `pub-${file.filename}`, item: file, source: "public" as const })),
  ];
  const deleting = deleteId != null ? uploads.find((item) => item.id === deleteId) ?? null : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Medya</h1>
        <p className="text-sm text-neutral-500">
          {uploads.length} yüklenmiş dosya, {localOnly.length} yerel dosya
        </p>
      </div>

      <section className="max-w-2xl space-y-4 rounded border border-neutral-200 bg-white p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Dosya yükle</h2>
        <ActionForm action={uploadMediaAction} submitLabel="Yükle" className="space-y-4">
          <div>
            <label htmlFor="file" className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Dosya
            </label>
            <input
              id="file"
              name="file"
              type="file"
              required
              className="block w-full text-sm text-neutral-700 file:mr-3 file:rounded file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-neutral-700"
            />
          </div>
          <TextField label="Alt metin" name="alt" hint="Erişilebilirlik için dosyayı tanımlayın." />
        </ActionForm>
      </section>

      {deleting && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            &quot;{deleting.filename}&quot; dosyası depodan ve kayıtlardan kalıcı olarak silinecek. Emin misiniz?
          </p>
          <div className="mt-3 flex gap-2">
            <form action={deleteMediaAction}>
              <input type="hidden" name="id" value={deleting.id} />
              <button type="submit" className={adminDangerButtonClass}>
                Evet, sil
              </button>
            </form>
            <Link href="/admin/media" className={adminGhostButtonClass}>
              Vazgeç
            </Link>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-neutral-500">Kayıt yok.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ key, item, source }) => (
            <li key={key} className="rounded border border-neutral-200 bg-white p-3 text-sm">
              <div className="flex h-28 items-center justify-center overflow-hidden rounded bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.alt ?? ""} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="mt-2 truncate font-medium" title={item.filename}>
                {item.filename}
              </p>
              <p className="text-xs text-neutral-400">
                {source === "r2" ? "R2" : "public/media"}
                {item.alt != null && item.alt !== "" && ` · ${item.alt}`}
              </p>
              <p className="truncate text-xs text-neutral-500">{item.url}</p>
              {source === "r2" && "id" in item && (
                <div className="mt-2 flex gap-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-700 underline underline-offset-2"
                  >
                    Aç
                  </a>
                  <Link
                    href={`/admin/media?delete=${item.id}`}
                    className="text-red-600 underline underline-offset-2"
                  >
                    Sil
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

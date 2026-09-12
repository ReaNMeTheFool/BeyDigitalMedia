import { getMEDIA } from "@/lib/db";

/**
 * R2 MEDIA bucket'indaki nesneleri servis eder. Yüklenen dosyaların
 * url'si /dyn-media/<key> bicimindedir; content-type R2 httpMetadata'sından
 * gelir (upload sırasında yazılır).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = key.join("/");

  const MEDIA = getMEDIA();
  const object = await MEDIA.get(objectKey);
  if (!object) {
    return new Response("Bulunamadı", { status: 404 });
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

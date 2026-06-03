/**
 * Strips all HTML tags EXCEPT <span> (with class/style attrs) and <br>.
 * Everything else is escaped to prevent XSS.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  // 1. Extract and protect allowed tags
  const protectedTags: string[] = [];
  const allowedRegex = /<\/?(?:span(?:\s+(?:class|style)="[^"]*")*|br\s*\/?)\s*\/?>/gi;

  let withPlaceholders = html.replace(allowedRegex, (match) => {
    protectedTags.push(match);
    return `\x00PROTECTED${protectedTags.length - 1}\x00`;
  });

  // 2. Escape all remaining HTML entities
  withPlaceholders = withPlaceholders
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // 3. Restore protected tags
  withPlaceholders = withPlaceholders.replace(
    /\x00PROTECTED(\d+)\x00/g,
    (_, i) => protectedTags[parseInt(i)] ?? ""
  );

  return withPlaceholders;
}

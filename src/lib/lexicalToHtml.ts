import {
  convertLexicalToHTML,
  defaultHTMLConverters,
} from "@payloadcms/richtext-lexical/html";

export function lexicalToHtml(editorState: object): string {
  try {
    return convertLexicalToHTML({
      converters: defaultHTMLConverters,
      data: editorState as Parameters<typeof convertLexicalToHTML>[0]["data"],
    });
  } catch {
    return "";
  }
}

export function richText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          version: 1,
          children: [{ type: "text", text, version: 1 }],
        },
      ],
      direction: null,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

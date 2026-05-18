export function richText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text }],
        },
      ],
      direction: null,
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

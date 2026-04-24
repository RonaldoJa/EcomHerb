import type { DescriptionBlock } from "@/types";

export function portableTextToPlain(blocks: DescriptionBlock[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text ?? "").join("");
    })
    .filter(Boolean)
    .join(" ");
}

import { site } from "@/content/site";
import type { Tag } from "@/data/menu";
import { cx } from "@/lib/format";

const tone: Record<Tag, string> = {
  signature: "bg-forest text-cream",
  bestseller: "bg-cream-soft text-forest-deep",
  new: "bg-matcha text-ink",
  daily: "bg-matcha-soft text-forest-deep",
  preorder: "bg-ink/85 text-cream",
};

export function TagChip({ tag }: { tag: Tag }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] leading-none font-bold tracking-wide shadow-sm",
        tone[tag],
      )}
    >
      {site.tags[tag]}
    </span>
  );
}

export function TagList({ tags, className }: { tags?: readonly Tag[]; className?: string }) {
  if (!tags?.length) return null;
  return (
    <div className={cx("pointer-events-none flex flex-col items-start gap-1.5", className)}>
      {tags.map((tag) => (
        <TagChip key={tag} tag={tag} />
      ))}
    </div>
  );
}

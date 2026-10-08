import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { cx } from "@/lib/format";

type Props = {
  item: MenuItem;
  /** next/image `sizes`, matching how wide the image renders. */
  sizes: string;
  /** Sets the shape, e.g. "aspect-square rounded-2xl". */
  className?: string;
  /** Small thumbnail: no frame, bigger logo. */
  compact?: boolean;
};

export function ProductImage({ item, sizes, className, compact = false }: Props) {
  if (!item.image) return <ProductPlaceholder className={className} compact={compact} />;
  return (
    <div className={cx("relative overflow-hidden bg-sand", className)}>
      <Image
        src={item.image}
        alt={item.imageAlt ?? item.name}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
      />
    </div>
  );
}

/** Branded stand-in for items without a photo yet: the logo on its own green. */
export function ProductPlaceholder({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative grid place-items-center overflow-hidden bg-forest",
        !compact && "shadow-[inset_0_0_48px_rgb(0_0_0/0.2)]",
        className,
      )}
    >
      {!compact && (
        <span className="pointer-events-none absolute inset-2.5 rounded-[inherit] border border-cream/20" />
      )}
      <Image
        src="/logo.png"
        alt=""
        width={150}
        height={150}
        sizes={compact ? "56px" : "150px"}
        className={cx("h-auto", compact ? "w-[86%]" : "w-[44%] max-w-[150px]")}
      />
    </div>
  );
}

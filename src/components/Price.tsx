import { cx, formatMaybePrice } from "@/lib/format";

/** "6,500₮", or a quieter "Үнэ лавлах" when the price isn't set. */
export function Price({ value, onDark = false }: { value: number | null; onDark?: boolean }) {
  const unknown = value === null;
  return (
    <p
      className={cx(
        "tabular-nums",
        unknown ? "text-[0.8125rem] font-semibold" : "text-base font-bold",
        onDark ? "text-cream" : unknown ? "text-ink-soft" : "text-forest",
      )}
    >
      {formatMaybePrice(value)}
    </p>
  );
}

import { site } from "@/content/site";

// en-US grouping gives "6,500"; the mn-MN locale groups with spaces instead.
const amount = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** 6500 → "6,500₮" */
export function formatPrice(value: number): string {
  return `${amount.format(value)}₮`;
}

/** 6500 → "6,500₮", null → "Үнэ лавлах" */
export function formatMaybePrice(value: number | null): string {
  return value === null ? site.price.onRequest : formatPrice(value);
}

/** Joins truthy class names. */
export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

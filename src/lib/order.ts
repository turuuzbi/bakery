import { site } from "@/content/site";
import { business } from "@/data/business";
import type { BasketSummary } from "@/lib/basket";
import { formatMaybePrice, formatPrice } from "@/lib/format";

export type OrderDetails = {
  name: string;
  method: "pickup" | "delivery";
  address: string;
  time: string;
  note: string;
};

export const emptyOrderDetails: OrderDetails = {
  name: "",
  method: "pickup",
  address: "",
  time: "",
  note: "",
};

/** Total for the basket sheet: "19,500₮", "19,500₮ + лавлах" or "Үнэ лавлах". */
export function formatBasketTotal(summary: BasketSummary): string {
  if (summary.unpricedLines === 0) return formatPrice(summary.knownTotal);
  if (summary.knownTotal === 0) return site.price.onRequest;
  return site.basket.totalPartial(formatPrice(summary.knownTotal));
}

/** Total for the narrow basket bar: "19,500₮", "19,500₮+", or null when nothing is priced. */
export function formatBarTotal(summary: BasketSummary): string | null {
  if (summary.count === 0) return null;
  if (summary.unpricedLines === 0) return formatPrice(summary.knownTotal);
  if (summary.knownTotal === 0) return null;
  return `${formatPrice(summary.knownTotal)}+`;
}

/** The plain-text order that gets copied and opened in Viber. */
export function buildOrderMessage(summary: BasketSummary, details: OrderDetails): string {
  const t = site.order;
  const out: string[] = [t.greeting, ""];

  summary.lines.forEach(({ item, qty, subtotal }, i) => {
    out.push(t.line(i + 1, item.name, qty, formatMaybePrice(subtotal)));
  });

  out.push("");
  if (summary.unpricedLines === 0) out.push(t.total(formatPrice(summary.knownTotal)));
  else if (summary.knownTotal > 0) out.push(t.totalPartial(formatPrice(summary.knownTotal)));
  else out.push(t.totalUnknown);

  const extra: string[] = [];
  const name = details.name.trim();
  const time = details.time.trim();
  const note = details.note.trim();
  const address = details.address.trim();
  const delivery = details.method === "delivery" && business.deliveryOffered;

  if (name) extra.push(t.name(name));
  extra.push(t.method(delivery ? site.basket.form.delivery : site.basket.form.pickup));
  if (delivery && address) extra.push(t.address(address));
  if (time) extra.push(t.time(time));
  if (note) extra.push(t.note(note));

  out.push("", ...extra, "", t.signature);
  return out.join("\n");
}

export function viberChatUrl(message?: string): string {
  const base = `viber://chat?number=${encodeURIComponent(business.viber)}`;
  // `draft` pre-fills the message where Viber supports it; the clipboard copy covers the rest.
  return message ? `${base}&draft=${encodeURIComponent(message)}` : base;
}

export function telUrl(tel: string = business.phones[0].tel): string {
  return `tel:${tel}`;
}

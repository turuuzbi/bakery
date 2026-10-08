"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { site } from "@/content/site";
import { business } from "@/data/business";
import { basket, summarize, useBasket, type BasketLine } from "@/lib/basket";
import { cx, formatMaybePrice, formatPrice } from "@/lib/format";
import {
  buildOrderMessage,
  emptyOrderDetails,
  formatBasketTotal,
  telUrl,
  viberChatUrl,
  type OrderDetails,
} from "@/lib/order";
import { useStore } from "@/lib/store";
import { closeBasket, copyText, sheetStore, showToast } from "@/lib/ui";
import { Icon } from "./Icon";
import { ProductImage } from "./ProductImage";
import { Toaster } from "./Toaster";
import { button } from "./styles";

const labelClass = "text-sm font-semibold text-ink";
const inputClass =
  "mt-1.5 block w-full rounded-xl border-0 bg-cream-soft px-3.5 py-3 text-base text-ink ring-1 ring-sand transition-shadow placeholder:text-ink-soft/70 focus:ring-2 focus:ring-forest focus:outline-none";

/** Bottom sheet on phones, side drawer on larger screens. Native <dialog> handles focus and Esc. */
export function BasketSheet() {
  const open = useStore(sheetStore);
  const lines = useBasket();
  const summary = useMemo(() => summarize(lines), [lines]);
  const [details, setDetails] = useState<OrderDetails>(emptyOrderDetails);
  const [showPreview, setShowPreview] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const message = useMemo(() => buildOrderMessage(summary, details), [summary, details]);
  const empty = summary.count === 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const update = (patch: Partial<OrderDetails>) => setDetails((current) => ({ ...current, ...patch }));

  // Runs inside the click, before the browser follows the viber:// link,
  // so the clipboard write still counts as a user gesture.
  function send() {
    void copyText(message).then((ok) => {
      showToast(ok ? site.basket.copied : site.basket.copyFailed);
      if (!ok) setShowPreview(true);
    });
  }

  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    // The content fills the dialog, so a click on the dialog itself is a backdrop click.
    if (event.target === event.currentTarget) closeBasket();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="basket-title"
      className="sheet"
      onClose={closeBasket}
      onClick={onDialogClick}
    >
      <div className="flex-none px-5 pt-2.5 md:pt-6">
        <div aria-hidden="true" className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-sand md:hidden" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="basket-title" className="font-display text-[1.9rem] leading-tight font-semibold">
              {site.basket.title}
            </h2>
            {!empty && <p className="text-sm text-ink-soft">{site.basket.count(summary.count)}</p>}
          </div>
          <button
            type="button"
            onClick={closeBasket}
            aria-label={site.basket.close}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-cream ring-1 ring-sand transition-colors hover:bg-sand"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
        {empty ? (
          <div className="flex flex-col items-center px-2 py-10 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-matcha-soft text-forest">
              <Icon name="bag" className="size-7" />
            </span>
            <p className="mt-4 font-display text-2xl font-semibold">{site.basket.empty}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{site.basket.emptyHint}</p>
            <a href="#menu" onClick={() => dialogRef.current?.close()} className={cx(button.primary, "mt-6")}>
              {site.basket.browse}
            </a>
            <div className="mt-3 flex flex-wrap justify-center gap-2.5">
              <a href={viberChatUrl()} className={cx(button.viber, "px-5")}>
                <Icon name="viber" className="size-5" />
                {site.info.viberAction}
              </a>
              <a href={telUrl()} className={cx(button.secondary, "px-5")}>
                <Icon name="phone" className="size-4" />
                {site.basket.call}
              </a>
            </div>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-sand">
              {summary.lines.map((line) => (
                <LineRow key={line.item.id} line={line} />
              ))}
            </ul>
            <button
              type="button"
              onClick={basket.clear}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              <Icon name="trash" className="size-4" />
              {site.basket.clear}
            </button>

            <OrderForm details={details} update={update} />

            <details
              open={showPreview}
              onToggle={(event) => setShowPreview(event.currentTarget.open)}
              className="group/preview mt-4 rounded-[1.25rem] bg-cream-soft ring-1 ring-sand"
            >
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-[1.25rem] px-4 text-sm font-semibold text-forest [&::-webkit-details-marker]:hidden">
                {site.basket.preview}
                <Icon name="chevron" className="size-4 transition-transform group-open/preview:rotate-180" />
              </summary>
              <pre className="mx-4 mb-4 rounded-xl bg-cream p-3.5 font-sans text-[0.8125rem] leading-relaxed wrap-break-word whitespace-pre-wrap text-ink">
                {message}
              </pre>
            </details>
          </>
        )}
      </div>

      {/* Zero-height anchor: the sheet's toast floats just above the send buttons. */}
      <div className="relative z-10 h-0 flex-none">
        <Toaster scope="sheet" />
      </div>

      {!empty && (
        <div className="flex-none border-t border-sand bg-cream-soft px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold text-ink-soft">{site.basket.total}</span>
            <span className="font-display text-[1.75rem] leading-none font-semibold tabular-nums">
              {formatBasketTotal(summary)}
            </span>
          </div>
          {summary.unpricedLines > 0 && (
            <p className="mt-1 text-right text-xs text-ink-soft">
              {summary.knownTotal > 0 ? site.basket.partialNote : site.basket.totalUnknown}
            </p>
          )}
          <div className="mt-3 flex gap-2.5">
            <a href={viberChatUrl(message)} onClick={send} className={cx(button.viber, "flex-1 px-4")}>
              <Icon name="viber" className="size-5" />
              {site.basket.send}
            </a>
            <a href={telUrl()} className={cx(button.secondary, "px-5")}>
              <Icon name="phone" className="size-4" />
              {site.basket.call}
            </a>
          </div>
          <p className="mt-2 text-center text-xs text-ink-soft">{site.basket.sendHint}</p>
        </div>
      )}
    </dialog>
  );
}

function LineRow({ line }: { line: BasketLine }) {
  const { item, qty, subtotal } = line;
  const t = site.basket;
  return (
    <li className="flex gap-3.5 py-4">
      <ProductImage item={item} sizes="64px" compact className="size-16 shrink-0 rounded-2xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight font-semibold">{item.name}</p>
            {item.price !== null && (
              <p className="text-[0.8125rem] text-ink-soft tabular-nums">
                {formatPrice(item.price)} · {t.each}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => basket.remove(item.id)}
            aria-label={t.remove(item.name)}
            className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
          >
            <Icon name="trash" className="size-4.5" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full bg-cream ring-1 ring-sand">
            <button
              type="button"
              onClick={() => basket.setQty(item.id, qty - 1)}
              aria-label={t.decrease(item.name)}
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-sand"
            >
              <Icon name="minus" className="size-4" />
            </button>
            <output aria-label={t.quantity(item.name)} className="min-w-7 text-center text-[0.9375rem] font-bold tabular-nums">
              {qty}
            </output>
            <button
              type="button"
              onClick={() => basket.setQty(item.id, qty + 1)}
              aria-label={t.increase(item.name)}
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-sand"
            >
              <Icon name="plus" className="size-4" />
            </button>
          </div>
          <p
            className={cx(
              "tabular-nums",
              subtotal === null ? "text-[0.8125rem] font-semibold text-ink-soft" : "font-bold text-forest",
            )}
          >
            {formatMaybePrice(subtotal)}
          </p>
        </div>
      </div>
    </li>
  );
}

function OrderForm({ details, update }: { details: OrderDetails; update: (patch: Partial<OrderDetails>) => void }) {
  const f = site.basket.form;
  const delivery = business.deliveryOffered && details.method === "delivery";
  const methods = [
    { value: "pickup", label: f.pickup },
    { value: "delivery", label: f.delivery },
  ] as const;

  return (
    <section aria-labelledby="order-details-title" className="mt-5 rounded-[1.25rem] bg-cream p-4 ring-1 ring-sand">
      <h3 id="order-details-title" className="text-[0.9375rem] font-bold">
        {f.legend} <span className="font-medium text-ink-soft">({f.optional})</span>
      </h3>
      <div className="mt-3 grid gap-4">
        <label className="block">
          <span className={labelClass}>{f.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={details.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder={f.namePlaceholder}
            className={inputClass}
          />
        </label>

        {business.deliveryOffered && (
          <fieldset>
            <legend className={labelClass}>{f.method}</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {methods.map((m) => (
                <label
                  key={m.value}
                  className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-cream-soft px-3 text-sm font-semibold text-ink-soft ring-1 ring-sand transition-colors has-checked:bg-forest has-checked:text-cream has-checked:ring-forest has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-forest"
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.value}
                    checked={details.method === m.value}
                    onChange={() => update({ method: m.value })}
                    className="sr-only"
                  />
                  {m.label}
                </label>
              ))}
            </div>
            {delivery && <p className="mt-2 text-xs leading-relaxed text-ink-soft">{f.deliveryNote}</p>}
          </fieldset>
        )}

        {delivery && (
          <label className="block">
            <span className={labelClass}>{f.address}</span>
            <textarea
              name="address"
              rows={2}
              autoComplete="street-address"
              value={details.address}
              onChange={(e) => update({ address: e.target.value })}
              placeholder={f.addressPlaceholder}
              className={cx(inputClass, "resize-none")}
            />
          </label>
        )}

        <label className="block">
          <span className={labelClass}>{f.time}</span>
          <input
            type="text"
            name="time"
            value={details.time}
            onChange={(e) => update({ time: e.target.value })}
            placeholder={f.timePlaceholder}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>{f.note}</span>
          <textarea
            name="note"
            rows={2}
            value={details.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder={f.notePlaceholder}
            className={cx(inputClass, "resize-none")}
          />
        </label>
      </div>
    </section>
  );
}

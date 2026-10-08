"use client";

import { useMemo } from "react";
import { site } from "@/content/site";
import { summarize, useBasket } from "@/lib/basket";
import { cx } from "@/lib/format";
import { formatBarTotal } from "@/lib/order";
import { useStore } from "@/lib/store";
import { openBasket, sheetStore } from "@/lib/ui";
import { Icon } from "./Icon";

/** Floating "Сагс (3) · 19,500₮" bar, shown once something is in the basket. */
export function BasketBar() {
  const lines = useBasket();
  const sheetOpen = useStore(sheetStore);
  const summary = useMemo(() => summarize(lines), [lines]);
  const visible = summary.count > 0 && !sheetOpen;
  const total = formatBarTotal(summary);

  return (
    <div
      inert={!visible}
      className={cx(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-[130%] opacity-0",
      )}
    >
      <button
        type="button"
        onClick={openBasket}
        className="pointer-events-auto mx-auto flex h-16 w-full max-w-md items-center gap-2 rounded-full bg-forest pr-2 pl-4 text-cream shadow-lift ring-1 ring-forest-deep transition-colors hover:bg-forest-deep"
      >
        <Icon name="bag" className="size-5 shrink-0" />
        <span key={summary.count} className="shrink-0 font-bold motion-safe:animate-bump">
          {site.basket.bar(summary.count)}
        </span>
        {total && (
          <>
            <span aria-hidden="true" className="text-cream/60">
              ·
            </span>
            <span className="min-w-0 truncate font-semibold tabular-nums">{total}</span>
          </>
        )}
        <span className="ml-auto inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-cream px-4 text-sm font-bold text-forest">
          {site.basket.barAction}
          <Icon name="arrow" className="size-4" />
        </span>
      </button>
    </div>
  );
}

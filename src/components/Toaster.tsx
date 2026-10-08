"use client";

import { cx } from "@/lib/format";
import { useStore } from "@/lib/store";
import { sheetStore, toastStore } from "@/lib/ui";
import { Icon } from "./Icon";

/**
 * Rendered twice: once on the page and once inside the basket sheet, because a
 * modal <dialog> covers (and makes inert) everything outside it. Only the copy
 * matching the sheet's state shows the toast.
 */
export function Toaster({ scope }: { scope: "page" | "sheet" }) {
  const toast = useStore(toastStore);
  const sheetOpen = useStore(sheetStore);
  const current = (scope === "sheet") === sheetOpen ? toast : null;

  return (
    <>
      <p role="status" className="sr-only">
        {current?.message ?? ""}
      </p>
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none z-50 flex justify-center px-4",
          scope === "page"
            ? "fixed inset-x-0 bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+4.75rem)]"
            : "absolute inset-x-0 bottom-3",
        )}
      >
        {current && (
          <div
            key={current.id}
            className="flex max-w-sm items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-cream shadow-lift motion-safe:animate-rise"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-matcha text-ink">
              <Icon name="check" className="size-3.5" />
            </span>
            {current.message}
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { site } from "@/content/site";
import { cx } from "@/lib/format";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { useCurrentMinute } from "@/lib/ui";

function describe(status: OpenStatus): { label: string; detail?: string; dot: string; live: boolean } {
  const s = site.status;
  switch (status.kind) {
    case "open":
      return status.closingSoon
        ? { label: s.closingSoon, detail: s.until(status.closesAt), dot: "bg-amber-500", live: false }
        : { label: s.open, detail: s.until(status.closesAt), dot: "bg-emerald-500", live: true };
    case "closed": {
      const when =
        status.opensOn === "today"
          ? s.opensToday(status.opensAt)
          : status.opensOn === "tomorrow"
            ? s.opensTomorrow(status.opensAt)
            : s.opensOn(site.weekdays[status.opensOn], status.opensAt);
      return { label: s.closed, detail: when, dot: "bg-rose-400", live: false };
    }
    case "unknown":
      return { label: s.closed, dot: "bg-rose-400", live: false };
  }
}

/**
 * "Одоо нээлттэй · 20:00 хүртэл". Computed in the browser from Ulaanbaatar time;
 * the prerendered HTML holds an invisible pill of the same height, so nothing shifts.
 */
export function OpenBadge({ compact = false }: { compact?: boolean }) {
  const minute = useCurrentMinute();
  const info = minute === null ? null : describe(getOpenStatus(new Date(minute)));

  return (
    <p
      className={cx(
        "inline-flex items-center gap-x-2 bg-cream-soft/95 pr-4 pl-3 text-[0.8125rem] font-semibold ring-1 transition-opacity duration-500",
        // The compact badge sits in a narrow card, so it always uses two lines.
        compact ? "min-h-14 flex-wrap rounded-2xl py-2 ring-sand" : "h-9 rounded-full whitespace-nowrap ring-ink/10",
        info ? "opacity-100" : "opacity-0",
      )}
    >
      <span aria-hidden="true" className="relative flex size-2.5">
        {info?.live && (
          // Three pings, then still: an endless animation never lets the page settle.
          <span
            className={cx(
              "absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping motion-safe:[animation-iteration-count:3]",
              info.dot,
            )}
          />
        )}
        <span className={cx("relative size-2.5 rounded-full", info?.dot ?? "bg-sand")} />
      </span>
      <span className="text-ink">{info?.label}</span>
      {info?.detail &&
        (compact ? (
          <span className="basis-full pl-4.5 font-medium text-ink-soft">{info.detail}</span>
        ) : (
          <>
            <span aria-hidden="true" className="text-ink-soft/60">
              ·
            </span>
            <span className="text-ink-soft">{info.detail}</span>
          </>
        ))}
    </p>
  );
}

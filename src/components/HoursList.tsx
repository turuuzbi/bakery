"use client";

import { site } from "@/content/site";
import { business } from "@/data/business";
import { cx } from "@/lib/format";
import { shopTime } from "@/lib/hours";
import { useCurrentMinute } from "@/lib/ui";

/** Weekly hours; today's row is highlighted once the browser knows the date. */
export function HoursList() {
  const minute = useCurrentMinute();
  const today = minute === null ? null : shopTime(new Date(minute)).day;

  return (
    <dl className="divide-y divide-sand/80">
      {business.hours.map((hours, day) => (
        <div
          key={site.weekdays[day]}
          className={cx(
            "flex items-center justify-between gap-3 py-2.5 text-[0.9375rem]",
            today === day ? "font-bold text-forest" : "text-ink",
          )}
        >
          <dt className="flex items-center gap-2">
            {site.weekdays[day]}
            {today === day && (
              <span className="rounded-full bg-matcha-soft px-2 py-0.5 text-[0.6875rem] leading-tight font-bold text-forest-deep">
                {site.info.today}
              </span>
            )}
          </dt>
          <dd className="tabular-nums">{hours ? `${hours.open} – ${hours.close}` : site.info.closedDay}</dd>
        </div>
      ))}
    </dl>
  );
}

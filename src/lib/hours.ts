import { business, type Weekday } from "@/data/business";

export type OpenStatus =
  | { kind: "open"; closesAt: string; closingSoon: boolean }
  | { kind: "closed"; opensAt: string; opensOn: "today" | "tomorrow" | Weekday }
  | { kind: "unknown" };

const SHORT_WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CLOSING_SOON_MINUTES = 30;

const shopClock = new Intl.DateTimeFormat("en-US", {
  timeZone: business.timeZone,
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Weekday (Monday = 0) and minutes since midnight, in Ulaanbaatar time. */
export function shopTime(date: Date): { day: Weekday; minutes: number } {
  let day = 0;
  let hour = 0;
  let minute = 0;
  for (const part of shopClock.formatToParts(date)) {
    if (part.type === "weekday") day = SHORT_WEEKDAYS.indexOf(part.value);
    else if (part.type === "hour") hour = Number(part.value);
    else if (part.type === "minute") minute = Number(part.value);
  }
  return { day: Math.max(day, 0) as Weekday, minutes: hour * 60 + minute };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getOpenStatus(date: Date): OpenStatus {
  const { day, minutes } = shopTime(date);
  const today = business.hours[day];

  if (today) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes >= open && minutes < close) {
      return {
        kind: "open",
        closesAt: today.close,
        closingSoon: close - minutes <= CLOSING_SOON_MINUTES,
      };
    }
    if (minutes < open) return { kind: "closed", opensAt: today.open, opensOn: "today" };
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = ((day + offset) % 7) as Weekday;
    const hours = business.hours[next];
    if (hours) {
      return { kind: "closed", opensAt: hours.open, opensOn: offset === 1 ? "tomorrow" : next };
    }
  }
  return { kind: "unknown" };
}

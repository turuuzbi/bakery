/**
 * Business details for Iden Coffee & Bakery.
 * Source: the Instagram profile (@idenbakerymn) and the brief.
 * Everything marked TODO is a placeholder: confirm it with the owner before launch.
 */

/** "HH:MM", 24-hour clock, Ulaanbaatar time. `null` means closed that day. */
export type DayHours = { open: string; close: string } | null;

/** Index into `business.hours`: 0 = Monday … 6 = Sunday. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Week = readonly [DayHours, DayHours, DayHours, DayHours, DayHours, DayHours, DayHours];

const weekday: DayHours = { open: "08:00", close: "20:00" };
const weekend: DayHours = { open: "09:00", close: "18:00" };

export const business = {
  name: "Iden Coffee & Bakery",
  timeZone: "Asia/Ulaanbaatar",

  // TODO: хуваарь — these are the example hours from the brief, not confirmed by the owner.
  hours: [weekday, weekday, weekday, weekday, weekday, weekend, weekend] satisfies Week,

  phones: [
    { display: "8810 5624", tel: "+97688105624" },
    { display: "9915 0204", tel: "+97699150204" },
  ],

  /** Orders land in this Viber account. */
  viber: "+97688105624",

  instagram: {
    handle: "@idenbakerymn",
    url: "https://www.instagram.com/idenbakerymn/",
  },

  address: {
    street: "Хархорин хороолол, 55/15-р байр, 1 давхрын үйлчилгээний талбай",
    city: "Улаанбаатар",
    directions: "CU-с Хархорин зах руу чигээрээ явахад Iden гэсэн хаяг бий.",
  },

  // TODO: газрын зураг — ask the owner for their exact Google Maps pin; this is a text search.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Iden Coffee & Bakery, Хархорин хороолол 55/15, Улаанбаатар"),

  // TODO: хүргэлт — not confirmed. Set to false to hide the delivery option in the basket.
  deliveryOffered: true,
} as const;

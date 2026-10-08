/**
 * Every piece of UI copy on the site lives here. Edit freely.
 * Menu items live in src/data/menu.ts, business details in src/data/business.ts.
 */
import type { Tag } from "@/data/menu";

export const site = {
  meta: {
    title: "Iden Coffee & Bakery — бялуу, амттан, кофе | Улаанбаатар",
    description:
      "Хархорин хорооллын Iden Coffee & Bakery. Тирамису, луувантай бялуу, шинэхэн талх, кофе — цэс, ажлын цагаа үзээд захиалгаа Viber-ээр шууд илгээгээрэй.",
    ogTitle: "Iden Coffee & Bakery — Your sweet heaven",
    ogAlt: "Iden Coffee & Bakery — Your sweet heaven. Бялуу, амттан, кофе — Улаанбаатар",
    /** Text drawn into the generated share image. */
    ogLine: "Бялуу · Амттан · Кофе",
    ogSubline: "Цэсээ үзээд Viber-ээр захиалаарай",
  },

  brand: {
    name: "Iden Coffee & Bakery",
    short: "Iden",
    sub: "Coffee & Bakery",
    tagline: "Your sweet heaven",
    logoAlt: "Iden Coffee & Bakery лого",
  },

  a11y: {
    skipToContent: "Үндсэн агуулга руу шилжих",
    mainNav: "Үндсэн цэс",
  },

  nav: [
    { href: "#featured", label: "Онцлох" },
    { href: "#menu", label: "Цэс" },
    { href: "#info", label: "Хаяг, цаг" },
  ],

  header: {
    order: "Захиалах",
    orderWithCount: (n: number) => `Захиалах, сагсанд ${n} бүтээгдэхүүн`,
  },

  hero: {
    titleTop: "Iden Coffee",
    titleBottom: "& Bakery",
    tagline: "Your sweet heaven",
    lead: "Гар хийцийн бялуу, амттан, шинэхэн талх, анхилуун кофе — Хархорин хорооллын тань хажууд.",
    ctaMenu: "Цэс үзэх",
    ctaOrder: "Захиалах",
    callPrefix: "Эсвэл залгаарай:",
    stamp: "IDEN BAKERY • ӨДӨР БҮР ШИНЭХЭН • ",
    imageAlt: "Ягаан тавган дээрх трес лечес бялуу, ард нь Iden-ий нуман хаалгат, ногоон навчит интерьер",
    insetAlt: "Матча тирамисугийн ногоон давхаргууд",
  },

  status: {
    open: "Одоо нээлттэй",
    closingSoon: "Удахгүй хаана",
    closed: "Одоо хаалттай",
    until: (time: string) => `${time} хүртэл`,
    opensToday: (time: string) => `${time} цагт нээнэ`,
    opensTomorrow: (time: string) => `Маргааш ${time} цагт нээнэ`,
    opensOn: (day: string, time: string) => `${day} ${time} цагт нээнэ`,
  },

  /** Monday first. */
  weekdays: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"],

  tags: {
    signature: "Онцлох",
    bestseller: "Хамгийн их зарагддаг",
    new: "Шинэ",
    daily: "Өдөр бүр шинэ",
    preorder: "Захиалгаар",
  } satisfies Record<Tag, string>,

  price: {
    onRequest: "Үнэ лавлах",
  },

  featured: {
    eyebrow: "Онцлох",
    title: "Iden-ий хамгийн дуртай амттнууд",
    lead: "Манай онцлох матча күүки болон хамгийн их захиалагддаг амттнууд.",
  },

  steps: {
    title: "Захиалах нь амархан",
    items: [
      { title: "Сонгоно", text: "Цэснээс дуртай амттнаа + дарж сагсандаа нэмнэ." },
      { title: "Илгээнэ", text: "Захиалга тань бичигдсэн чигээрээ Viber-ээр очно." },
      { title: "Авна", text: "Iden баталгаажуулаад таны захиалгыг бэлдэнэ." },
    ],
  },

  menu: {
    eyebrow: "Цэс",
    title: "Манай цэс",
    lead: "Дуртай зүйлээ + дарж сагсандаа нэмээд, захиалгаа Viber-ээр шууд илгээгээрэй.",
    categoriesNav: "Цэсний ангилал",
    add: (name: string) => `${name} сагсанд нэмэх`,
    addMore: (name: string, qty: number) => `${name} сагсанд нэмэх, одоо ${qty} ширхэг`,
    customCake: {
      title: "Хүссэн загвараар тань",
      text: "Төрсөн өдөр, ой, хүйс тодруулах үдэшлэг — бялуугаа захиалаарай. Загвар, зургаа Viber-ээр илгээхэд л болно.",
      viber: "Viber-ээр бичих",
      call: "Залгах",
    },
  },

  basket: {
    bar: (n: number) => `Сагс (${n})`,
    barAction: "Захиалах",
    title: "Таны сагс",
    count: (n: number) => `${n} бүтээгдэхүүн`,
    close: "Хаах",
    empty: "Сагс хоосон байна",
    emptyHint: "Цэснээс дуртай амттнаа сонгоод + товчийг дарна уу. Эсвэл шууд бичээрэй.",
    browse: "Цэс үзэх",
    each: "ширхэг бүр",
    decrease: (name: string) => `${name}: нэгээр хасах`,
    increase: (name: string) => `${name}: нэгээр нэмэх`,
    quantity: (name: string) => `${name}: тоо ширхэг`,
    remove: (name: string) => `${name}: сагснаас хасах`,
    clear: "Сагс хоослох",
    total: "Нийт",
    totalUnknown: "Үнийг Iden баталгаажуулна",
    totalPartial: (known: string) => `${known} + лавлах`,
    partialNote: "Зарим бүтээгдэхүүний үнийг Iden баталгаажуулна.",
    added: (name: string) => `${name} сагсанд нэмэгдлээ`,
    form: {
      legend: "Захиалгын мэдээлэл",
      optional: "заавал биш",
      name: "Таны нэр",
      namePlaceholder: "Ж: Болормаа",
      method: "Хүлээн авах",
      pickup: "Очиж авна",
      delivery: "Хүргэлтээр",
      deliveryNote: "Хүргэлтийн нөхцөл, төлбөрийг Iden баталгаажуулна.",
      address: "Хүргэлтийн хаяг",
      addressPlaceholder: "Дүүрэг, хороо, байр, орц, тоот",
      time: "Хэзээ авах вэ?",
      timePlaceholder: "Ж: Өнөөдөр 18:00",
      note: "Нэмэлт тайлбар",
      notePlaceholder: "Ж: Бялуун дээр «Төрсөн өдрийн мэнд» гэж бичих",
    },
    preview: "Илгээх мессежийг харах",
    send: "Viber-ээр илгээх",
    call: "Залгах",
    sendHint: "Захиалга тань хуулагдаад Viber нээгдэнэ.",
    copied: "Захиалга хуулагдлаа, Viber-т paste хийнэ үү",
    copyFailed: "Хуулж чадсангүй — доорх мессежийг гараар хуулна уу",
  },

  /** The message that lands in the owner's Viber. */
  order: {
    greeting: "Сайн байна уу! Дараах захиалгыг өгье:",
    line: (index: number, name: string, qty: number, amount: string) =>
      `${index}. ${name} × ${qty} — ${amount}`,
    total: (amount: string) => `Нийт: ${amount}`,
    totalPartial: (amount: string) => `Нийт: ${amount} + үнэ лавлах бүтээгдэхүүн`,
    totalUnknown: "Нийт: үнийг лавлана уу",
    name: (value: string) => `Нэр: ${value}`,
    method: (value: string) => `Хүлээн авах: ${value}`,
    address: (value: string) => `Хаяг: ${value}`,
    time: (value: string) => `Авах цаг: ${value}`,
    note: (value: string) => `Тайлбар: ${value}`,
    signature: "— Iden вэбсайтаас илгээв",
  },

  info: {
    eyebrow: "Хаяг, цаг",
    title: "Бидэн дээр зочлоорой",
    hoursTitle: "Ажлын цаг",
    today: "Өнөөдөр",
    closedDay: "Амарна",
    holidayNote: "Баяр ёслолын өдрүүдэд цагийн хуваарь өөрчлөгдөж болно.",
    addressTitle: "Хаяг",
    map: "Газрын зураг",
    storefrontAlt: "Iden Coffee & Bakery-ийн гадна хаяг, барилгын 1 давхарт",
    storefrontCaption: "Энэ хаягийг хайгаарай",
    contactTitle: "Холбоо барих",
    phone: "Утас",
    viber: "Viber",
    viberAction: "Viber-ээр бичих",
    instagram: "Instagram",
    newTab: "(шинэ цонхонд нээгдэнэ)",
  },

  footer: {
    rights: "Iden Coffee & Bakery",
    credit: "Demo · Turuu",
  },
} as const;

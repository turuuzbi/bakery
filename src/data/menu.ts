/**
 * The menu. Items appear in this order inside their category.
 *
 * Prices: none of the Instagram posts list prices, so every price is `null`
 * ("Үнэ лавлах" on the site). Fill them in with real numbers from the owner,
 * e.g. `price: 6500` renders as "6,500₮". Never guess a price.
 */

export type CategoryId = "cakes" | "desserts" | "bakery" | "cookies" | "coffee" | "custom";

export type Tag = "signature" | "bestseller" | "new" | "daily" | "preorder";

export type MenuItem = {
  id: string;
  name: string;
  /** One short line; cards clamp it to two lines. */
  description: string;
  /** Tögrög. `null` = price not confirmed yet. */
  price: number | null;
  category: CategoryId;
  /** Path under /public. `null` = no photo yet → branded green placeholder. */
  image: string | null;
  imageAlt?: string;
  /** CSS object-position for the square/portrait crop, e.g. "50% 70%". */
  imagePosition?: string;
  tags?: readonly Tag[];
  /** Position in the "Онцлох" strip (1 = first). Omit to leave it out. */
  featured?: number;
};

export const categories: readonly { id: CategoryId; label: string }[] = [
  { id: "cakes", label: "Бялуу" },
  { id: "desserts", label: "Амттан" },
  { id: "bakery", label: "Талх, нарийн боов" },
  { id: "cookies", label: "Күүки" },
  { id: "coffee", label: "Кофе" },
  { id: "custom", label: "Захиалгын бялуу" },
];

export const menu: readonly MenuItem[] = [
  // ── Бялуу ──────────────────────────────────────────────
  {
    id: "carrot-cake",
    name: "Луувантай бялуу",
    description: "Шинэ ургацын монгол лууван, шанцай, хушга, үзэм, крем чийз",
    price: null,
    category: "cakes",
    image: "/menu/carrot-cake.jpg",
    imageAlt: "Цагаан крем чийзэн бүрхүүлтэй, лууван хэлбэрийн чимэглэлтэй луувантай бялуу",
    // TODO: "bestseller" tags are inferred from Instagram likes; confirm with the owner.
    tags: ["bestseller"],
    featured: 3,
  },
  {
    id: "tres-leches",
    name: "Трес лечес",
    description: "Гурван төрлийн сүүнд дэвтээсэн зөөлөн, чийглэг бялуу",
    price: null,
    category: "cakes",
    image: "/menu/tres-leches.jpg",
    imageAlt: "Ягаан тавган дээрх трес лечес бялууны зүсэм",
    imagePosition: "50% 72%",
  },
  {
    id: "basque-cheesecake",
    name: "Баск чийзкейк",
    description: "Зөөлөн, кремлэг шатаасан чийзкейк — цөцгий, гүзээлзгэнэтэй",
    price: null,
    category: "cakes",
    image: "/menu/basque-cheesecake.jpg",
    imageAlt: "Цөцгий, гүзээлзгэнээр чимэглэсэн баск чийзкейкийн зүсэм",
    imagePosition: "50% 62%",
    tags: ["daily"],
  },

  // ── Амттан ─────────────────────────────────────────────
  {
    id: "tiramisu",
    name: "Тирамису",
    description: "Маскарпоне крем, кофе, какао — өдөр бүр шинээр хийнэ",
    price: null,
    category: "desserts",
    image: "/menu/tiramisu.jpg",
    imageAlt: "Какаогаар цацсан, давхаргатай тирамису",
    tags: ["bestseller"],
    featured: 2,
  },
  {
    id: "matcha-tiramisu",
    name: "Матча тирамису",
    description: "Маскарпоне крем, матчад дэвтээсэн зөөлөн бисквит",
    price: null,
    category: "desserts",
    image: "/menu/matcha-tiramisu.jpg",
    imageAlt: "Матча нунтгаар цацсан ногоон давхаргатай тирамису",
  },

  // ── Талх, нарийн боов ─────────────────────────────────
  {
    id: "brotchen",
    name: "Брётхен",
    description: "Германы уламжлалт өглөөний талх — гаднаа шаржигнуур, дотроо хөнгөн",
    price: null,
    category: "bakery",
    image: "/menu/brotchen.jpg",
    imageAlt: "Сагсанд овоолсон шинэхэн брётхен талх",
    imagePosition: "50% 45%",
    tags: ["daily"],
  },
  {
    id: "donut",
    name: "Донат",
    description: "Шоколадан бүрхүүл, өнгөт чимэглэлтэй эсвэл нунтаг элсэн чихэртэй",
    price: null,
    category: "bakery",
    image: "/menu/donut.jpg",
    imageAlt: "Шоколадан бүрхүүлтэй болон нунтаг элсэн чихэртэй донатууд",
  },
  {
    id: "choux-cream",
    name: "Шу крем",
    description: "Гаднаа шаржигнуур, дотроо чанамал крем дүүрэн. Бөөний захиалга авна",
    price: null,
    category: "bakery",
    image: "/menu/choux-cream.jpg",
    imageAlt: "Дундуур нь хуваасан, чанамал кремээр дүүрэн шу",
  },

  // ── Күүки ──────────────────────────────────────────────
  {
    id: "matcha-cookie",
    name: "Матча күүки",
    description: "Iden-ий онцлох амттан — анхилуун матчатай күүки",
    price: null,
    category: "cookies",
    image: null, // TODO: зураг — no photo on Instagram yet
    tags: ["signature"],
    featured: 1,
  },

  // ── Кофе ───────────────────────────────────────────────
  // TODO: кофе — the brief says coffee is a highlight but lists no drinks.
  // These are common placeholders: replace with the real coffee menu.
  {
    id: "americano",
    name: "Американо",
    description: "Эспрессо, халуун ус — сонгодог хар кофе",
    price: null,
    category: "coffee",
    image: null,
  },
  {
    id: "latte",
    name: "Латте",
    description: "Эспрессо, зөөлөн хөөсрүүлсэн сүү",
    price: null,
    category: "coffee",
    image: null,
  },
  {
    id: "cappuccino",
    name: "Капучино",
    description: "Эспрессо, сүү, өтгөн сүүн хөөс",
    price: null,
    category: "coffee",
    image: null,
  },

  // ── Захиалгын бялуу ───────────────────────────────────
  {
    id: "gender-reveal-cake",
    name: "Хүйс тодруулах бялуу",
    description: "Таны сонгосон загвараар захиалгаар хийнэ",
    price: null,
    category: "custom",
    image: "/menu/gender-reveal-cake.jpg",
    imageAlt: "“Boy or Girl” бичигтэй хүйс тодруулах бялуу, цэнхэр ягаан капкейкүүд",
    imagePosition: "50% 0%",
    tags: ["preorder"],
  },
];

export const menuById: ReadonlyMap<string, MenuItem> = new Map(menu.map((item) => [item.id, item]));

/** Element id of a category's section, used by the sticky category links. */
export const categoryAnchor = (id: string) => `cat-${id}`;

export const featuredItems: readonly MenuItem[] = menu
  .filter((item) => item.featured !== undefined)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

import { useSyncExternalStore } from "react";
import { menu, menuById, type MenuItem } from "@/data/menu";

/** Item id → quantity. */
export type BasketLines = Readonly<Record<string, number>>;

export type BasketLine = { item: MenuItem; qty: number; subtotal: number | null };

export type BasketSummary = {
  lines: BasketLine[];
  count: number;
  /** Sum of the lines that have a price. */
  knownTotal: number;
  /** Number of lines whose price is not set yet. */
  unpricedLines: number;
};

const STORAGE_KEY = "iden-basket-v1";
const MAX_QTY = 99;
const EMPTY: BasketLines = Object.freeze({});

let lines: BasketLines = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

/** Drops unknown items (the menu may have changed) and bad quantities. */
function sanitize(value: unknown): BasketLines {
  if (!value || typeof value !== "object") return EMPTY;
  const clean: Record<string, number> = {};
  for (const [id, qty] of Object.entries(value)) {
    if (menuById.has(id) && Number.isInteger(qty) && qty > 0) clean[id] = Math.min(qty, MAX_QTY);
  }
  return Object.keys(clean).length > 0 ? clean : EMPTY;
}

function readStorage(): BasketLines {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  lines = readStorage();
}

function emit() {
  listeners.forEach((listener) => listener());
}

function commit(next: BasketLines) {
  lines = Object.keys(next).length > 0 ? next : EMPTY;
  try {
    if (lines === EMPTY) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Private mode or storage full: the basket still works for this visit.
  }
  emit();
}

/** Keeps several open tabs in sync. */
function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  lines = readStorage();
  emit();
}

function subscribe(listener: () => void) {
  ensureLoaded();
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return lines;
}

const getServerSnapshot = () => EMPTY;

export function useBasket(): BasketLines {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const basket = {
  add(id: string) {
    ensureLoaded();
    commit({ ...lines, [id]: Math.min((lines[id] ?? 0) + 1, MAX_QTY) });
  },
  setQty(id: string, qty: number) {
    ensureLoaded();
    if (qty <= 0) return basket.remove(id);
    commit({ ...lines, [id]: Math.min(qty, MAX_QTY) });
  },
  remove(id: string) {
    ensureLoaded();
    const next: Record<string, number> = {};
    for (const [key, qty] of Object.entries(lines)) if (key !== id) next[key] = qty;
    commit(next);
  },
  clear() {
    commit(EMPTY);
  },
};

/** Lines in menu order, with totals. */
export function summarize(current: BasketLines): BasketSummary {
  const result: BasketSummary = { lines: [], count: 0, knownTotal: 0, unpricedLines: 0 };
  for (const item of menu) {
    const qty = current[item.id];
    if (!qty) continue;
    const subtotal = item.price === null ? null : item.price * qty;
    result.lines.push({ item, qty, subtotal });
    result.count += qty;
    if (subtotal === null) result.unpricedLines += 1;
    else result.knownTotal += subtotal;
  }
  return result;
}

import { useSyncExternalStore } from "react";
import { createStore } from "@/lib/store";

// ── Toast ───────────────────────────────────────────────
export type Toast = { id: number; message: string };
export const toastStore = createStore<Toast | null>(null);

// ── Basket sheet ────────────────────────────────────────
export const sheetStore = createStore(false);
export const openBasket = () => {
  // Don't carry an "added to basket" toast into the sheet.
  toastStore.set(null);
  sheetStore.set(true);
};
export const closeBasket = () => sheetStore.set(false);

const TOAST_MS = 4200;
let toastId = 0;
let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function showToast(message: string) {
  const id = ++toastId;
  toastStore.set({ id, message });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (toastStore.get()?.id === id) toastStore.set(null);
  }, TOAST_MS);
}

// ── Clipboard ───────────────────────────────────────────
/** Copies text, falling back to execCommand for older or insecure contexts. */
export function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        () => true,
        () => legacyCopy(text),
      );
    }
  } catch {
    // fall through
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text: string): boolean {
  try {
    // Inside a modal dialog everything else is inert, so the textarea must live in the dialog.
    const host = document.querySelector("dialog[open]") ?? document.body;
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    host.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

// ── Scroll & time ───────────────────────────────────────
function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/** True once the page has scrolled past `threshold` pixels. False during SSR. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

function subscribeMinute(callback: () => void) {
  const interval = setInterval(callback, 20_000);
  document.addEventListener("visibilitychange", callback);
  return () => {
    clearInterval(interval);
    document.removeEventListener("visibilitychange", callback);
  };
}

/**
 * Current minute as a timestamp, or null while server rendering, so the
 * prerendered HTML never bakes in a stale "open/closed" state.
 */
export function useCurrentMinute(): number | null {
  return useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
}

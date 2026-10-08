"use client";

import { site } from "@/content/site";
import { basket, useBasket } from "@/lib/basket";
import { cx } from "@/lib/format";
import { showToast } from "@/lib/ui";
import { Icon } from "./Icon";

type Props = { id: string; name: string; large?: boolean; onDark?: boolean };

export function AddButton({ id, name, large = false, onDark = false }: Props) {
  const qty = useBasket()[id] ?? 0;

  return (
    <button
      type="button"
      onClick={() => {
        basket.add(id);
        showToast(site.basket.added(name));
      }}
      aria-label={qty > 0 ? site.menu.addMore(name, qty) : site.menu.add(name)}
      className={cx(
        "relative grid shrink-0 place-items-center rounded-full shadow-soft transition duration-200 active:scale-95",
        onDark ? "bg-cream text-forest hover:bg-white" : "bg-forest text-cream hover:bg-forest-deep",
        large ? "size-12" : "size-11",
      )}
    >
      <Icon name="plus" className={large ? "size-6" : "size-5"} />
      {qty > 0 && (
        <span
          key={qty}
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-matcha px-1.5 text-xs font-extrabold text-ink ring-2 ring-cream-soft motion-safe:animate-bump"
        >
          {qty}
        </span>
      )}
    </button>
  );
}

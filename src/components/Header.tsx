"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { useBasket } from "@/lib/basket";
import { cx } from "@/lib/format";
import { openBasket, useScrolledPast } from "@/lib/ui";
import { Icon } from "./Icon";

export function Header() {
  const compact = useScrolledPast(24);
  const count = Object.values(useBasket()).reduce((sum, qty) => sum + qty, 0);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 border-b transition-[height,background-color,border-color,box-shadow] duration-300",
        compact
          ? "h-15 border-sand/80 bg-cream/90 shadow-[0_8px_24px_-14px_rgb(31_42_34/0.3)] backdrop-blur-md"
          : "h-18 border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 rounded-full">
          <Image
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            loading="eager"
            className={cx(
              "rounded-full transition-[width,height] duration-300",
              compact ? "size-9" : "size-11",
            )}
          />
          <span className="flex flex-col">
            <span className="font-display text-[1.65rem] leading-[0.85] font-semibold tracking-tight text-forest">
              {site.brand.short}
            </span>
            <span className="text-[0.625rem] font-bold tracking-[0.2em] text-ink-soft uppercase">
              {site.brand.sub}
            </span>
          </span>
        </a>

        <nav aria-label={site.a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold text-ink-soft transition-colors hover:text-forest"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={openBasket}
          aria-label={count > 0 ? site.header.orderWithCount(count) : undefined}
          className="relative inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-bold text-cream transition-colors hover:bg-forest-deep"
        >
          <Icon name="bag" className="size-4.5" />
          {site.header.order}
          {count > 0 && (
            <span
              key={count}
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 grid h-6 min-w-6 place-items-center rounded-full bg-matcha px-1.5 text-xs font-extrabold text-ink ring-2 ring-cream motion-safe:animate-bump"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

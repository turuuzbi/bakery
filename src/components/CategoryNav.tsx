"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { categoryAnchor } from "@/data/menu";
import { cx } from "@/lib/format";

type Category = { id: string; label: string };

/** Header (60px) + this nav (~66px) + a little air. */
const BAND_TOP = 150;

/** Sticky, horizontally scrollable category links. The active one follows the scroll. */
export function CategoryNav({ categories }: { categories: readonly Category[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const scroller = useRef<HTMLDivElement>(null);
  // After a tap, ignore the observer while the smooth scroll passes other sections.
  const lockedUntil = useRef(0);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(categoryAnchor(c.id)))
      .filter((el): el is HTMLElement => el !== null);
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (performance.now() < lockedUntil.current) return;
        const current = sections.find((s) => visible.has(s.id)) ??
          // Scrolled back up above the menu: reset to the first category.
          (sections[0] && sections[0].getBoundingClientRect().top > BAND_TOP ? sections[0] : undefined);
        const id = current?.dataset.category;
        if (id) setActive(id);
      },
      // A band just under the sticky header + this nav.
      { rootMargin: `-${BAND_TOP}px 0px -50% 0px` },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Keep the active tab in view inside the horizontal strip.
  useEffect(() => {
    const strip = scroller.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!strip || !tab) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active]);

  return (
    <nav
      aria-label={site.menu.categoriesNav}
      className="sticky top-15 z-30 mt-8 border-y border-sand/80 bg-cream/90 backdrop-blur-md"
    >
      <div ref={scroller} className="container-page no-scrollbar relative flex gap-2 overflow-x-auto py-2.5">
        {categories.map((c) => {
          const isActive = c.id === active;
          return (
            <a
              key={c.id}
              href={`#${categoryAnchor(c.id)}`}
              data-id={c.id}
              aria-current={isActive ? "true" : undefined}
              onClick={() => {
                lockedUntil.current = performance.now() + 900;
                setActive(c.id);
              }}
              className={cx(
                "inline-flex h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200",
                isActive
                  ? "bg-forest text-cream shadow-soft"
                  : "bg-cream-soft text-ink-soft ring-1 ring-sand hover:text-forest",
              )}
            >
              {c.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

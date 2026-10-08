import Image from "next/image";
import { site } from "@/content/site";
import { business } from "@/data/business";
import { telUrl } from "@/lib/order";

export function Footer() {
  return (
    <footer className="defer-render bg-forest-night text-cream">
      <div className="container-page grid gap-8 pt-12 pb-8 sm:grid-cols-[1.5fr_1fr]">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt={site.brand.logoAlt} width={64} height={64} className="size-16 rounded-full" />
          <div>
            <p className="font-display text-[1.75rem] leading-none font-semibold">{site.brand.name}</p>
            <p className="mt-2 text-[0.6875rem] font-bold tracking-[0.3em] text-matcha uppercase">{site.brand.tagline}</p>
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-semibold sm:justify-end">
          {site.nav.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="inline-flex min-h-11 items-center text-cream/90 hover:text-cream">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={telUrl()} className="inline-flex min-h-11 items-center text-cream/90 hover:text-cream">
              {business.phones[0].display}
            </a>
          </li>
          <li>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-cream/90 hover:text-cream"
            >
              {business.instagram.handle}
              <span className="sr-only">{site.info.newTab}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 pt-5 pb-28 text-xs text-cream/75">
          <p>© {site.footer.rights}</p>
          <p>{site.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}

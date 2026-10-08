import Image from "next/image";
import { site } from "@/content/site";
import { business } from "@/data/business";
import { cx } from "@/lib/format";
import { telUrl, viberChatUrl } from "@/lib/order";
import { HoursList } from "./HoursList";
import { Icon, type IconName } from "./Icon";
import { OpenBadge } from "./OpenBadge";
import { button, card } from "./styles";

export function Info() {
  const t = site.info;

  return (
    <section id="info" aria-labelledby="info-title" className="defer-render py-16 sm:py-24">
      <div className="container-page">
        <div className="reveal">
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-forest uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-forest/50" />
            {t.eyebrow}
          </p>
          <h2 id="info-title" className="mt-3 font-display text-[2.5rem] leading-[1.02] font-semibold text-ink sm:text-5xl">
            {t.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Address + storefront photo */}
          <article className={cx(card, "reveal overflow-hidden md:row-span-2 lg:row-span-1")}>
            <div className="relative aspect-4/3 bg-sand">
              <Image
                src="/interior.jpg"
                alt={t.storefrontAlt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 46vw, 100vw"
                className="object-cover object-[50%_38%]"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-cream-soft/95 px-3 py-1.5 text-xs font-bold text-forest shadow-soft">
                {t.storefrontCaption}
              </span>
            </div>
            <div className="p-5 sm:p-6">
              <CardTitle icon="pin">{t.addressTitle}</CardTitle>
              <address className="mt-3 text-[0.9375rem] leading-relaxed text-ink not-italic">
                {business.address.street}
                <br />
                {business.address.city}
              </address>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{business.address.directions}</p>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(button.secondary, "mt-5 w-full sm:w-auto")}
              >
                <Icon name="pin" className="size-4" />
                {t.map}
                <span className="sr-only">{t.newTab}</span>
              </a>
            </div>
          </article>

          {/* Hours */}
          <article className={cx(card, "reveal p-5 sm:p-6")}>
            <CardTitle icon="clock">{t.hoursTitle}</CardTitle>
            <div className="mt-4">
              <OpenBadge compact />
            </div>
            <div className="mt-3">
              <HoursList />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-soft">{t.holidayNote}</p>
          </article>

          {/* Contact */}
          <article className={cx(card, "reveal p-5 sm:p-6")}>
            <CardTitle icon="phone">{t.contactTitle}</CardTitle>
            <ul className="mt-3 divide-y divide-sand/80">
              {business.phones.map((phone) => (
                <li key={phone.tel}>
                  <ContactLink href={telUrl(phone.tel)} icon="phone" label={t.phone} value={phone.display} />
                </li>
              ))}
              <li>
                <ContactLink href={viberChatUrl()} icon="viber" label={t.viber} value={t.viberAction} />
              </li>
              <li>
                <ContactLink
                  href={business.instagram.url}
                  icon="instagram"
                  label={t.instagram}
                  value={business.instagram.handle}
                  external
                />
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function CardTitle({ icon, children }: { icon: IconName; children: string }) {
  return (
    <h3 className="flex items-center gap-2.5 font-display text-[1.6rem] leading-none font-semibold text-ink">
      <span className="grid size-9 place-items-center rounded-full bg-matcha-soft text-forest">
        <Icon name={icon} className="size-4.5" />
      </span>
      {children}
    </h3>
  );
}

type ContactLinkProps = { href: string; icon: IconName; label: string; value: string; external?: boolean };

function ContactLink({ href, icon, label, value, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex min-h-14 items-center gap-3 py-2"
    >
      <Icon name={icon} className="size-5 shrink-0 text-forest" />
      <span className="flex flex-col">
        <span className="text-xs font-semibold text-ink-soft">{label}</span>
        <span className="font-bold text-ink transition-colors group-hover:text-forest">{value}</span>
      </span>
      <Icon name="arrow" className="ml-auto size-4 text-ink-soft transition-transform group-hover:translate-x-0.5" />
      {external && <span className="sr-only">{site.info.newTab}</span>}
    </a>
  );
}

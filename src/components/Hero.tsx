import Image from "next/image";
import { site } from "@/content/site";
import { business } from "@/data/business";
import { cx } from "@/lib/format";
import { telUrl } from "@/lib/order";
import { Icon } from "./Icon";
import { OpenBadge } from "./OpenBadge";
import { OrderButton } from "./OrderButton";
import { button } from "./styles";

export function Hero() {
  const h = site.hero;
  const phone = business.phones[0];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative pt-18">
      <div className="container-page grid items-center gap-10 pt-5 pb-12 sm:pt-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:pt-12 lg:pb-16">
        <div>
          <div className="motion-safe:animate-rise">
            <OpenBadge />
          </div>
          <h1
            id="hero-title"
            className="mt-5 font-display text-[3.4rem] leading-[0.9] font-semibold tracking-[-0.015em] text-ink motion-safe:animate-rise motion-safe:[animation-delay:40ms] sm:text-7xl lg:text-[5.75rem]"
          >
            <span className="block">{h.titleTop}</span>
            <span className="block text-forest">{h.titleBottom}</span>
          </h1>
          {/* Set like the ring text on the logo. */}
          <p className="mt-5 flex items-center gap-3 text-[0.8125rem] font-bold tracking-[0.3em] text-forest uppercase motion-safe:animate-rise motion-safe:[animation-delay:80ms]">
            <span aria-hidden="true" className="h-px w-8 bg-forest/50" />
            {h.tagline}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-ink-soft motion-safe:animate-rise motion-safe:[animation-delay:120ms] sm:text-lg">
            {h.lead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
            <a href="#menu" className={button.primary}>
              {h.ctaMenu}
              <Icon name="arrow" className="size-4" />
            </a>
            <OrderButton className={button.secondary}>
              <Icon name="bag" className="size-4.5" />
              {h.ctaOrder}
            </OrderButton>
          </div>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-ink-soft motion-safe:animate-rise motion-safe:[animation-delay:160ms]">
            {h.callPrefix}
            <a
              href={telUrl(phone.tel)}
              className="inline-flex min-h-11 items-center gap-1.5 font-bold text-forest underline decoration-matcha decoration-2 underline-offset-4 hover:decoration-forest"
            >
              <Icon name="phone" className="size-4" />
              {phone.display}
            </a>
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-120">
      <div className="relative aspect-10/11">
        {/* Depth comes from gradients, not box-shadows: blurred shadows over large photos
            are slow to rasterize on phones without GPU raster, delaying first paint. */}
        <div
          aria-hidden="true"
          className="absolute top-[2%] right-[-12%] size-[95%] rounded-full bg-[radial-gradient(closest-side,rgb(168_196_154/0.55),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-4%] bottom-[-4%] h-[12%] w-[80%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(31_42_34/0.28),transparent)]"
        />
        <div
          className="absolute top-0 right-0 h-full w-[72%] overflow-hidden bg-sand ring-1 ring-ink/10"
          // A true semicircle on top: horizontal radius 50% of the width; vertical radius
          // is the same length as a share of the height (0.36 / 1.1 for this 10:11 box).
          // `rounded-t-full` would make the browser scale the bottom corners down to zero.
          style={{ borderRadius: "50% 50% 2rem 2rem / 32.73% 32.73% 2rem 2rem" }}
        >
          <Image
            src="/menu/tres-leches.jpg"
            alt={site.hero.imageAlt}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 72vw"
            // The LCP element: preloaded from <head> at high priority.
            preload
            fetchPriority="high"
            className="object-cover object-[50%_60%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-[-1%] left-[2%] h-[10%] w-[44%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(31_42_34/0.3),transparent)]"
        />
        <div className="absolute bottom-[5%] left-0 aspect-square w-[46%] -rotate-3 overflow-hidden rounded-[1.75rem] border-[6px] border-cream-soft bg-sand ring-1 ring-ink/10">
          <Image
            src="/hero/matcha-tiramisu-crop.jpg"
            alt={site.hero.insetAlt}
            fill
            sizes="(min-width: 1024px) 14rem, (min-width: 640px) 13rem, 44vw"
            className="object-cover"
          />
        </div>
        <Stamp className="absolute top-[7%] left-[2%] w-[31%]" />
      </div>
    </div>
  );
}

/** Round "IDEN BAKERY • ӨДӨР БҮР ШИНЭХЭН" seal with the logo in the middle. */
function Stamp({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cx("aspect-square", className)}>
      <div className="relative size-full rounded-full bg-cream-soft ring-1 ring-ink/10">
        <svg viewBox="0 0 120 120" className="stamp-spin absolute inset-0 size-full">
          <defs>
            <path id="stamp-ring" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
          </defs>
          <text className="fill-forest font-sans text-[10px] font-bold uppercase">
            <textPath href="#stamp-ring" textLength="282" lengthAdjust="spacing">
              {site.hero.stamp}
            </textPath>
          </text>
        </svg>
        <Image
          src="/logo.png"
          alt=""
          width={150}
          height={150}
          sizes="80px"
          className="absolute top-1/2 left-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  );
}

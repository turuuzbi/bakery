import { site } from "@/content/site";

/** Three-step "how ordering works" band. */
export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="defer-render relative overflow-hidden bg-forest text-cream">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(168_196_154/0.28),transparent)]"
      />
      <div className="container-page relative py-12 sm:py-16">
        <h2 id="steps-title" className="reveal font-display text-[2.25rem] leading-tight font-semibold sm:text-[2.75rem]">
          {site.steps.title}
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {site.steps.items.map((step, i) => (
            <li key={step.title} className="reveal flex gap-4">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full border border-cream/35 text-lg font-bold text-matcha tabular-nums"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-cream/90">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

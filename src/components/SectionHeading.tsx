import { cx } from "@/lib/format";

type Props = { id: string; eyebrow: string; title: string; lead?: string; className?: string };

export function SectionHeading({ id, eyebrow, title, lead, className }: Props) {
  return (
    <div className={cx("reveal max-w-2xl", className)}>
      <p className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-forest uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-forest/50" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 font-display text-[2.5rem] leading-[1.02] font-semibold text-balance text-ink sm:text-5xl">
        {title}
      </h2>
      {lead && <p className="mt-3 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">{lead}</p>}
    </div>
  );
}

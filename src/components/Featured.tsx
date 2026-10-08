import { site } from "@/content/site";
import { featuredItems, type MenuItem } from "@/data/menu";
import { AddButton } from "./AddButton";
import { Price } from "./Price";
import { ProductImage } from "./ProductImage";
import { SectionHeading } from "./SectionHeading";
import { TagList } from "./TagChip";

/** "Онцлох": the signature matcha cookie and the bestsellers. Swipeable on phones. */
export function Featured() {
  return (
    <section id="featured" aria-labelledby="featured-title" className="defer-render py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading
          id="featured-title"
          eyebrow={site.featured.eyebrow}
          title={site.featured.title}
          lead={site.featured.lead}
        />
      </div>
      <ul className="container-page no-scrollbar mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto pb-6 after:w-px after:shrink-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:after:hidden">
        {featuredItems.map((item) => (
          <li key={item.id} className="w-[78%] max-w-xs shrink-0 snap-start md:w-auto md:max-w-none">
            <FeaturedCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FeaturedCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream-soft shadow-soft ring-1 ring-ink/5 transition duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1">
      <div className="relative">
        <ProductImage
          item={item}
          sizes="(min-width: 1024px) 350px, (min-width: 768px) 31vw, 78vw"
          className="aspect-4/5"
        />
        <TagList tags={item.tags} className="absolute top-3.5 left-3.5" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.75rem] leading-none font-semibold text-ink">{item.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <Price value={item.price} />
          <AddButton id={item.id} name={item.name} large />
        </div>
      </div>
    </article>
  );
}

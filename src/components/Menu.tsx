import { site } from "@/content/site";
import { categories, categoryAnchor, menu, type MenuItem } from "@/data/menu";
import { telUrl, viberChatUrl } from "@/lib/order";
import { AddButton } from "./AddButton";
import { CategoryNav } from "./CategoryNav";
import { Icon } from "./Icon";
import { Price } from "./Price";
import { ProductImage } from "./ProductImage";
import { SectionHeading } from "./SectionHeading";
import { TagList } from "./TagChip";
import { button } from "./styles";

export function Menu() {
  const groups = categories
    .map((category) => ({ ...category, items: menu.filter((item) => item.category === category.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="menu" aria-labelledby="menu-title" className="pt-16 pb-6 sm:pt-24">
      <div className="container-page">
        <SectionHeading id="menu-title" eyebrow={site.menu.eyebrow} title={site.menu.title} lead={site.menu.lead} />
      </div>

      <CategoryNav categories={groups.map(({ id, label }) => ({ id, label }))} />

      <div className="container-page">
        {groups.map((group) => (
          <section
            key={group.id}
            id={categoryAnchor(group.id)}
            data-category={group.id}
            aria-labelledby={`${categoryAnchor(group.id)}-title`}
            className="defer-render scroll-mt-36 pt-10 pb-4 sm:pt-14"
          >
            <h3
              id={`${categoryAnchor(group.id)}-title`}
              className="reveal border-b border-sand pb-3 font-display text-[1.9rem] leading-none font-semibold text-ink"
            >
              {group.label}
            </h3>
            {group.id === "custom" ? (
              <CustomOrderBanner items={group.items} />
            ) : (
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <MenuCard item={item} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group reveal flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-cream-soft shadow-soft ring-1 ring-ink/5 transition duration-300 hover:shadow-lift motion-safe:hover:-translate-y-1 sm:rounded-3xl">
      <div className="relative">
        <ProductImage
          item={item}
          sizes="(min-width: 1024px) 260px, (min-width: 768px) 31vw, 47vw"
          className="aspect-square"
        />
        <TagList tags={item.tags} className="absolute top-2 left-2 sm:top-3 sm:left-3" />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h4 className="font-display text-[1.3rem] leading-[1.05] font-semibold text-ink sm:text-[1.45rem]">
          {item.name}
        </h4>
        <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-snug text-ink-soft">{item.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <Price value={item.price} />
          <AddButton id={item.id} name={item.name} />
        </div>
      </div>
    </article>
  );
}

/** Custom cakes get a wide banner with a direct "send us your design" call to action. */
function CustomOrderBanner({ items }: { items: readonly MenuItem[] }) {
  const c = site.menu.customCake;
  const [lead] = items;

  return (
    <div className="reveal mt-5 grid overflow-hidden rounded-[1.75rem] bg-forest text-cream shadow-lift md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative md:min-h-96">
        <ProductImage
          item={lead}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto"
        />
        <TagList tags={lead.tags} className="absolute top-3.5 left-3.5" />
      </div>
      <div className="flex flex-col p-6 sm:p-8">
        <p className="font-display text-[2rem] leading-none font-semibold text-balance">{c.title}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-cream/90">{c.text}</p>

        <ul className="mt-5 divide-y divide-cream/15 border-y border-cream/15">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-display text-[1.4rem] leading-tight font-semibold">{item.name}</h4>
                <p className="text-[0.8125rem] text-cream/90">{item.description}</p>
              </div>
              <Price value={item.price} onDark />
              <AddButton id={item.id} name={item.name} onDark />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <a href={viberChatUrl()} className={button.onDark}>
            <Icon name="viber" className="size-5" />
            {c.viber}
          </a>
          <a href={telUrl()} className={button.outlineOnDark}>
            <Icon name="phone" className="size-4" />
            {c.call}
          </a>
        </div>
      </div>
    </div>
  );
}

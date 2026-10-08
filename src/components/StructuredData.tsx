import { site } from "@/content/site";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site-url";

const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** schema.org Bakery data, so search engines can show hours, phone and address. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: business.name,
    slogan: site.brand.tagline,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/opengraph-image`,
    telephone: business.phones[0].tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressCountry: "MN",
    },
    openingHoursSpecification: business.hours.flatMap((hours, day) =>
      hours
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: `https://schema.org/${SCHEMA_DAYS[day]}`,
              opens: hours.open,
              closes: hours.close,
            },
          ]
        : [],
    ),
    sameAs: [business.instagram.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

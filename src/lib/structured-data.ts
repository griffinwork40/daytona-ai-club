import { site, siteUrl } from "@/config/site";

/**
 * schema.org Organization for the club. Only states what is known:
 * no address, no contact point, and no social links until they exist.
 */
export function organizationStructuredData() {
  const origin = siteUrl();
  const sameAs = [site.links.luma, site.links.discord, site.links.github].filter(
    (link): link is string => Boolean(link),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: origin,
    description: site.description,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.organizer.name },
    areaServed: `${site.city}, ${site.region}`,
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

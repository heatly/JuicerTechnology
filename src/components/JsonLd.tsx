import { site } from "@/content/site";
import { getCity } from "@/content/cities";
import type { JuicerEvent } from "@/content/events";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  email: site.email,
  sameAs: Object.values(site.social),
};

export function eventLd(e: JuicerEvent) {
  const city = getCity(e.city);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", addressLocality: city?.name, addressRegion: city?.state, addressCountry: "IN" } },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/events/${e.slug}`,
    isAccessibleForFree: true,
  };
}

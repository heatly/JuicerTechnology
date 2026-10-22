import type { Metadata } from "next";
import { IndiaMap } from "@/components/IndiaMap";
import { CityCard, PageHero, SectionHead } from "@/components/blocks";
import { Form } from "@/components/Form";
import { cities } from "@/content/cities";
import { events, isPast } from "@/content/events";

export const metadata: Metadata = { title: "Locations: AI meetups across India", description: "Juicer community chapters in Bengaluru, Hyderabad, Chennai, Mumbai, Pune, Delhi and Puducherry, plus software offices in Salem, Trichy, Karur and Tirupati.", alternates: { canonical: "/locations" } };

export default function Locations() {
  const upcoming = events.filter((e) => !isPast(e)).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  return (
    <>
      <PageHero eyebrow="Locations" title="Eleven cities," accent="one brand.">Community runs in Bengaluru, Hyderabad, Chennai, Mumbai, Pune, Delhi and Puducherry. Software teams work from Salem, Trichy, Karur and Tirupati. Find your chapter or bring community to your city.</PageHero>
      <section className="pb-20"><div className="container"><IndiaMap /></div></section>
      <section className="pb-24">
        <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => <CityCard key={c.slug} city={c} upcoming={upcoming.find((e) => e.city === c.slug)} />)}
        </div>
      </section>
      <section className="section border-t border-fg/10 bg-surface/40">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Not on the map?" title="Bring community to your city.">Tell us where you are. When enough builders in a city show interest, we open a chapter and help you lead it.</SectionHead>
          <Form type="bring-juicer" />
        </div>
      </section>
    </>
  );
}

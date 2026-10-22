export type City = {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
  /** live = community operations; office = Juicer software office, no community chapter yet */
  status: "live" | "office";
  lead?: { name: string; role: string };
  blurb: string;
  focus: string[];
};

// Community operations run in Bengaluru, Hyderabad, Chennai, Mumbai, Pune, Delhi and Puducherry.
// Salem, Trichy, Karur and Tirupati are Juicer software offices. Set status: "live" when a community chapter opens there.
export const cities: City[] = [
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.97, lon: 77.59, status: "live", lead: { name: "Chapter lead", role: "Bengaluru lead" }, blurb: "India's densest startup scene. Builders, founders and researchers shipping in the same week.", focus: ["AI agents", "Robotics", "Startups"] },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.39, lon: 78.49, status: "live", lead: { name: "Chapter lead", role: "Hyderabad lead" }, blurb: "Enterprise AI, deep tech and a huge student base. Where demos turn into pilots.", focus: ["GenAI", "Cloud", "Campus"] },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.08, lon: 80.27, status: "live", lead: { name: "Chapter lead", role: "Chennai lead" }, blurb: "Manufacturing muscle meets software talent. Home ground for hardware and Physical AI.", focus: ["Hardware", "Physical AI", "Automation"] },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.08, lon: 72.88, status: "live", lead: { name: "Chapter lead", role: "Mumbai lead" }, blurb: "India's commercial capital: founders, creators, finance and media in one fast city.", focus: ["Startups", "Fintech", "Creators"] },
  { slug: "pune", name: "Pune", state: "Maharashtra", lat: 18.52, lon: 73.86, status: "live", lead: { name: "Chapter lead", role: "Pune lead" }, blurb: "A deep engineering and student city with a strong product and automotive base.", focus: ["Engineering", "Campus", "Automation"] },
  { slug: "delhi", name: "Delhi", state: "Delhi NCR", lat: 28.61, lon: 77.21, status: "live", lead: { name: "Chapter lead", role: "Delhi lead" }, blurb: "The capital region: policy, enterprise and a fast-growing startup scene.", focus: ["Startups", "Enterprise AI", "Policy"] },
  { slug: "puducherry", name: "Puducherry", state: "Puducherry", lat: 11.93, lon: 79.83, status: "live", lead: { name: "Chapter lead", role: "Puducherry lead" }, blurb: "A compact, creative city with a remote-work community and a lively tech-night crowd.", focus: ["Creators", "Remote builders"] },
  { slug: "salem", name: "Salem", state: "Tamil Nadu", lat: 11.66, lon: 78.15, status: "office", blurb: "Home to a Juicer software office. Our engineers build here; a community chapter is the next step.", focus: ["Software engineering", "Embedded"] },
  { slug: "trichy", name: "Trichy", state: "Tamil Nadu", lat: 10.79, lon: 78.7, status: "office", blurb: "Home to a Juicer software office, in a city with top engineering institutes.", focus: ["Software engineering", "Robotics"] },
  { slug: "karur", name: "Karur", state: "Tamil Nadu", lat: 10.96, lon: 78.08, status: "office", blurb: "Home to a Juicer software office, in a textile and industry hub ready for automation.", focus: ["Software engineering", "Automation"] },
  { slug: "tirupati", name: "Tirupati", state: "Andhra Pradesh", lat: 13.63, lon: 79.42, status: "office", blurb: "Home to a Juicer software office, in a university town with rising student talent.", focus: ["Software engineering", "AI"] },
];
export const getCity = (s: string) => cities.find((c) => c.slug === s);

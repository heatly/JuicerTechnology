export type EventType = "meetup" | "hackathon" | "workshop" | "demo-day" | "bootcamp";
export type JuicerEvent = {
  slug: string;
  title: string;
  type: EventType;
  city: string;
  date: string;
  endDate?: string;
  venue: string;
  summary: string;
  description: string;
  tracks?: string[];
  prizes?: string[];
  featured?: boolean;
  past?: boolean;
  winners?: string[];
  capacity?: number;
};

// PLACEHOLDER events: edit dates/venues/details. `past` is derived from the date unless set.
export const events: JuicerEvent[] = [
  { slug: "juicer-hack-hyderabad-2026", title: "Juicer Hack: Agents in the Wild", type: "hackathon", city: "hyderabad", date: "2026-11-21T09:00:00+05:30", endDate: "2026-11-22T18:00:00+05:30", venue: "Venue to be announced, Hyderabad", featured: true,
    summary: "36 hours to build AI agents that do real work.",
    description: "Teams of up to four build working agents against a real problem statement. Mentors from industry, a demo round on Sunday, and prizes for the best builds.",
    tracks: ["Workflow agents", "Computer vision", "Physical AI data", "Open track"],
    prizes: ["Cash prizes for top 3", "Pilot with the Juicer Tech lab", "Swag for every team"], capacity: 300 },
  { slug: "chennai-ai-meetup-nov", title: "Chennai AI Builders Meetup", type: "meetup", city: "chennai", date: "2026-11-08T17:00:00+05:30", venue: "Venue to be announced, Chennai", featured: true,
    summary: "Lightning demos, one deep talk, and a lot of networking.",
    description: "Our monthly night for people building with AI. Five-minute demos from members, one longer technical talk, and open networking.", capacity: 120 },
  { slug: "bengaluru-robotics-workshop", title: "Robotics Workshop: From Sim to Servo", type: "workshop", city: "bengaluru", date: "2026-11-15T10:00:00+05:30", venue: "Venue to be announced, Bengaluru", featured: true,
    summary: "A hands-on day taking a robot arm from simulation to hardware.",
    description: "Bring a laptop. We cover simulation, control basics and getting a controller running on real hardware, guided by our robotics team.", capacity: 40 },
  { slug: "hyderabad-demo-day-dec", title: "Juicer Demo Day Hyderabad", type: "demo-day", city: "hyderabad", date: "2026-12-12T16:00:00+05:30", venue: "Venue to be announced, Hyderabad",
    summary: "Teams show what they built. Investors and partners in the room.",
    description: "Selected chapter projects present live to founders, investors and potential customers.", capacity: 200 },
  { slug: "campus-bootcamp-chennai", title: "Campus Bootcamp: Build Your First AI App", type: "bootcamp", city: "chennai", date: "2026-12-05T09:30:00+05:30", venue: "Partner campus, Chennai",
    summary: "A one-day bootcamp for students: idea to deployed app.",
    description: "Students go from an idea to a deployed AI app in one day with mentors from the Juicer community.", capacity: 150 },
  { slug: "chennai-ai-meetup-sep", title: "Chennai AI Builders Meetup (September)", type: "meetup", city: "chennai", date: "2026-09-13T17:00:00+05:30", venue: "Chennai", summary: "Our September edition.", description: "Past edition.", past: true },
  { slug: "juicer-hack-bengaluru-2026", title: "Juicer Hack Bengaluru", type: "hackathon", city: "bengaluru", date: "2026-08-23T09:00:00+05:30", venue: "Bengaluru", summary: "Our Bengaluru hackathon.", description: "Past edition.", past: true, winners: ["Add winners in src/content/events.ts"] },
];

export const isPast = (e: JuicerEvent) => e.past ?? new Date(e.date).getTime() < Date.now();
export const getEvent = (s: string) => events.find((e) => e.slug === s);
export const typeLabel: Record<EventType, string> = { meetup: "Meetup", hackathon: "Hackathon", workshop: "Workshop", "demo-day": "Demo day", bootcamp: "Bootcamp" };

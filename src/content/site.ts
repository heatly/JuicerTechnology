export const site = {
  name: "Juicer Technology",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://juicertechnology.com",
  tagline: "Community-powered. Invention-driven.",
  altTaglines: ["Where cities build the future.", "Squeeze more out of technology.", "Meetups to machines."],
  description:
    "Juicer Technology runs India's city-based builder community and invents AI software, robotics and Physical AI. Join a chapter, host an event, or pilot a project with us.",
  email: "hello@juicertechnology.com",
  social: {
    instagram: "https://instagram.com/juicertechnology",
    linkedin: "https://linkedin.com/company/juicertechnology",
    github: "https://github.com/juicertechnology",
    youtube: "https://youtube.com/@juicertechnology",
  },
};

// PLACEHOLDER: replace with real numbers (see docs/CONTENT-GUIDE.md). Kept in one place on purpose.
export const stats = [
  { label: "Cities", value: 11, suffix: "" },
  { label: "Meetups held", value: 120, suffix: "+" },
  { label: "Hackathons", value: 14, suffix: "" },
  { label: "Members", value: 6500, suffix: "+" },
  { label: "Products shipped", value: 9, suffix: "" },
];

export const nav = [
  {
    label: "Marketplace",
    href: "/marketplace",
    children: [
      { label: "Community & chapters", href: "/marketplace/community" },
      { label: "Events & hackathons", href: "/events" },
      { label: "Growth services", href: "/marketplace/services" },
      { label: "Swag & printing", href: "/marketplace/swag" },
    ],
  },
  {
    label: "Tech Ecosystem",
    href: "/tech",
    children: [
      { label: "AI Software", href: "/tech/ai-software" },
      { label: "Robotics", href: "/tech/robotics" },
      { label: "Physical AI", href: "/tech/physical-ai" },
      { label: "Innovation Lab", href: "/tech/lab" },
      { label: "Developers & Partners", href: "/tech/developers" },
    ],
  },
  { label: "Locations", href: "/locations" },
  { label: "Events", href: "/events" },
];

// PLACEHOLDER names
export const partners = ["Campus Labs", "Northwind Cloud", "Stacklane", "Orbit Ventures", "Kiln Studio", "Arcadia AI", "Metro Makers", "Foundry 9"];

export const testimonials = [
  // PLACEHOLDER quotes: replace with real, permissioned testimonials before launch.
  { quote: "Replace with a real member quote about their first Juicer meetup.", name: "Member name", role: "Role, City" },
  { quote: "Replace with a real organiser quote about the growth or swag service.", name: "Organiser name", role: "Role, Organisation" },
  { quote: "Replace with a real partner quote about piloting a project with the lab.", name: "Partner name", role: "Role, Company" },
];

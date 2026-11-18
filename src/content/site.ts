export const site = {
  name: "Juicer Technology",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://juicertechnology.com",
  tagline: "Real-world data for physical AI.",
  description:
    "Juicer Technology sources consented, first-person (egocentric) video of real work to train physical AI and robots, and builds robotics. License a dataset, commission a collection, or pilot a robot with us.",
  email: "hello@juicertechnology.com",
  social: {
    linkedin: "https://linkedin.com/company/juicertechnology",
    github: "https://github.com/juicertechnology",
    instagram: "https://instagram.com/juicertechnology",
  },
};

export const nav = [
  { label: "Egocentric Data", href: "/egocentric-data" },
  { label: "Robotics", href: "/robotics" },
  { label: "Jobs", href: "/apply" },
  { label: "Contact", href: "/contact" },
];

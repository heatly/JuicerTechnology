export const services = [
  { slug: "meta-google-ads", title: "Meta & Google Ads", icon: "Megaphone", short: "Paid campaigns that fill rooms and sign up users.", points: ["Audience research and creative testing", "Campaign setup, daily optimisation and reporting", "Pixel, conversion and UTM tracking set up properly"] },
  { slug: "shorts-reels", title: "Shorts & Reels Production", icon: "Clapperboard", short: "Script, shoot, edit, publish. One team, one week.", points: ["Hook-first scripts built around your event or product", "On-location shoot and fast-turnaround edit", "Publishing and caption support"] },
  { slug: "social-media", title: "Social Media Management", icon: "Share2", short: "A steady, on-brand presence without the overhead.", points: ["Monthly content calendar", "Community replies and moderation", "Creator collaborations and shoutouts"] },
  { slug: "event-launch-kit", title: "Event Launch Kits", icon: "Rocket", short: "Everything to announce and sell out an event.", points: ["Poster, reel teaser and registration page copy", "Email and WhatsApp announcement templates", "Promotion plan with a countdown schedule"] },
  { slug: "campaign-management", title: "Online Promotion & Campaigns", icon: "BarChart3", short: "End-to-end campaigns across channels, managed for you.", points: ["Channel strategy and budget split", "Weekly performance reviews", "Post-campaign report with learnings"] },
];

// PRICING: tier structure is set, amounts are not. Replace "Custom quote" with a price when decided.
export const tiers = [
  { name: "Starter", price: "Custom quote", for: "A single event or small launch", features: ["1 channel campaign", "Poster + 2 short videos", "Basic reporting"] },
  { name: "Growth", price: "Custom quote", for: "Startups and recurring events", featured: true, features: ["Meta + Google campaigns", "Weekly Reels production", "Social management", "Weekly reports"] },
  { name: "Event Pro", price: "Custom quote", for: "Large events and hackathons", features: ["Full launch kit", "On-site content crew", "Paid + creator promotion", "Merch bundle and print coordination"] },
];

export const portfolio = [
  // PLACEHOLDER case studies: replace with real client work.
  { title: "Hackathon launch campaign", result: "Describe the real outcome (registrations, reach).", tags: ["Ads", "Reels"] },
  { title: "Campus fest merch drop", result: "Describe quantity delivered and turnaround.", tags: ["Swag", "Print"] },
  { title: "Startup demo day promotion", result: "Describe attendance and press results.", tags: ["Social", "Launch kit"] },
];

export const swag = [
  { slug: "tshirts", name: "T-shirts", icon: "Shirt", note: "Cotton and dry-fit, screen or DTG print" },
  { slug: "hoodies", name: "Hoodies", icon: "Shirt", note: "Embroidery or print, fleece blends" },
  { slug: "stickers", name: "Stickers", icon: "Sticker", note: "Die-cut, vinyl, holographic" },
  { slug: "badges", name: "Badges", icon: "BadgeCheck", note: "Pin, button and name badges" },
  { slug: "lanyards", name: "Lanyards", icon: "IdCard", note: "Printed and woven, with holders" },
  { slug: "notebooks", name: "Notebooks", icon: "NotebookPen", note: "Custom covers and inner pages" },
  { slug: "posters", name: "Posters", icon: "Image", note: "A-series sizes, matte or gloss" },
  { slug: "standees", name: "Standees", icon: "PanelTop", note: "Roll-up and X-frame standees" },
  { slug: "banners", name: "Banners", icon: "Flag", note: "Flex and fabric, any size" },
  { slug: "tote-bags", name: "Tote bags", icon: "ShoppingBag", note: "Canvas and cotton, printed" },
];

import { cities } from "@/content/cities";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "number" | "url" | "checkbox";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
};

export type FormDef = { title: string; submit: string; success: string; fields: Field[] };

const cityOptions = cities.map((c) => c.name);
const name: Field = { name: "name", label: "Full name", required: true };
const email: Field = { name: "email", label: "Email", type: "email", required: true };
const phone: Field = { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true };
const city: Field = { name: "city", label: "City", type: "select", options: cityOptions, required: true };
const notes: Field = { name: "message", label: "Anything we should know", type: "textarea" };

export const forms: Record<string, FormDef> = {
  rsvp: { title: "RSVP", submit: "Reserve my seat", success: "You're on the list. Check your email for details.", fields: [name, email, { ...phone, required: false }, { name: "guests", label: "Number of seats", type: "number", placeholder: "1" }] },
  hackathon: { title: "Register for the hackathon", submit: "Register team", success: "Registration received. We'll confirm by email.", fields: [name, email, phone, { name: "team", label: "Team name", required: true }, { name: "members", label: "Team size", type: "select", options: ["1 (solo)", "2", "3", "4"], required: true }, { name: "track", label: "Track", type: "select", options: [], required: true }, { name: "background", label: "Your background and what you plan to build", type: "textarea" }] },
  quote: { title: "Request a quote", submit: "Send quote request", success: "Quote request received. We reply within one working day.", fields: [name, email, phone, { name: "org", label: "Organisation / event", required: true }, { name: "category", label: "What do you need?", type: "select", options: ["Swag & printing", "Ads & promotion", "Reels & shorts", "Social media management", "Event launch kit", "Multiple"], required: true }, { name: "items", label: "Items and quantities", type: "textarea", placeholder: "e.g. 200 T-shirts (M/L/XL), 500 stickers, 2 standees", required: true }, { name: "deadline", label: "Needed by", placeholder: "Date or event date" }, { name: "designLink", label: "Design file link (Drive, Figma, Dropbox)", type: "url", hint: "Share a link. We'll prepare mockups from it." }] },
  partner: { title: "Partner or invest", submit: "Send inquiry", success: "Thanks. Someone from the team will reach out.", fields: [name, email, { name: "org", label: "Organisation", required: true }, { name: "interest", label: "I'm interested in", type: "select", options: ["Sponsoring events", "Technology partnership", "Investing", "Hiring / talent", "Other"], required: true }, { name: "message", label: "Tell us more", type: "textarea", required: true }] },
  "chapter-lead": { title: "Become a chapter lead", submit: "Apply to lead", success: "Application received. We'll set up a call.", fields: [name, email, phone, { ...city, options: [...cityOptions, "Another city"] }, { name: "otherCity", label: "If another city, which one?" }, { name: "experience", label: "Communities or events you've organised", type: "textarea", required: true }, { name: "why", label: "Why do you want to lead a chapter?", type: "textarea", required: true }, { name: "linkedin", label: "LinkedIn or portfolio URL", type: "url" }] },
  pilot: { title: "Pilot a project with us", submit: "Propose a pilot", success: "Thanks. Our lab team will reply with next steps.", fields: [name, email, { name: "org", label: "Company / institution", required: true }, { name: "area", label: "Area", type: "select", options: ["AI software", "Robotics", "Physical AI", "Computer vision", "Not sure"], required: true }, { name: "problem", label: "What problem do you want to solve?", type: "textarea", required: true }, { name: "timeline", label: "Target timeline" }] },
  work: { title: "Work with us", submit: "Send", success: "Thanks. We'll be in touch.", fields: [name, email, { name: "role", label: "I'm a", type: "select", options: ["Researcher", "Engineer", "Designer", "Student", "Other"], required: true }, { name: "link", label: "GitHub / portfolio", type: "url" }, { name: "message", label: "What would you like to work on?", type: "textarea", required: true }] },
  "physical-ai": { title: "Register for Physical AI", submit: "Register", success: "You are on the list. Your local hub will contact the number you gave.", fields: [name, { ...phone }, city, { name: "role", label: "I want to be a", type: "select", options: ["Wearer", "Operator", "City lead"], required: true }, { ...email, required: false }, notes, { name: "consent", label: "I agree to be contacted. I understand nothing is recorded until I sign a separate consent form.", type: "checkbox", required: true }] },
  "join-community": { title: "Join the community", submit: "Join Juicer", success: "Welcome to Juicer. We'll send your chapter's next event.", fields: [name, email, { ...phone, required: false }, city, { name: "interest", label: "I'm into", type: "select", options: ["AI software", "Robotics", "Startups", "Design & content", "Campus / student"] }] },
  "bring-juicer": { title: "Bring Juicer to your city", submit: "Request a chapter", success: "Noted. We'll tell you when your city has enough interest.", fields: [name, email, { name: "city", label: "Your city", required: true }, { name: "message", label: "Why would your city be a great chapter?", type: "textarea" }] },
  chapter: { title: "Join this chapter", submit: "Join", success: "You're in. Watch your inbox for the next event.", fields: [name, email, { ...phone, required: false }] },
  contact: { title: "Get in touch", submit: "Send message", success: "Message sent. We'll reply soon.", fields: [name, email, { name: "message", label: "Message", type: "textarea", required: true }] },
};

export type FormKey = keyof typeof forms;

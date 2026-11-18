export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "number" | "url" | "checkbox";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hint?: string;
  min?: number;
  max?: number;
};

export type FormDef = { title: string; submit: string; success: string; fields: Field[] };

const name: Field = { name: "name", label: "Full name", required: true };
const email: Field = { name: "email", label: "Work email", type: "email", required: true };

export const forms: Record<string, FormDef> = {
  apply: {
    title: "Apply now",
    submit: "Submit application",
    success: "Thank you! Our team will call you on the number you gave.",
    fields: [
      name,
      { name: "age", label: "Age", type: "number", required: true, min: 18, max: 65, hint: "You must be 18 or older." },
      { name: "phone", label: "Phone number (WhatsApp preferred)", type: "tel", required: true },
      { name: "twoWheeler", label: "Two-wheeler", type: "select", required: true, options: ["Yes, I have a two-wheeler", "No, but I can arrange one", "No"] },
      { name: "licence", label: "Driving licence", type: "select", required: true, options: ["Yes", "No"] },
      { name: "smartphone", label: "Do you have a smartphone?", type: "select", required: true, options: ["Yes", "No"] },
      { name: "location", label: "Location (city and area)", required: true, placeholder: "e.g. Chennai, Tambaram" },
      { name: "availability", label: "Work type you want", type: "select", required: true, options: ["Full-time (monthly)", "Part-time", "Per-day work"] },
      { name: "experience", label: "Any past field or sales work? (optional)", type: "textarea" },
      { name: "consent", label: "I agree to be contacted about this job. My details will be used only for hiring.", type: "checkbox", required: true },
    ],
  },
  "data-request": {
    title: "Request data",
    submit: "Send request",
    success: "Request received. Our data team will reply within two working days.",
    fields: [
      name,
      email,
      { name: "org", label: "Company / lab", required: true },
      { name: "need", label: "What do you need?", type: "select", required: true, options: ["License an existing dataset", "Commission a custom collection", "Both", "Not sure yet"] },
      { name: "tasks", label: "Tasks and environments", type: "textarea", required: true, placeholder: "e.g. kitchen prep, garment stitching, warehouse picking" },
      { name: "volume", label: "Approximate volume", type: "select", options: ["Under 100 hours", "100 to 1,000 hours", "1,000 to 10,000 hours", "10,000+ hours", "Not sure"] },
      { name: "timeline", label: "Timeline", placeholder: "e.g. first delivery in 8 weeks" },
    ],
  },
  contributor: {
    title: "Join as a contributor",
    submit: "Register",
    success: "You are on the list. Your local hub will contact the number you gave.",
    fields: [
      name,
      { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
      { name: "city", label: "City", required: true },
      { name: "role", label: "I want to be a", type: "select", required: true, options: ["Wearer (record my work)", "Operator (run a local hub)", "City lead"] },
      { name: "skill", label: "Your trade or skill", placeholder: "e.g. tailoring, cooking, welding" },
      { name: "email", label: "Email (optional)", type: "email" },
      { name: "consent", label: "I agree to be contacted. I understand nothing is recorded until I sign a separate consent form.", type: "checkbox", required: true },
    ],
  },
  pilot: {
    title: "Pilot a robot with us",
    submit: "Propose a pilot",
    success: "Thanks. Our robotics team will reply with next steps.",
    fields: [
      name,
      email,
      { name: "org", label: "Company / institution", required: true },
      { name: "area", label: "Interest", type: "select", required: true, options: ["Research platform", "Prototype", "Custom robotics project", "Teleoperation data", "Not sure"] },
      { name: "problem", label: "What should the robot do?", type: "textarea", required: true },
      { name: "timeline", label: "Target timeline" },
    ],
  },
  contact: {
    title: "Get in touch",
    submit: "Send message",
    success: "Message sent. We'll reply soon.",
    fields: [name, email, { name: "message", label: "Message", type: "textarea", required: true }],
  },
};

export type FormKey = keyof typeof forms;

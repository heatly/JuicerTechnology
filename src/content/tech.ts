// PLACEHOLDER: product names and descriptions are concept entries. Replace with your real inventions.
export const products = [
  { slug: "juicer-agents", name: "Juicer Agents", tag: "AI agents", status: "In development",
    problem: "Teams lose hours every week to repetitive multi-step work across tools.",
    solution: "A framework and set of ready agents that read, decide and act across your apps, with a human approval step where it matters.",
    demo: "Request a live demo from the team.", stack: ["Python", "TypeScript", "LLM APIs", "Vector search", "Postgres"] },
  { slug: "juicer-vision", name: "Juicer Vision", tag: "Computer vision", status: "Pilot-ready",
    problem: "Camera feeds are everywhere but almost none of the information in them is used.",
    solution: "Computer vision pipelines for counting, inspection and activity understanding, built per use case.",
    demo: "Request a live demo from the team.", stack: ["PyTorch", "ONNX", "OpenCV", "Edge devices"] },
  { slug: "juicer-flow", name: "Juicer Flow", tag: "Automation", status: "Internal use",
    problem: "Small teams run on spreadsheets, chats and manual follow-ups.",
    solution: "Workflow automation connecting forms, sheets, WhatsApp and email, with LLM steps for the messy parts.",
    demo: "Request a live demo from the team.", stack: ["Next.js", "Node", "Queues", "LLM APIs"] },
  { slug: "juicer-studio", name: "Juicer Studio", tag: "GenAI tools", status: "Concept",
    problem: "Creating event posters, reel scripts and copy is slow and inconsistent.",
    solution: "A generative toolkit for marketing assets that follows your brand kit, tied into the Marketplace services.",
    demo: "Request a live demo from the team.", stack: ["Diffusion models", "LLM APIs", "Next.js"] },
];
export const getProduct = (s: string) => products.find((p) => p.slug === s);

export const robotics = [
  { name: "Research platforms", text: "Modular robot platforms we use to test perception, control and learning in the real world.", status: "R&D" },
  { name: "Prototypes", text: "Rapid hardware prototypes built with our chapters' makers, from idea to working demo.", status: "Prototyping" },
  { name: "Custom robotics projects", text: "Scoped builds for partners: a robot for your workflow, from design to pilot.", status: "Open for pilots" },
];

export const roadmap = [
  { phase: "Now", items: ["Agent framework hardening", "Physical AI hub pilots in live cities", "Robotics research platform"] },
  { phase: "Next", items: ["Vision product pilots with partners", "Open-source release of selected tools", "Chapter maker spaces"] },
  { phase: "Later", items: ["Robot deployments with partners", "World-model data partnerships", "Developer platform GA"] },
];

export const notes = [
  { title: "Why first-person data matters for robots", date: "2026-10-01", summary: "Why machines need to watch people work, drawn from published research." },
  { title: "Designing agents with a human in the loop", date: "2026-09-12", summary: "Where to put approvals in an agent workflow so it stays fast and safe." },
];

// Physical AI: facts below come from https://ego.mom. That site lists no device specs, so none are given here.
export const physicalAI = {
  thesis: "Machines learned to talk by reading us. To understand the world, they have to watch us work.",
  sub: "Models can describe a kitchen but miss an object passing through a wall. Closing that gap takes first-person recordings of real work, made with consent and paid for.",
  gap: [
    { label: "Text", value: "15T tokens", note: "Llama 3 pretraining" },
    { label: "Images", value: "5.85B pairs", note: "LAION-5B" },
    { label: "Real tasks recorded", value: "~1M episodes", note: "Largest open set" },
  ],
  gapNote: "YouTube takes in 720,000 hours of video a day. The largest open first-person hand-at-work collections total about 7,000 hours.",
  why: [
    { n: "50%", t: "A coin flip", d: "Most models score about this on IntPhys 2 (2025) intuitive physics. People score near perfect.", href: "https://arxiv.org/abs/2506.09849" },
    { n: "33%", t: "Lost in a room", d: "The best model trails people (79%) on VSI-Bench (2024) questions about a room it watched on video.", href: "https://arxiv.org/abs/2412.14171" },
    { n: "25.7%", t: "Trained on the few", d: "Accuracy drop for a leading vision model on everyday objects from low-income homes vs wealthy ones (Dollar Street, 2023).", href: "https://arxiv.org/abs/2304.05391" },
    { n: "28%", t: "Asked first", d: "Share of the most active sources in one web training set that closed to AI use within a year (Consent in Crisis, 2024).", href: "https://arxiv.org/abs/2407.14933" },
    { n: "739M", t: "Shown, not told", d: "Adults who cannot read or write, two-thirds of them women (UNESCO).", href: "https://www.unesco.org/en/literacy/need-know" },
  ],
  proof: [
    { n: "1 hour", t: "Human footage works", d: "One extra hour of human first-person hand footage improved a learned skill more than an extra hour of machine-generated data (EgoMimic, 2024).", href: "https://arxiv.org/abs/2410.24221" },
    { n: "90%", t: "Variety beats volume", d: "Success in unseen places, learned from four people recording for one afternoon across many rooms and objects. Beyond a handful of recordings per place, variety helps and repetition does not (ICLR 2025).", href: "https://arxiv.org/abs/2410.18647" },
  ],
  belief: "Most trades are learned by watching and doing, and little of that knowledge is written down. A tailor's hands, a cook's timing, a mechanic's grip. Recording it with consent and pay puts both the work and the people in the data.",
  steps: [
    { t: "Register", d: "Sign up with your name, WhatsApp number and city. Nothing is recorded at this stage." },
    { t: "Meet your local hub", d: "A hub contacts you on the number you gave and explains how recording works." },
    { t: "Sign consent", d: "Recording starts only after a separate consent form is signed." },
    { t: "Wear and work", d: "Wear a device during tasks you already do. Paid per session." },
    { t: "Train world models", d: "Consented, varied first-person data helps models learn physical skills." },
  ],
  roles: [
    { t: "Wearer", d: "Record your work by wearing a device during tasks you already do. Paid per session." },
    { t: "Operator", d: "Fit devices and guide wearers with your local hub." },
    { t: "City lead", d: "Build and manage a hub. A paid lead role. Juicer chapters are the natural home for this." },
  ],
  trades: ["Tailoring", "Cooking", "Mechanics", "Carpentry", "Weaving", "Repair work", "Farming", "Care work"],
  sources: [
    ["Meta Llama 3", "https://ai.meta.com/blog/meta-llama-3/"],
    ["LAION-5B", "https://laion.ai/blog/laion-5b/"],
    ["Ego4D", "https://ego4d-data.org/"],
    ["Ego-Exo4D", "https://arxiv.org/abs/2311.18259"],
    ["EgoDex", "https://arxiv.org/abs/2505.11709"],
    ["EgoMimic", "https://arxiv.org/abs/2410.24221"],
  ] as [string, string][],
};

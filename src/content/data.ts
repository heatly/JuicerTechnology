// All figures below are rounded, industry-level approximations drawn from public sources
// (ego.mom and its cited studies, dataset releases from other providers). They describe the
// field, NOT Juicer's own output. Replace with Juicer's real numbers when you have them.

export const gap = [
  { label: "Web text used to train a leading LLM", value: "~15 trillion tokens", exp: 13.2, tone: "muted" },
  { label: "Largest public image-text set", value: "~6 billion pairs", exp: 9.8, tone: "muted" },
  { label: "Video uploaded to YouTube every day", value: "~700,000 hours", exp: 5.8, tone: "muted" },
  { label: "Largest open first-person hand-at-work sets", value: "~7,000 hours", exp: 3.85, tone: "hot" },
] as const;

export const modalities = [
  { icon: "Video", t: "First-person video", d: "Head-mounted RGB video of the task as the worker sees it." },
  { icon: "Layers", t: "Depth and RGBD", d: "Depth alongside colour for 3D scene understanding." },
  { icon: "Hand", t: "Hands and pose", d: "Hand and body motion for imitation learning." },
  { icon: "Mic", t: "Audio", d: "Sound of tools, materials and instructions in context." },
  { icon: "Activity", t: "Motion sensors", d: "IMU and head motion synchronised with the video." },
  { icon: "Gamepad2", t: "Teleoperation", d: "Human-guided robot demonstrations for policy training." },
  { icon: "Tags", t: "Annotation", d: "Actions, objects, steps and outcomes labelled by trained reviewers." },
  { icon: "ShieldCheck", t: "Consent and privacy", d: "Signed consent per contributor, with de-identification options." },
];

export const pipeline = [
  { icon: "ClipboardList", t: "Brief", d: "You define tasks, environments, volume and format." },
  { icon: "UsersRound", t: "Recruit and consent", d: "We find skilled contributors. Each signs a consent form before anything is recorded." },
  { icon: "Camera", t: "Capture", d: "Contributors wear a head-mounted rig during tasks they already do, at local hubs and on site." },
  { icon: "ScanSearch", t: "Review and annotate", d: "Trained reviewers check quality, blur identities where required and label the action." },
  { icon: "PackageCheck", t: "Deliver", d: "Datasets arrive in the format and schema you specify, with a data card." },
];

export const domains = [
  { icon: "Hammer", t: "Workshop trades", d: "Woodwork, metalwork, welding, repair." },
  { icon: "Shirt", t: "Textiles", d: "Tailoring, weaving, finishing." },
  { icon: "ChefHat", t: "Food and kitchen", d: "Cooking, prep, plating, cleaning." },
  { icon: "CircuitBoard", t: "Electronics", d: "Assembly, soldering, testing." },
  { icon: "Warehouse", t: "Logistics", d: "Picking, packing, loading." },
  { icon: "Wheat", t: "Agriculture", d: "Planting, harvesting, sorting." },
  { icon: "Home", t: "Household", d: "Daily living tasks in real homes." },
  { icon: "HeartHandshake", t: "Care work", d: "Assisting and handling with care." },
];

export const stances = [
  { icon: "BadgeCheck", t: "Consent first", d: "A separate, signed consent form comes before any recording. Contributors can ask questions at their local hub." },
  { icon: "Banknote", t: "Paid fairly", d: "Contributors are paid per session for the work they already do." },
  { icon: "EyeOff", t: "Privacy controls", d: "De-identification, such as face blurring, and access limits available per project." },
  { icon: "Boxes", t: "Variety by design", d: "Many people, places and objects instead of the same room recorded again and again." },
];

export const offers = [
  { icon: "Database", t: "License a dataset", d: "Start from existing collections for faster experiments. Ask for a sample and a data card.", cta: "Ask for a sample" },
  { icon: "Crosshair", t: "Commission a collection", d: "Tell us the tasks, places and volume. We recruit, capture, review and deliver to your spec.", cta: "Scope a collection" },
];

export const roboticsTracks = [
  { icon: "Cpu", t: "Research platforms", d: "Modular robot platforms for testing perception, control and learning on real tasks.", status: "R&D" },
  { icon: "Wrench", t: "Prototypes", d: "Fast hardware prototypes, from idea to a working demo you can see move.", status: "Prototyping" },
  { icon: "Handshake", t: "Custom robotics projects", d: "Scoped builds for partners: a robot for your workflow, taken from design to pilot.", status: "Open for pilots" },
];

export const loop = [
  { t: "Human skill", d: "People perform real tasks." },
  { t: "Egocentric data", d: "Captured, reviewed, labelled." },
  { t: "Policy training", d: "Models learn from demonstrations." },
  { t: "Robot trials", d: "Tested in sim, then on hardware." },
  { t: "Feedback", d: "Failures become new collection briefs." },
];

export const robotCapabilities = [
  "Imitation learning from first-person demonstrations",
  "Teleoperation data collection with human-guided arms",
  "Simulation and sim-to-real transfer",
  "Perception: depth, hand pose, object tracking",
  "Evaluation on real tasks, not only benchmarks",
  "Custom end-effectors and sensing rigs",
];

export const sources = [
  ["ego.mom", "https://ego.mom"],
  ["EgoMimic", "https://arxiv.org/abs/2410.24221"],
  ["Ego4D", "https://ego4d-data.org/"],
  ["EgoDex", "https://arxiv.org/abs/2505.11709"],
  ["IntPhys 2", "https://arxiv.org/abs/2506.09849"],
  ["VSI-Bench", "https://arxiv.org/abs/2412.14171"],
] as [string, string][];

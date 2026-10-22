# Juicer Technology: strategy, sitemap, brand and copy

## 1. ego.mom extraction summary
Source: https://ego.mom (a single 12-slide page; no sub-pages, no specs, no pricing).
- **Thesis:** "Ego data for world models." Machines learned language from text; to understand the physical world they need first-person recordings of people at work, made with consent and for pay.
- **The gap:** Llama 3 trained on 15T tokens; LAION-5B has 5.85B image pairs; the largest open set of recorded real tasks is about 1M episodes. YouTube gets 720,000 hours/day; the largest open first-person hand-at-work sets total about 7,000 hours.
- **Why (cited):** IntPhys 2 ~50% (coin flip); VSI-Bench best model 33% vs people 79%; Dollar Street 25.7% accuracy drop for low-income homes; Consent in Crisis 28% of active sources closed; UNESCO 739M adults who cannot read or write.
- **Proof:** EgoMimic (1 hour of human first-person footage beat 1 hour of machine data); ICLR 2025 (90% success in unseen places from four people recording for an afternoon; variety beats volume).
- **Belief:** trades are learned by watching and doing ("a tailor's hands, a cook's timing, a mechanic's grip").
- **Roles:** Wearer (paid per session), Operator (fits devices, guides wearers at a local hub), City lead (paid hub lead).
- **Registration:** name, WhatsApp, city, optional email/notes, consent to be contacted; nothing recorded until a separate consent form is signed.
- **Not published:** device specs, product details, pricing. None were invented; the site says so.

Mapping into Juicer: the three roles map onto Juicer chapters (city lead / operator = chapter team). **Assumption:** ego.mom is a Juicer program. If not, replace the Physical AI copy in `src/content/tech.ts`.

## 2. Positioning and taglines
Primary: **Community-powered. Invention-driven.**
Alternatives: "Where cities build the future." / "Squeeze more out of technology." / "Meetups to machines."

## 3. Sitemap
```
/                         Home
/marketplace              Pillar 1 overview
  /marketplace/community  Programs, chapters, lead application
  /marketplace/services   Growth services, tiers, case studies, quote
  /marketplace/swag       Catalog, mockup preview, order tracking, bulk quote
/events  /events/[slug]   Listing; RSVP or hackathon registration, Event schema
/chapters/[city]          8 city pages: events, lead, gallery, join / bring-Juicer
/locations                Map + city grid + bring-Juicer form
/tech                     Pillar 2 overview + roadmap
  /tech/ai-software  /tech/ai-software/[slug]   Products: problem, solution, demo, stack, CTA
  /tech/robotics
  /tech/physical-ai       Built from ego.mom
  /tech/lab               Roadmap, notes, GitHub, Work with us, Pilot
  /tech/developers        Docs, APIs, partner/investor inquiry
/join                     Member, partner, chapter-lead forms
```

## 4. Key user flows
- **Member:** Home → Join → form → email/Sheet → welcome.
- **Attendee:** Locations/Events → event → RSVP (or hackathon registration with track).
- **Chapter lead:** Community or city page → chapter-lead form → call → pilot meetup → chapter goes `live` in `cities.ts`.
- **Organiser:** Services/Swag → quote form (design link) → proof → order → tracking page.
- **Partner/pilot:** Tech → product or Lab → pilot form → scoping call.
- **Physical AI participant:** Physical AI → register (role) → hub contacts → separate consent → recording.

## 5. Brand and design system
**Logo:** the supplied orange mark (leaf, fruit, half-slice window) redrawn as vector in `src/components/Logo.tsx`, with three lockups: horizontal (header), stacked (footer, matches the original), mark-only (favicon, 404, floating graphics). Wordmark follows theme: white in dark, navy in light. Animated mode sways the leaf and draws the slice segments.
> Assumption: I rebuilt the mark from the image by eye. If you have the original SVG/PNG, drop it into `public/` and swap `LogoMark`.

**Palette (dark-first)**
| Token | Value | Use |
|---|---|---|
| bg | #090B11 | page |
| surface | #141824 | panels |
| lime | #C6FF3D | primary accent (leaf-derived), AA on dark |
| orange | #F58A12 | brand orange from logo, Marketplace warmth |
| volt | #3DE0FF | Tech Ecosystem accent |
| fg / muted | #F4F6FA / #A0A8BA | text (muted 7.9:1) |
| Light mode | bg #FAFAF6, fg navy #0F2034, accent text #3E6E00 | AA-checked |

Marketplace = lime→orange gradient, energetic. Tech = lime→volt gradient, precise grid and point-cloud motifs.

**Type:** Space Grotesk (display) + Inter (text). **Components:** Button (primary/volt/outline/ghost), glass Card, Badge, Form, Reveal, Tilt, SplitHeading, FloatingSlices, ScrollProgress, IndiaMap, CityCard, EventCard.
**Motion:** scroll reveals, word-by-word hero, tilt/spotlight portals, parallax slices, canvas neural mesh, 3D point cloud (lazy), counters, marquee. All honour `prefers-reduced-motion`.

## 6. Page copy
Copy lives in the pages and `src/content/*.ts`. Headlines in use:
- Home: "Community-powered. Invention-driven." CTAs: Join the Community / Explore Our Tech. Portals: Juicer Marketplace, Juicer Tech Ecosystem. Final CTA: "Your city is next." Join / Partner / Host a chapter.
- Marketplace: "Where builders meet and events get made." Community: "One brand. Seven local chapters." Services: "Get your event seen, filled and remembered." Swag: "Swag your attendees actually keep."
- Tech: "We invent what comes next." AI: "Software that does the work." Robotics: "Robots that earn their place." Physical AI: "Ego data for world models." Lab: "Research in the open, pilots in the real world." Developers: "Build with us, back us, or both."

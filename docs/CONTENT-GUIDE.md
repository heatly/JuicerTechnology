# Content-update guide

All editable content is in `src/content/`. Edit, commit, push; Vercel redeploys.

| To change | Edit |
|---|---|
| Home stats, nav, partners, testimonials, tagline, contact, socials | `site.ts` |
| Open a chapter / change lead | `cities.ts`: set `status: "live"` and the `lead` |
| Add an event or hackathon | `events.ts`: add an object (copy one). Tracks and prizes make it a full hackathon page. Past events flip automatically by date |
| Past winners | `winners` on the event |
| Services, tiers, prices, swag catalog, case studies | `marketplace.ts` |
| AI products, robotics, roadmap, research notes | `tech.ts` |
| Physical AI copy (from ego.mom) | `physicalAI` in `tech.ts` |
| Form fields | `src/lib/forms.ts` |

## Placeholders to replace before launch
- `stats` values, partner names and testimonials in `site.ts` (marked PLACEHOLDER; testimonials must be real and permissioned).
- Event dates, venues; chapter lead names and photos.
- Products in `tech.ts` are concept entries. Pricing amounts in `marketplace.ts` show "Custom quote".
- Social URLs and `hello@juicertechnology.com`.
- Gallery tiles and portfolio images: add files under `public/` and swap the gradient blocks for `next/image`.
- Cities: community operations in Bengaluru, Hyderabad, Chennai, Mumbai, Pune, Delhi, Puducherry (status "live"); software offices in Salem, Trichy, Karur, Tirupati (status "office"). Chapter lead names are placeholders.

## Adding a city
Add an object to `cities.ts`; the city page, map pin, footer link, sitemap and city SEO landing page are generated automatically (lat/lon place the pin).

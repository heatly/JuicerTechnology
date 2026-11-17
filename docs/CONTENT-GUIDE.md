# Content guide

The site has four pages: Home, Egocentric Data (`/egocentric-data`), Robotics (`/robotics`) and Contact (`/contact`). Old URLs redirect (see `next.config.mjs`).

| To change | Edit |
|---|---|
| Name, tagline, description, email, socials, nav | `src/content/site.ts` |
| Gap chart figures, data types, pipeline steps, environments, principles, robotics tracks, loop, capabilities, sources | `src/content/data.ts` |
| Form fields and success messages | `src/lib/forms.ts` |
| Page layouts and copy | `src/app/**/page.tsx` |
| Graphics (rig diagram, robot arm, loop ring, pipeline, gap bars) | `src/components/Graphics.tsx` |

## Numbers
Every figure in `data.ts` is a rounded, industry-level approximation from public sources (ego.mom and its cited studies). They are labelled as such on the page and are **not Juicer output**. When you have Juicer's real numbers (hours collected, contributors, countries, customers), add them to `data.ts` and to a stats section, and remove the approximation caveat only for figures that are genuinely yours.

## Research sources
Copy is written in our own words, informed by the public pages of Objectways, Build AI and Abundance (service lines, process, how egocentric data and robotics are framed). No text is copied, and no claims (certifications, dataset names, customer counts) are made on Juicer's behalf.

## Before launch
- Confirm the contributor and consent wording with your legal advisor, and that you offer the privacy controls the page mentions.
- Robotics platform specs are not published; add them once final.
- Replace the logo redraw with the original file if you have it.
- Set form delivery variables (see DEPLOYMENT.md).

# Deployment

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy to Vercel (recommended)
1. Push the folder to a GitHub repo.
2. Import it at vercel.com, framework auto-detected as Next.js.
3. Add the environment variables from `.env.example` (below).
4. Add the domain `juicertechnology.com` under Settings → Domains and update DNS as shown.
5. Redeploy. Check `/sitemap.xml`, `/robots.txt` and an event page's structured data (Google Rich Results Test).

## Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URL, sitemap, schema |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID (G-XXXX) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel; form success fires `Lead` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | forms → Google Sheet |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | forms → email (resend.com, verify your domain) |
| `TRACKING_WEBHOOK_URL` | order tracking lookup |

In production, a form with neither Sheets nor email configured returns an error rather than silently dropping leads.

## Google Sheets form delivery
1. Create a Sheet. Extensions → Apps Script. Paste:
```js
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const sh = SpreadsheetApp.getActive().getSheetByName(d.form) || SpreadsheetApp.getActive().insertSheet(d.form);
  if (sh.getLastRow() === 0) sh.appendRow(Object.keys(d));
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  sh.appendRow(headers.map(h => d[h] ?? ""));
  return ContentService.createTextOutput("ok");
}
```
2. Deploy → New deployment → Web app → execute as you, access "Anyone". Copy the URL into `GOOGLE_SHEETS_WEBHOOK_URL`.
(Each form gets its own tab. If a later submission has new fields, add the column header.)

## Order tracking
Add an "Orders" sheet with columns `id, status, updated, note` (status is one of: Quote approved, Design proof, In production, Quality check, Shipped, Delivered). Deploy an Apps Script `doGet(e)` that finds the row for `e.parameter.id` and returns JSON `{status, updated, note}`; put its URL in `TRACKING_WEBHOOK_URL`.

## Ads and attribution
UTM, `gclid` and `fbclid` are saved per session and sent with every form submission. Use UTM-tagged links in campaigns, e.g. `?utm_source=instagram&utm_medium=paid&utm_campaign=hack-hyd`.

## Performance
Static prerendering for almost every page, canvas (not a 3D library) for graphics, the 3D scene is lazy-loaded, fonts via `next/font`. Run Lighthouse on the deployed URL; I have not measured the 90+ target yet.

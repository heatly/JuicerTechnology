# Deployment and hiring-ad setup

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Vercel
Push to `main` on `heatly/JuicerTechnology`; Vercel builds (`vercel.json` forces the Next.js preset). Add the environment variables below under Project → Settings → Environment Variables, then redeploy.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URL, sitemap |
| `GOOGLE_SHEETS_WEBHOOK_URL` | **all forms, including job applications, go to your Google Sheet** |
| `RESEND_API_KEY`, `FORMS_TO_EMAIL`, `FORMS_FROM_EMAIL` | optional email copy of each submission |
| `NEXT_PUBLIC_GA4_ID` | GA4 |
| `NEXT_PUBLIC_GADS_ID` | Google Ads tag, e.g. `AW-1234567890` |
| `NEXT_PUBLIC_GADS_APPLY_LABEL` | Google Ads conversion label for the application |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional Meta Pixel |

If neither the Sheet nor email is configured, forms return an error in production rather than dropping applications silently.

## Google Sheet for applications (do this first)
1. Create a Google Sheet (e.g. "Juicer applications").
2. Extensions → Apps Script. Delete the sample code and paste the contents of `docs/google-apps-script.gs`. Save.
3. Deploy → New deployment → type **Web app** → Execute as **Me**, Who has access **Anyone** → Deploy. Authorise when asked.
4. Copy the Web app URL (ends in `/exec`) into Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`, then redeploy.
5. Submit a test application on `/apply`. A tab named `apply` appears with these columns: form, submittedAt, page, name, age, phone, twoWheeler, licence, smartphone, location, availability, experience, consent, utm (contains gclid and campaign tags).

6. **Recommended hardening:** in the script set `SECRET` to a long random string, deploy a new version, and add the same value in Vercel as `SHEETS_SHARED_SECRET`. The script also only accepts the form names in `ALLOWED_FORMS`.
7. Use the public URL form (`https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec`) in Vercel, not the `/a/macros/<domain>/` variant.

If you change the script later, use Deploy → Manage deployments → Edit → New version (the URL stays the same).

## Google Ads
- **Landing page URL:** `https://juicertechnology.com/apply`. Use it as the final URL of the ad and the poster QR code.
- **Tracking:** in Google Ads create a Conversion action (Website → "Submit lead form"), copy the tag ID (`AW-...`) and the conversion label into the two variables above. A conversion is recorded when someone submits the form.
- **Tagging links:** add UTMs, e.g. `/apply?utm_source=google&utm_medium=cpc&utm_campaign=chennai-operator`. They and the `gclid` are saved in the sheet's `utm` column.
- **Employment ads policy:** keep the ad text consistent with the page (pay range, requirements, no application fee). Do not promise guaranteed earnings.

## Poster
Print a QR code that points to the `/apply` URL with `?utm_source=poster&utm_medium=print&utm_campaign=<area>` so you can see which posters bring applicants.

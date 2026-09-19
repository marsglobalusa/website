# Mars Global — Website

A single-page site for fiber / coax / Cat5e-Cat6 installation services.

## Files
- `index.html` — all page content
- `css/styles.css` — styling (colors match the Mars Global logo: dark plum + gold + Mars orange)
- `js/main.js` — mobile nav, scroll reveal animations, the animated glowing fiber-optic canvas background, and the contact form submit handler
- `assets/logo-mark.svg` — a small vector version of the logo (planet + ring) used in the header/footer
- `assets/logo.jpg` — your original logo photo (not used on the page itself, kept for reference/branding)
- `assets/photos/` — free stock photos (fiber/network installation work) used in the Gallery and Why Us sections, tinted with a gold/plum overlay to match the site

## ⚠️ One step required: activate the contact form

The contact form sends messages to **marsglobalusa@gmail.com** using a free service called
[FormSubmit](https://formsubmit.co) — no account or password needed.

**The first time someone submits the form**, FormSubmit will send a confirmation email to
marsglobalusa@gmail.com with a link that says "Activate Form." Someone with access to that inbox
needs to click it once — after that, every future submission is delivered straight to the inbox
automatically. Until it's activated, submissions won't arrive.

Tip: submit the form yourself once right after the site goes live, so you can click that
activation link immediately.

## How to put this online

This is a static site (no server/database needed), so any of these work:

- **Netlify** — go to app.netlify.com/drop and drag the whole `website` folder onto the page. You'll get a live link in seconds, and can connect your own domain afterward.
- **GitHub Pages** — push this folder to a GitHub repo and enable Pages in the repo settings.
- **Any web host** — upload the contents of this folder via FTP/cPanel to your hosting.

## Editing content

Everything is in `index.html`, organized in clearly commented sections (Header, Hero, Services,
Coverage, Process, Why Us, CTA, Contact, Footer). Phone number, email and Pittsburgh/nationwide
copy can be edited directly in that file — search for the text you want to change.

## Notes

- The coverage map is a real United States outline (all 50 states) with a marker over Pittsburgh, PA.
- The glowing background animation automatically turns off for visitors who have "reduce motion" enabled in their OS accessibility settings.
- Fonts (Cinzel + Jost) load from Google Fonts via CDN — no local font files needed.
- The photos in `assets/photos/` are from [Pexels](https://www.pexels.com), free for commercial use with no attribution required (Pexels License). If you'd rather use your own job-site photos, just replace the files in that folder, keeping the same file names, or update the `src` paths in `index.html`.

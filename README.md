# TIT Student App (Web App)

A web app that shows a **"customise student details"** feature for the
college app. It runs in the browser and can be installed on the home screen of
Android (Chrome) and iPhone (Safari) as an app.

## Screens / flow
1. **Home** – logo, student NAME + (ENROLLMENT) at the top, Academic / Fee / Facilities tabs.
2. **ID/Admit Cards** → ID CARDS page (Bus, Identity, Library, Health).
3. **View Identity Card** → ID card with photo, name, course, branch, mobile, enrollment, QR,
   and a *Download Card* button (saves a PNG).
4. **☰ menu → Edit Details** – the proposed feature: change passport photo, name,
   course (default *Bachelor Of Technology*), branch, mobile, enrollment and QR link.


## Project structure
```
www/
  index.html            all screens (sections shown/hidden by the router)
  css/style.css         all styling (sizes are for a 360px-wide phone)
  js/icons.js           SVG icons for the tiles
  js/store.js           saves the student profile in localStorage + QR link helpers
  js/card.js            builds the ID card, QR code, PNG download
  js/app.js             router (#/home, #/idcards …), tabs, menu, edit form
  lib/qrcode.js         QR code generator library (MIT, Kazuhiko Arase)
  manifest.webmanifest  makes it installable (name, icon, colours)
  sw.js                 service worker – offline support
design-reference/       the original screenshots the design was copied from
```

## Run on your laptop
Any static server works, for example:
```
cd www
npx serve .            (or: python -m http.server 8080)
```
Open the URL it prints. In Chrome DevTools press **Ctrl+Shift+M** to see it at phone size.

## Put it online (needed for phones / installing)
The phone has to open it over **https**. Free and easy: **GitHub Pages**
1. Create a GitHub repo and upload the *contents* of the `www` folder.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root → Save.
3. After ~1 minute you get a link like `https://<username>.github.io/<repo>/`.

(Netlify Drop works too: drag the `www` folder onto https://app.netlify.com/drop.)

Then in the app open **☰ → Edit Details** and paste that link into
**"Web app link for QR"**, so scanning the QR opens that student's card.
(When hosted, the app also detects its own link automatically.)

## Install on the phone
- **Android (Chrome):** open the link → ⋮ menu → **Add to Home screen / Install app**.
- **iPhone (Safari):** open the link → Share button → **Add to Home Screen**.

It opens full-screen with the college icon, like a normal app, and works offline.

## Notes
- Everything is stored only on that phone (localStorage). No server, no login.
- The photo is cropped to a square and shrunk to 360×360 to keep storage small.
- "Downdload Card" is spelled the same way as in the original app.
- After changing files, bump `CACHE` in `sw.js` (e.g. `v2`) so phones get the update.

## Deploy with Vercel or Netlify
The repo is ready for both — no build step, the site is the `www` folder.
- **Vercel:** Add New → Project → import this repo → Framework *Other* → Deploy
  (`vercel.json` already points it at `www`).
- **Netlify:** Add new site → Import from Git → pick this repo → Deploy
  (`netlify.toml` already sets the publish folder to `www`).

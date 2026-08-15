# AcneGone website

Static landing page for [AcneGone](https://github.com/insomniac-engineer/AcneGone) — a free, private Accutane companion.

**Live:** https://insomniac-engineer.github.io/AcneGone-website/

## Preview

### Hero

![AcneGone landing page hero with phone mockup and floating stat cards](screenshots/01-hero.png)

### Product

Interactive feature tabs with in-app screenshots.

![Product features — dose journey](screenshots/02-features.png)

![Share your progress with Hide eyes enabled](screenshots/03-features-share.png)

### Why AcneGone

![Why AcneGone — empathy-focused copy and benefit cards](screenshots/04-why.png)

### Everything included

![Everything included free — feature grid](screenshots/05-included.png)

### Privacy

![Privacy by design section](screenshots/06-privacy.png)

### Download

![Download closer with store buttons](screenshots/07-download.png)

## Local preview

```bash
python3 -m http.server 4173
```

Open http://localhost:4173

## Deploy

Published via GitHub Pages from the `main` branch (root).

Push to `main` and Pages will rebuild automatically.

## App screenshots

Phone mockups in `assets/screens/` come from the main app repo:

- Most screens: simulator captures in `AcneGone/store-listing/play/captures/`
- Share screen (with Hide eyes): regenerate from the app repo

```bash
# from AcneGone/store-listing/play
node compose-share-screenshot.cjs
```

## Regenerate README screenshots

Captures viewport shots of each landing-page section from the live site (or pass a local URL):

```bash
npm install
node scripts/capture-readme-screenshots.mjs
# or against local preview:
node scripts/capture-readme-screenshots.mjs http://localhost:4173/
```

Requires Google Chrome installed locally.

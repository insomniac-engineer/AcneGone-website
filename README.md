# AcneGone website

Static landing page for [AcneGone](https://github.com/insomniac-engineer/AcneGone).

## Local preview

```bash
python3 -m http.server 4173
```

Open http://localhost:4173

## Deploy

Published via GitHub Pages from the `main` branch (root).

Live URL: https://insomniac-engineer.github.io/AcneGone-website/

## Screenshots

App screenshots in `assets/screens/` are generated from the main app repo:

```bash
# from AcneGone/store-listing/play
node compose-share-screenshot.cjs
```

Other screens are exported from simulator captures in the app repo’s `store-listing/play/captures/` folder.

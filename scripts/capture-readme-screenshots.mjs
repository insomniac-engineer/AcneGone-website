#!/usr/bin/env node
/**
 * Optional: refresh committed README screenshots in screenshots/.
 *
 * You do NOT need to run this for README text edits — reuse the existing PNGs.
 * Run only when the landing page design changes and previews should be updated.
 *
 * Usage: node scripts/capture-readme-screenshots.mjs [baseUrl]
 */
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'screenshots');
const baseUrl = process.argv[2] ?? 'https://insomniac-engineer.github.io/AcneGone-website/';

const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];

const executablePath = chromePaths.find((p) => existsSync(p));

if (!executablePath) {
  console.error('Chrome not found. Install Google Chrome or pass a local preview URL after starting a server.');
  process.exit(1);
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const preparePage = async (page) => {
  await page.evaluateOnNewDocument(() => {
    sessionStorage.setItem('acnegone-med-disclaimer-dismissed', '1');
  });
};

const dismissBanner = async (page) => {
  await page.evaluate(() => {
    sessionStorage.setItem('acnegone-med-disclaimer-dismissed', '1');
    document.querySelector('#med-banner')?.setAttribute('hidden', '');
    document.body.classList.remove('has-med-banner');
  });
};

const shots = [
  {
    file: '01-hero.png',
    action: async (page) => {
      await page.goto(baseUrl, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await delay(900);
    },
  },
  {
    file: '02-features.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#product`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await page.evaluate(() => document.getElementById('product')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '03-features-share.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#product`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      const shareTab = await page.$('[data-feature="share"]');
      if (shareTab) {
        await shareTab.click();
        await delay(400);
      }
      await page.evaluate(() => document.getElementById('product')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '04-why.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#why`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await page.evaluate(() => document.getElementById('why')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '05-included.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#included`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await page.evaluate(() => document.getElementById('included')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '06-privacy.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#privacy`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await page.evaluate(() => document.getElementById('privacy')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '07-download.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#download`, { waitUntil: 'networkidle2' });
      await dismissBanner(page);
      await delay(800);
      await page.evaluate(() => document.getElementById('download')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
];

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await preparePage(page);
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

for (const shot of shots) {
  await shot.action(page);
  const dest = path.join(outDir, shot.file);
  await page.screenshot({ path: dest, type: 'png' });
  console.log('Wrote', dest);
}

await browser.close();

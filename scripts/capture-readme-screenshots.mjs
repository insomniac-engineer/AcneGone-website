#!/usr/bin/env node
/**
 * Capture README website screenshots from the live (or local) site.
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

const shots = [
  { file: '01-hero.png', action: async (page) => page.goto(baseUrl, { waitUntil: 'networkidle2' }) },
  {
    file: '02-features.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#product`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.getElementById('product')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '03-features-share.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#product`, { waitUntil: 'networkidle2' });
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
      await page.evaluate(() => document.getElementById('why')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '05-included.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#included`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.getElementById('included')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '06-privacy.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#privacy`, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.getElementById('privacy')?.scrollIntoView({ block: 'start' }));
      await delay(600);
    },
  },
  {
    file: '07-download.png',
    action: async (page) => {
      await page.goto(`${baseUrl.replace(/\/?$/, '/')}#download`, { waitUntil: 'networkidle2' });
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
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

for (const shot of shots) {
  await shot.action(page);
  const dest = path.join(outDir, shot.file);
  await page.screenshot({ path: dest, type: 'png' });
  console.log('Wrote', dest);
}

await browser.close();

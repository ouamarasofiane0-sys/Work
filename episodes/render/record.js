// Enregistre l'animation HTML en vidéo (webm) via Playwright/Chromium.
// Usage: node record.js <fichier.html> <dossier-sortie> <duree-ms>
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const htmlFile = process.argv[2];
  const outDir = process.argv[3];
  const durationMs = parseInt(process.argv[4] || '61000', 10);
  const W = 1080, H = 1920;

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });

  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
    recordVideo: { dir: outDir, size: { width: W, height: H } },
  });

  const page = await context.newPage();
  await page.goto('file://' + path.resolve(htmlFile));
  // Laisse tourner l'animation le temps voulu
  await page.waitForTimeout(durationMs);

  const video = page.video();
  await context.close(); // finalise l'écriture de la vidéo
  const raw = await video.path();
  console.log('VIDEO_PATH=' + raw);

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });

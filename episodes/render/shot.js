// Capture plusieurs images en une seule lecture.
// Usage: node shot.js <fichier.html> <t1,t2,...ms>
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const htmlFile = process.argv[2];
  const times = (process.argv[3] || '2000').split(',').map(Number).sort((a,b)=>a-b);
  const W = 1080, H = 1920;
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(htmlFile));
  let prev = 0;
  for (const t of times) {
    await page.waitForTimeout(t - prev);
    prev = t;
    const out = 'shot_' + t + '.png';
    await page.screenshot({ path: out });
    console.log('SHOT=' + out);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

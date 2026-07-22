// Rendu déterministe image par image → MP4 (fluide, durée exacte).
// Usage: FF=<ffmpeg> node frames.js <in.html> <out.mp4> [duree_s] [fps] [startFrame] [endFrame]
// Si startFrame/endFrame sont fournis, ne rend que ce segment (pour paralléliser).
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  const htmlFile = process.argv[2];
  const outMp4   = process.argv[3];
  const durS     = parseFloat(process.argv[4] || '82');
  const fps      = parseInt(process.argv[5] || '30', 10);
  const FF       = process.env.FF;
  const W = 1080, H = 1920;
  const total = Math.round(durS * fps);
  const start = process.argv[6] != null ? parseInt(process.argv[6], 10) : 0;
  const end   = process.argv[7] != null ? parseInt(process.argv[7], 10) : total;

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(htmlFile) + '?frames=1');
  await page.waitForFunction('window.__ready === true', { timeout: 20000 });

  const ff = spawn(FF, [
    '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.0',
    '-preset', 'veryfast', '-crf', '20', '-movflags', '+faststart', outMp4,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = start; i < end; i++) {
    const ms = (i / fps) * 1000;
    await page.evaluate((m) => window.__seek(m), ms);
    const buf = await page.screenshot({ type: 'jpeg', quality: 88 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  await browser.close();
  console.log('DONE', outMp4, start, end);
})().catch(e => { console.error(e); process.exit(1); });

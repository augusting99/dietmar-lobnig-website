const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 250, height: 250, deviceScaleFactor: 1 });
  const filePath = 'file:///' + path.resolve('maintenance-white.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));
  const logo = await page.$('.logo-wrapper');
  await logo.screenshot({ path: 'logo-maintenance.jpg', type: 'jpeg', quality: 95 });
  console.log('Saved logo-maintenance.jpg');
  await browser.close();
})();

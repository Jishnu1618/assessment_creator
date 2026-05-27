import puppeteer from 'puppeteer';
import path from 'path';

const artifactsDir = 'C:\\Users\\LENOVO\\.gemini\\antigravity\\brain\\3e51cbd9-e511-4412-9e1a-f116b50297fc';

const takeScreenshots = async () => {
  console.log('Launching browser to capture local Next.js frontend pages...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // 1. Capture Dashboard Home
    console.log('Navigating to Home Dashboard (http://localhost:3000)...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    const homePath = path.join(artifactsDir, 'home.png');
    await page.screenshot({ path: homePath });
    console.log(`Saved Home Dashboard screenshot to ${homePath}`);

    // 2. Capture /create stepper
    console.log('Navigating to Stepper Form (http://localhost:3000/create)...');
    await page.goto('http://localhost:3000/create', { waitUntil: 'networkidle0' });
    const createPath = path.join(artifactsDir, 'create.png');
    await page.screenshot({ path: createPath });
    console.log(`Saved Stepper Form screenshot to ${createPath}`);

    // 3. Capture /output view
    console.log('Navigating to Output Preview (http://localhost:3000/output)...');
    await page.goto('http://localhost:3000/output', { waitUntil: 'networkidle0' });
    const outputPath = path.join(artifactsDir, 'output.png');
    await page.screenshot({ path: outputPath });
    console.log(`Saved Output Preview screenshot to ${outputPath}`);

  } catch (error) {
    console.error('Error during screenshot capture:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
};

takeScreenshots();

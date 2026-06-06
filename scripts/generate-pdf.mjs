import puppeteer from 'puppeteer';
import { fileURLToPath, pathToFileURL } from 'url';
import { existsSync, copyFileSync } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');

const inputPath = path.join(root, 'dist', 'resume-print', 'index.html');
const outputPath = path.join(root, 'dist', 'codewithbre_resume.pdf');

if (!existsSync(inputPath)) {
  console.error(`generate-pdf: ${inputPath} not found — run astro build first`);
  process.exit(1);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();

await page.goto(pathToFileURL(inputPath).href, { waitUntil: 'networkidle0' });

await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '0.3in', right: '0.45in', bottom: '0.3in', left: '0.45in' },
});

await browser.close();
console.log(`generate-pdf: wrote ${outputPath}`);

const publicPath = path.join(root, 'public', 'codewithbre_resume.pdf');
copyFileSync(outputPath, publicPath);
console.log(`generate-pdf: copied to ${publicPath}`);

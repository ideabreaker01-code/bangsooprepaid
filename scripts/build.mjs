import { mkdir, readFile, readdir, copyFile, rm } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'public');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const pages = ['index.html', 'activation.html', 'plans.html', 'usim.html', 'faq.html',
  'concept-v2.html', 'guide.html', 'analytics-privacy.html'];
const extras = ['measurement.js', 'robots.txt', 'sitemap.xml'];
for (const file of [...pages, ...extras]) await copyFile(join(root, file), join(output, file));
await mkdir(join(output, 'guide'), { recursive: true });
for (const file of await readdir(join(root, 'guide'))) {
  if (file.endsWith('.html')) await copyFile(join(root, 'guide', file), join(output, 'guide', file));
}
// Copy only browser assets referenced by the HTML/JS/CSS being shipped.
const queue = [...pages, 'measurement.js'];
for (const file of await readdir(join(root, 'guide'))) if (file.endsWith('.html')) queue.push('guide/' + file);
const copied = new Set();
while (queue.length) {
  const file = queue.shift();
  const text = await readFile(join(root, file), 'utf8');
  const references = [...text.matchAll(/(?:src|href)=["']\/?(assets\/[^"'?#]+)|url\(["']?\/?(assets\/[^"')?#]+)/g)];
  for (const match of references) {
    const asset = match[1] || match[2];
    if (copied.has(asset)) continue;
    const source = resolve(root, asset);
    if (!source.startsWith(root + '/assets/')) throw new Error('Asset outside assets directory: ' + asset);
    await mkdir(dirname(join(output, asset)), { recursive: true });
    await copyFile(source, join(output, asset));
    copied.add(asset);
    if (/\.(css|js)$/.test(asset)) queue.push(asset);
  }
}
console.log(`Built ${pages.length} root pages, legacy guides, and ${copied.size} assets into public/.`);

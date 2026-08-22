// Capture live screenshots via WordPress mshots API as starting placeholders
import { mkdirSync } from 'node:fs';
import { writeFileSync } from 'node:fs';

const sites = [
  ['mordytech', 'https://mordytech.com/'],
  ['skrayssynergy', 'https://skrayssynergy.com/'],
  ['smartmall', 'https://smartmall.ng/'],
  ['stellastech', 'https://stellastech.com/'],
  ['classicfurniture', 'https://classicfurniture.ng/'],
  ['somallink', 'https://www.somallink.com'],
  ['oceanwealthinvest', 'https://oceanwealthinvest.com/'],
  ['wealthyboulevard', 'https://wealthyboulevard.com'],
  ['bukolaolutayo', 'https://bukolaolutayo.com/'],
  ['auntiedinternational', 'https://auntiedinternational.com/'],
];

mkdirSync('img/highlights', { recursive: true });
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36';

for (const [name, url] of sites) {
  const shotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=960`;
  try {
    const res = await fetch(shotUrl, { headers: { 'User-Agent': UA }, redirect: 'follow', signal: AbortSignal.timeout(30000) });
    const buf = Buffer.from(await res.arrayBuffer());
    // mshots returns a tiny gray "generating" image sometimes (<15KB); still save - will look ok after regen
    writeFileSync(`img/highlights/${name}.jpg`, buf);
    console.log(`${name}.jpg  ${(buf.length / 1024).toFixed(0)}KB  ${res.status}`);
  } catch (e) {
    console.log(`${name} FAILED: ${String(e).slice(0, 80)}`);
  }
}
console.log('done');

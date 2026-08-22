import { readFileSync, writeFileSync } from 'node:fs';
let h = readFileSync('index.html', 'utf8');
const start = h.indexOf('<section id="highlights"');
const end = h.indexOf('</section>', start) + '</section>'.length + 2; // + trailing newlines
if (start < 0) throw new Error('highlights section not found');
h = h.slice(0, start) + h.slice(end);
h = h.replace('<section id="services" class="section">', '<section id="services" class="section alt">');
// reorder filters: web first (active default), All last
h = h.replace(
  `<div class="filters reveal" id="filters">
      <button class="chip current" data-f="all">All</button>
      <button class="chip" data-f="web">Website Development</button>`,
  `<div class="filters reveal" id="filters">
      <button class="chip current" data-f="web">Website Development</button>`
);
h = h.replace(
  `<button class="chip" data-f="print">Printing</button>
    </div>`,
  `<button class="chip" data-f="print">Printing</button>
      <button class="chip" data-f="all">All</button>
    </div>`
);
writeFileSync('index.html', h);
console.log('highlights removed:', !h.includes('id="highlights"'));
console.log('filter order fixed:', h.indexOf('data-f="web"') < h.indexOf('data-f="all"'));

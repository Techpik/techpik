import { readFileSync, writeFileSync } from 'node:fs';
let h = readFileSync('index.html', 'utf8');

const sites = [
  ['intimatematchmaking', 'Intimate Matchmaking', 'https://intimatematchmaking.com/'],
  ['mindandmasteryjournal', 'Mind &amp; Mastery Journal', 'https://mindandmasteryjournal.com/'],
  ['stellasbank-blog', 'StellasBank Blog', 'https://blog.stellasbank.com/'],
  ['cupidextrad', 'Cupidextrad', 'https://cupidextrad.com/'],
  ['trustwavecreditunion', 'Trustwave Credit Union', 'https://trustwavecreditunion.com/'],
  ['oceanwealthfint', 'Ocean Wealth Fintech', 'https://oceanwealthfint.com/'],
  ['samobasihealthcare', 'Samobasi Healthcare Foundation', 'https://samobasihealthcarefoundation.org.ng/'],
  ['abidasindustries', "Abida's Industries", 'https://abidasindustries.com.ng/'],
  ['skrayssynergy', 'Skrays Synergy', 'https://skrayssynergy.com/'],
  ['eastfield', 'Eastfield', 'https://eastfield.com.ng/'],
  ['auntiedinternational', 'Auntie D International', 'https://auntiedinternational.com/'],
  ['mordytech', 'Mordytech', 'https://mordytech.com/'],
];

const cards = sites.map(([img, name, url]) =>
  `      <a class="work web reveal" data-cat="web" href="${url}" target="_blank" rel="noopener"><img loading="lazy" src="img/highlights/${img}.png" alt="${name.replace(/&amp;/g, '&')} website screenshot"><span class="cap"><b>${name}</b><i>${url.replace('https://', '')} ↗</i></span></a>`
).join('\n');

// remove all existing web cards
h = h.replace(/^.*data-cat="web".*\r?\n/gm, '');
// insert new ones right after grid opening
h = h.replace(/(<div class="work-grid" id="workGrid">\r?\n)/, `$1${cards}\n\n`);

writeFileSync('index.html', h);
console.log('web cards now:', (h.match(/data-cat="web"/g) || []).length);
console.log('old mockup refs left:', (h.match(/img\/portfolio\/web\d/g) || []).length);

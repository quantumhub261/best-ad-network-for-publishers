const fs = require('fs');
const path = require('path');

const DOMAIN = (process.env.DOMAIN || 'https://best-ad-network-for-publishers.com').replace(/\/$/, '');
const SITE = 'Publisher Ad Network Guide';
const UPDATED = '2026-10-08';
const UPDATED_LABEL = 'October 8, 2026';

const pages = [
  require('./home.js'),
  require('./mobile.js'),
  require('./admob.js'),
  require('./about.js'),
  require('./methodology.js'),
  require('./privacy.js'),
];

const nav = [
  ['/', 'Best ad networks'],
  ['/best-mobile-ad-networks/', 'Mobile ad networks'],
  ['/admob-alternatives/', 'AdMob alternatives'],
  ['/methodology/', 'Methodology'],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function headings(body) {
  const out = [];
  const re = /<h2 id="([^"]+)">(.*?)<\/h2>/g;
  let m;
  while ((m = re.exec(body))) out.push([m[1], strip(m[2])]);
  return out;
}

function layout(p) {
  const url = DOMAIN + p.path;
  const faqHtml = p.faq && p.faq.length
    ? `<section class="faq" aria-labelledby="faq"><h2 id="faq">Frequently Asked Questions</h2>${p.faq
        .map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`)
        .join('')}</section>`
    : '';
  const bodyAll = p.body + faqHtml;
  const toc = headings(bodyAll);
  const tocLi = toc.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('');
  const showToc = toc.length > 2;

  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: p.title,
      url,
      description: p.description,
      dateModified: UPDATED,
      inLanguage: 'en-US',
      isPartOf: { '@type': 'WebSite', name: SITE, url: DOMAIN + '/' },
    },
  ];
  if (p.faq && p.faq.length) {
    jsonld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question',
        name: strip(f.q),
        acceptedAnswer: { '@type': 'Answer', text: strip(f.a) },
      })),
    });
  }

  const navHtml = nav
    .map(([h, t]) => `<a href="${h}"${h === p.path || (p.navKey && p.navKey === h) ? ' aria-current="page"' : ''}>${t}</a>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#F4F7F5">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%2317232B'/%3E%3Crect x='7' y='16' width='5' height='9' fill='%234BA3A0'/%3E%3Crect x='14' y='11' width='5' height='14' fill='%234BA3A0'/%3E%3Crect x='21' y='6' width='5' height='19' fill='%23F0A202'/%3E%3C/svg%3E">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<script>document.documentElement.classList.add('js')</script>
<div class="progress" aria-hidden="true"><i></i></div>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="bar-in">
    <a class="brand" href="/"><i aria-hidden="true"><b></b><b></b><b></b></i>${SITE}</a>
    <nav class="nav" aria-label="Main">${navHtml}</nav>
  </div>
</header>
<main id="main">
<div class="hero-wrap"><div class="hero-art" aria-hidden="true"></div>${p.hero}${p.strip || ''}</div>
<div class="page"${showToc ? '' : ' style="grid-template-columns:minmax(0,1fr)"'}>
  ${showToc ? `<aside class="rail" aria-label="On this page"><p>On this page</p><ol>${tocLi}</ol></aside>` : ''}
  <div class="article">
    ${showToc ? `<details class="toc-m"><summary>On this page</summary><ol>${tocLi}</ol></details>` : ''}
    ${bodyAll}
  </div>
</div>
</main>
<footer class="site-footer">
  <div class="foot-in">
    <div>
      <p class="h">${SITE}</p>
      <p>Independent reference for web and app publishers choosing an advertising network. Descriptions are compiled from public network documentation; terms change, so check the network's own page before applying.</p>
    </div>
    <div>
      <p class="h">Guides</p>
      <ul>
        <li><a href="/">Best ad networks for publishers</a></li>
        <li><a href="/best-mobile-ad-networks/">Best mobile ad networks</a></li>
        <li><a href="/admob-alternatives/">AdMob alternatives</a></li>
      </ul>
    </div>
    <div>
      <p class="h">About</p>
      <ul>
        <li><a href="/about/">About this site</a></li>
        <li><a href="/methodology/">Methodology</a></li>
        <li><a href="/privacy/">Privacy</a></li>
      </ul>
    </div>
  </div>
  <div class="legal">Last reviewed ${UPDATED_LABEL}. Network names and trademarks belong to their owners.</div>
</footer>
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

const out = path.join(__dirname, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.copyFileSync('style.css', path.join(out, 'assets/style.css'));
fs.copyFileSync('app.js', path.join(out, 'assets/app.js'));
fs.mkdirSync(path.join(out, 'assets/img'), { recursive: true });
for (const f of ['hero.svg', 'band.svg', 'footer.svg']) fs.copyFileSync(f, path.join(out, 'assets/img', f));

for (const p of pages) {
  const dir = path.join(out, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(p));
}

fs.writeFileSync(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${DOMAIN}${p.path}</loc><lastmod>${UPDATED}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
fs.writeFileSync(
  path.join(out, 'llms.txt'),
  `# ${SITE}\n\n> Independent reference comparing advertising networks for web and mobile app publishers.\n\n${pages
    .map((p) => `- [${p.title}](${DOMAIN}${p.path}): ${p.description}`)
    .join('\n')}\n`
);
console.log('built', pages.length, 'pages for', DOMAIN);

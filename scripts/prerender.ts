import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';
import { SITE_ROUTES } from '../src/data/routes';

const root = process.cwd();
const dist = path.join(root, 'dist');
const templatePath = path.join(dist, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

function siteOrigin(): string {
  const raw = (process.env.VITE_SITE_URL || '').trim();
  if (!raw || raw === 'MY_APP_URL') return '';
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') return '';
    return url.origin;
  } catch {
    return '';
  }
}

function inject(shell: string, body: string, title: string, description: string): string {
  let html = shell.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  return html;
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const mod = (await vite.ssrLoadModule('/src/entry-server.tsx')) as {
    render: (url: string) => string;
  };
  const home = SITE_ROUTES.find((route) => route.path === '/');
  if (!home) throw new Error('Rota inicial ausente');

  const homeHtml = inject(template, mod.render('/'), home.title, home.description);
  fs.writeFileSync(templatePath, homeHtml);
  fs.writeFileSync(
    path.join(dist, '404.html'),
    inject(
      template,
      mod.render('/pagina-inexistente'),
      'Página não encontrada | Dr. Bruno Gomes',
      'Este endereço não faz parte do site do Dr. Bruno Gomes.',
    ),
  );

  const origin = siteOrigin();
  const identityReady = homeHtml.includes('"@type":"MedicalClinic"') || homeHtml.includes('"@type": "MedicalClinic"');
  if (origin && identityReady) {
    const withHead = fs
      .readFileSync(templatePath, 'utf8')
      .replace('content="noindex, nofollow"', 'content="index, follow"')
      .replace(
        '</head>',
        `<link rel="canonical" href="${origin}/" />\n<meta property="og:url" content="${origin}/" />\n<meta property="og:image" content="${origin}/og.png" />\n</head>`,
      );
    fs.writeFileSync(templatePath, withHead);
    const urls = SITE_ROUTES.filter((route) => route.published)
      .map((route) => `  <url><loc>${origin}${route.path === '/' ? '/' : route.path}</loc></url>`)
      .join('\n');
    fs.writeFileSync(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
    fs.appendFileSync(path.join(dist, 'robots.txt'), `\nSitemap: ${origin}/sitemap.xml\n`);
  }

  const published = fs.readFileSync(templatePath, 'utf8');
  const banned = [
    'Palmeiras',
    '98765',
    '22051-000',
    '3210-4000',
    'drbrunogomes.med.br',
    'Cardeal',
    'Siqueira Campos',
    'Leme',
    'Ipanema',
    'Botafogo',
  ];
  for (const term of banned) {
    if (published.includes(term)) {
      throw new Error(`HTML publicado contém dado não confirmado: ${term}`);
    }
  }
  const h1Count = published.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1Count !== 1) throw new Error(`A home precisa de um H1. Encontrados: ${h1Count}`);
  if (!published.includes('FAQPage')) throw new Error('FAQ visível sem FAQPage no HTML');
  if (published.includes('MedicalClinic') || published.includes('PostalAddress')) {
    throw new Error('Schema de negócio foi emitido sem entidade confirmada');
  }
} finally {
  await vite.close();
}

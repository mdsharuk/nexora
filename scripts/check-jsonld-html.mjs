import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://localhost:3000';
const cases = [
  ['/', ['OnlineStore', 'WebSite', 'WebPage']],
  ['/product/amd-ryzen-7-5700g-custom-desktop-pc', ['Product', 'BreadcrumbList']],
  ['/category/laptop', ['CollectionPage', 'BreadcrumbList']],
  ['/blog', ['CollectionPage', 'BreadcrumbList']],
  ['/blog/buying-guides', ['CollectionPage', 'BreadcrumbList']],
  ['/blog/laptop-buying-guide', ['BlogPosting', 'BreadcrumbList']],
  ['/blog/author/nexora-tech-team', ['CollectionPage', 'BreadcrumbList']],
  ['/blog/tag/ipad', ['CollectionPage', 'BreadcrumbList']],
  ['/about', ['AboutPage', 'BreadcrumbList']],
  ['/contact', ['ContactPage', 'BreadcrumbList']],
  ['/faq', ['WebPage', 'BreadcrumbList']],
  ['/service-center', ['WebPage']],
  ['/complaint', ['WebPage']],
  ['/cart', ['OnlineStore', 'WebSite']],
  ['/404', ['OnlineStore', 'WebSite']],
];

for (const [path, expected] of cases) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, path === '/404' ? 404 : 200, `${path}: unexpected HTTP status`);
  const html = await response.text();
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const nodes = scripts.flatMap(match => {
    const data = JSON.parse(match[1]);
    return data['@graph'] || [data];
  });
  const types = nodes.map(node => node['@type']);
  for (const type of expected) assert.ok(types.includes(type), `${path}: missing ${type} in initial HTML`);
  assert.equal(types.filter(type => type === 'Product').length, path.startsWith('/product/') ? 1 : 0);
  assert.equal(types.filter(type => type === 'BlogPosting').length, path === '/blog/laptop-buying-guide' ? 1 : 0);
  if (path === '/cart' || path === '/404') assert.deepEqual(types, expected);
  console.log(`${path}: ${types.join(', ')}`);
}

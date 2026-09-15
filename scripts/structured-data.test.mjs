import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

// Compile only the two pure helpers in memory; no Next server or generated files.
function loadHelper(relative, imports = {}) {
  const source = fs.readFileSync(new URL(`../${relative}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const compiledModule = { exports: {} };
  new Function('require', 'module', 'exports', outputText)((id) => {
    if (!(id in imports)) throw new Error(`Unexpected helper import: ${id}`);
    return imports[id];
  }, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

const seo = loadHelper('config/seo.ts');
const { serializeJsonLd, breadcrumbSchema, productSchema, siteSchema } = loadHelper('modules/structuredData.ts', { '../config/seo': seo });
const product = { title: 'Test laptop', images: ['/laptop.webp'], price: 56850, status: 'In Stock', description: { content: 'A laptop.' }, reviews: [] };

test('untrusted text cannot escape the JSON-LD script', () => {
  const data = { name: '</script><script>alert(1)</script>' };
  const serialized = serializeJsonLd(data);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), data);
});

test('offers use the displayed cash price, BDT, and actual stock status', () => {
  const data = productSchema(product, '/product/test-laptop');
  assert.equal(data.offers.price, 56850);
  assert.equal(data.offers.priceCurrency, 'BDT');
  assert.equal(data.offers.availability, 'https://schema.org/InStock');
  assert.equal(data.image[0], seo.absoluteUrl('/laptop.webp'));
  assert.equal(data.aggregateRating, undefined);
  assert.equal(data.review, undefined);
  assert.equal(data.offers.shippingDetails, undefined);
  assert.equal(data.offers.hasMerchantReturnPolicy, undefined);
  assert.equal(productSchema({ ...product, status: 'Out of Stock' }, '/product/test').offers.availability, 'https://schema.org/OutOfStock');
  assert.equal(productSchema({ ...product, status: 'Call for stock' }, '/product/test').offers.availability, undefined);
});

test('invalid or call-for-price values do not become offers', () => {
  for (const price of [NaN, Infinity, -1, 0]) {
    assert.equal(productSchema({ ...product, price }, '/product/test').offers, undefined);
  }
});

test('only valid ratings and named reviews are marked up', () => {
  const data = productSchema({ ...product, reviews: [
    { rating: 5, reviewedBy: 'Buyer', comment: 'Good laptop' },
    { rating: 3, comment: 'Fine' },
    { rating: 6, reviewedBy: 'Invalid', comment: 'Invalid rating' },
  ] }, '/product/test');
  assert.equal(data.aggregateRating.ratingValue, 4);
  assert.equal(data.aggregateRating.ratingCount, 2);
  assert.equal(data.review.length, 1);
});

test('breadcrumbs have one home, sequential positions, and absolute links', () => {
  const data = breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Laptops', href: '/category/laptop' }, { label: 'Test laptop' }], '/product/test');
  assert.deepEqual(data.itemListElement.map(item => item.position), [1, 2, 3]);
  assert.equal(data.itemListElement[0].item, seo.absoluteUrl('/'));
  assert.equal(data.itemListElement[2].item, undefined);
  assert.equal(breadcrumbSchema([], '/'), null);
});

test('site publisher and offer seller resolve to the same organization', () => {
  const [organization, website] = siteSchema()['@graph'];
  assert.equal(website.publisher['@id'], organization['@id']);
  assert.equal(productSchema(product, '/product/test').offers.seller['@id'], organization['@id']);
  assert.throws(() => seo.absoluteUrl('javascript:alert(1)'));
});

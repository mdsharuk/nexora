# Structured data

Set `NEXT_PUBLIC_SITE_URL` to the actual public website origin (for example,
`https://your-store.example`) in the deployment environment **before building**.
Rebuild after changing it. Local development defaults to `http://localhost:3000`;
that fallback must not be used for a public deployment. `.env.example` lists the setting.

## Coverage

| Pages | JSON-LD |
| --- | --- |
| All pages | Shared OnlineStore (Organization subtype) and WebSite identity |
| Public pages using Header | WebPage, AboutPage, ContactPage, or CollectionPage and visible breadcrumbs |
| Product detail | Product, BDT Offer, known availability, SKU/brand when supplied, real reviews/ratings when present |
| Blog articles | BlogPosting, displayed headline, cover, author, modification date, publisher |
| Category, blog/category/tag/author listings | CollectionPage and breadcrumbs; no individual Product or Article rich-result claims for listing cards |
| FAQ, policies, service center, tools | Page context and visible breadcrumbs |
| Account/authentication, cart, checkout, compare, search, order tracking, errors | No page-specific rich-result markup |

Markup is included in the initial HTML, including components prerendered by Next.js,
and page-specific markup updates during client navigation. All scripts use one
serializer which escapes `<` to prevent script injection from content.

## Existing content limitations

- Product routes currently reuse demo pricing, brand, SKU, specifications and images
  for arbitrary slugs. Replace these with authoritative catalog data before publishing.
  Schema reads the same props as the visible product; JSON-LD cannot correct demo data.
- Blog detail routes also synthesize titles for arbitrary slugs and reuse generic
  article content/date. Connect real articles and return 404 for unknown slugs before launch.
- Shipping rates, delivery windows, return periods, GTIN/MPN, real logo and business
  contact details are not sufficiently defined. No values are invented to suppress warnings.
- Empty reviews do not generate ratings. Real valid ratings generate AggregateRating;
  individual Review entries require an author name and review text.
- FAQ rich results were retired by Google in May 2026. FAQ pages use WebPage context.
- Careers lists multiple roles with incomplete posting metadata; JobPosting must be
  added to real individual job pages when those exist.

## Validation

Run `node --test scripts/structured-data.test.mjs`, `npx tsc --noEmit`, and `npm run build`.
With the built application running, run `node scripts/check-jsonld-html.mjs http://localhost:3000`
to check JSON parsing and expected types in the initial HTML of 15 representative routes.
After deployment, test the home page, a real product, a category, and a real article in
[Google Rich Results Test](https://search.google.com/test/rich-results).
Use [Schema Markup Validator](https://validator.schema.org/) for general schema types
such as WebSite/CollectionPage that do not have their own Google rich-result display.
Then request indexing through Search Console and monitor product/merchant and
breadcrumb reports. Valid markup establishes eligibility; Google chooses whether to
display rich results. This repository has no live Search Console validation attached.

References: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing),
[Articles](https://developers.google.com/search/docs/appearance/structured-data/article),
[Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb),
[FAQ retirement](https://developers.google.com/search/updates#june-2026).

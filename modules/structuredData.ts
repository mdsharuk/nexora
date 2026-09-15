import { absoluteUrl, siteName } from "../config/seo";

export type StructuredData = Record<string, unknown>;

export function serializeJsonLd(data: StructuredData | StructuredData[]): string {
  // Prevent CMS/user content from closing a script tag and injecting HTML.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationId = absoluteUrl("/#organization");
export const websiteId = absoluteUrl("/#website");

export function siteSchema(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "OnlineStore", "@id": organizationId, name: siteName, url: absoluteUrl("/") },
      { "@type": "WebSite", "@id": websiteId, name: siteName, url: absoluteUrl("/"), inLanguage: "en", publisher: { "@id": organizationId } },
    ],
  };
}

export function pageSchema(path: string, name: string, type = "WebPage"): StructuredData {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org", "@type": type,
    "@id": `${url}#webpage`, url, name, inLanguage: "en",
    isPartOf: { "@id": websiteId },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[], path: string): StructuredData | null {
  // The visible breadcrumb always includes a Home icon.
  const trail = [{ label: "Home", href: "/" }, ...items.filter(item => item.href !== "/" && item.label !== "Home")]
    .filter((item, index, all) => item.label.trim() && (item.href || index === all.length - 1));
  if (trail.length < 2) return null;
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.label,
      // Google permits the last breadcrumb to omit its URL.
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

interface ProductData {
  title: string;
  images: string[];
  price: number;
  status?: string;
  productCode?: string;
  brand?: string;
  description: { content: string };
  reviews: { rating: number; reviewedBy?: string; comment: string; title?: string }[];
}

export function productSchema(product: ProductData, path: string): StructuredData {
  const availability: Record<string, string> = {
    "in stock": "InStock", "out of stock": "OutOfStock", "pre-order": "PreOrder",
    "pre order": "PreOrder", "preorder": "PreOrder", "discontinued": "Discontinued",
    "backorder": "BackOrder", "back order": "BackOrder", "limited stock": "LimitedAvailability",
  };
  const stock = availability[(product.status ?? "In Stock").trim().toLowerCase()];
  const ratings = product.reviews.filter(review => Number.isFinite(review.rating) && review.rating >= 1 && review.rating <= 5);
  const reviews = ratings.filter(review => review.reviewedBy?.trim() && review.comment.trim());
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org", "@type": "Product", "@id": `${url}#product`,
    name: product.title, url, mainEntityOfPage: { "@id": `${url}#webpage` },
    image: [...new Set(product.images)].map(image => absoluteUrl(image)),
    description: product.description.content,
    ...(product.productCode ? { sku: product.productCode } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(Number.isFinite(product.price) && product.price > 0 ? {
      offers: {
        "@type": "Offer", url, priceCurrency: "BDT", price: product.price,
        seller: { "@id": organizationId },
        ...(stock ? { availability: `https://schema.org/${stock}` } : {}),
      },
    } : {}),
    ...(ratings.length ? {
      aggregateRating: {
        "@type": "AggregateRating", ratingValue: ratings.reduce((total, review) => total + review.rating, 0) / ratings.length,
        ratingCount: ratings.length, bestRating: 5, worstRating: 1,
      },
    } : {}),
    ...(reviews.length ? {
      review: reviews.map(review => ({
        "@type": "Review", author: { "@type": "Person", name: review.reviewedBy },
        reviewBody: review.comment, ...(review.title ? { name: review.title } : {}),
        reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5, worstRating: 1 },
      })),
    } : {}),
  };
}

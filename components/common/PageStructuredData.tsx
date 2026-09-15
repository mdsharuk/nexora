"use client";

import { usePathname } from "next/navigation";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, pageSchema } from "@/modules/structuredData";
import { siteName } from "@/config/seo";
import type { BreadcrumbItem } from "./Breadcrumb/Breadcrumb";

export default function PageStructuredData({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItem[] }) {
  const path = usePathname();
  if (!path || /^\/(account|login|register|forgot-password|cart|checkout|compare|search|track-order|404)(\/|$)/.test(path)) return null;
  // Error pages render Header without a breadcrumb; only Home needs no trail.
  if (path !== "/" && breadcrumbs.length === 0) return null;
  const type = path.startsWith("/category/") || path === "/blog" || path.startsWith("/blog/tag/") || path.startsWith("/blog/author/") || /^\/blog\/(best-products|comparisons|buying-guides|tech-trends)$/.test(path)
    ? "CollectionPage" : path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage";
  return <>
    <JsonLd id="page-jsonld" data={pageSchema(path, breadcrumbs.at(-1)?.label || siteName, type)} />
    <JsonLd id="breadcrumb-jsonld" data={breadcrumbSchema(breadcrumbs, path)} />
  </>;
}

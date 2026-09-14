import type { Metadata } from "next";
import CategoryCatalogPage from "@/components/category";

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
}

const titleFromSlug = (slugParts: string[]) =>
  slugParts
    .flatMap((part) => part.split("-"))
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = titleFromSlug(slug);

  return {
    title: `${categoryName} Price in Bangladesh | Nexora Tech`,
    description: `Browse ${categoryName} products, prices, specifications, and offers at Nexora Tech.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categorySlug = slug.join("/");

  return <CategoryCatalogPage slug={decodeURIComponent(categorySlug)} />;
}

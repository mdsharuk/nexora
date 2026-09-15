import type { Metadata } from "next";
import ProductDetail from "@/components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productName = titleFromSlug(slug);

  return {
    alternates: { canonical: `/product/${encodeURIComponent(slug)}` },
    title: `${productName} Price in Bangladesh | Nexora Tech`,
    description: `Buy ${productName} at best price in Bangladesh. Check specifications, reviews, and offers at Nexora Tech.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productName = titleFromSlug(decodeURIComponent(slug));

  return (
    <ProductDetail
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Component", href: "/category/component" },
        { label: "Processor", href: "/category/component/processor" },
        { label: productName },
      ]}
      images={[
        "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15abr8/ideapad-slim-3-15abr8-arctic-grey-01-228x228.webp",
        "/images/products/monitor.svg",
        "/images/products/desktop-pc.svg",
      ]}
      title={productName}
      price={56850}
      oldPrice={58949}
      regularPrice={61995}
      status="In Stock"
      productCode="52619"
      brand="AMD"
      keyFeatures={[
        "Model: Ryzen 7 5700G Custom Desktop PC",
        "AMD Ryzen 7 5700G Processor with Radeon Graphics",
        "GIGABYTE B450M K AMD AM4 Micro ATX Motherboard",
        "AITC Kingsman Innovator 16GB DDR4 3200MHz Desktop RAM Black",
        "Colorful CN600 PRO 256GB M.2 NVMe SSD",
      ]}
      gift={{ label: 'GEESUU 24" Monitor!' }}
      specSections={[
        {
          title: "Basic Information",
          items: [
            { label: "Processor", value: "AMD Ryzen 7 5700G Processor with Radeon Graphics\n3 Years Warranty (No Warranty for Fan or Cooler)" },
            { label: "Motherboard", value: "GIGABYTE B450M K AMD AM4 Micro ATX Motherboard\n3 Years Warranty" },
            { label: "RAM", value: "AITC Kingsman Innovator 16GB DDR4 3200MHz Desktop RAM Black\nLifetime Warranty" },
            { label: "Storage", value: "Colorful CN600 PRO 256GB M.2 NVMe SSD\n03 Years Warranty" },
            { label: "Casing", value: "Gamdias AURA GC15 ARGB ATX Mid Tower Gaming Casing\nNo Warranty" },
            { label: "Power Supply", value: "MaxGreen Power Wave 230W Power Supply\n2 Years Warranty" },
          ],
        },
      ]}
      description={{
        title: productName,
        content: `The AMD Ryzen 7 5700G Custom Desktop PC is a powerful and versatile computer capable of gaming, productivity, and entertainment. It has an AMD Ryzen 7 5700G Processor with Radeon Graphics, an 8-core, 16-thread CPU with integrated graphics, and overclocking capability. The GIGABYTE B450M K AMD AM4 Micro ATX Motherboard features a clean, beautiful design and supports the latest AMD AM4 CPUs. The AITC Kingsman Innovator 16GB DDR4 3200MHz Desktop RAM Black, paired with the Colorful CN600 PRO 256GB M.2 NVMe SSD, delivers quick, smooth performance for your system.`,
        links: [
          { label: "AMD Ryzen 7 5700G Processor with Radeon Graphics", href: "#" },
          { label: "GIGABYTE B450M K AMD AM4 Micro ATX Motherboard", href: "#" },
          { label: "AITC Kingsman Innovator 16GB DDR4 3200MHz Desktop RAM Black", href: "#" },
          { label: "Colorful CN600 PRO 256GB M.2 NVMe SSD", href: "#" },
        ],
        faqTitle: `What is the price of ${productName} in Bangladesh?`,
        faqAnswer: `The latest price of ${productName} in Bangladesh is 56,850৳. You can buy the ${productName} at best price from our website or visit any of our showrooms.`,
      }}
      questions={[]}
      reviews={[]}
      similarProducts={[
        { id: 1, title: "AMD Ryzen 7 5700G Custom Desktop PC", imageUrl: "/images/products/desktop-pc.svg", productUrl: "/product/amd-ryzen-7-5700g-custom-desktop-pc", price: 46000, oldPrice: 50299 },
        { id: 2, title: "Intel 12th Gen Core i5-12400F Desktop PC", imageUrl: "/images/products/desktop-pc.svg", productUrl: "/product/intel-12th-gen-core-i5-12400f-desktop-pc", price: 46800, oldPrice: 51400 },
        { id: 3, title: "AMD Ryzen 5 5500 Gaming PC", imageUrl: "/images/products/desktop-pc.svg", productUrl: "/product/amd-ryzen-5-5500-gaming-pc", price: 63500, oldPrice: 66999 },
        { id: 4, title: "Intel Core i5 14500 14th Gen Desktop PC", imageUrl: "/images/products/desktop-pc.svg", productUrl: "/product/intel-core-i5-14500-14th-gen-desktop-pc", price: 63500, oldPrice: 67400 },
      ]}
    />
  );
}

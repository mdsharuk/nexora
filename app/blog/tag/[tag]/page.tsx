import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const tagName = tag === "ipad" ? "iPad" : tag.charAt(0).toUpperCase() + tag.slice(1);
  const articles = [
    ["The Complete iPad Guide: Setup, Features, Tips, and Troubleshooting", "/images/products/laptop.svg", "Buying Guides"],
    ["Apple Unveils The New iPad Air: Faster, Smarter, and More Powerful", "/images/products/phone.svg", "Tech Trends"],
  ];

  return <><Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: `Tag: ${tagName}` }]} /><main className="blog-page"><div className="blog-page__content blog-tag-page"><div className="blog-heading"><span>Blog Tag</span><h1>Articles tagged with “{tagName}”</h1></div><div className="blog-grid">{articles.map(([title, image, category], index) => <article className={`blog-card blog-card--${index}`} key={title}><div className="blog-card__image"><Image src={image} alt="" width={160} height={120} /><span>{category}</span></div><div className="blog-card__body"><div className="blog-card__meta"><span>10 Sep 2026</span><span>8 min. read</span></div><h3><Link href={`/blog/${slugify(title)}`}>{title}</Link></h3><p>Explore helpful product information, setup tips, and practical advice.</p><Link href={`/blog/${slugify(title)}`}>Read More <span>→</span></Link></div></article>)}</div></div></main><Footer /></>;
}

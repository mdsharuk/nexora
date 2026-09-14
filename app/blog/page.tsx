import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const articles = [
  ["Laptop Buying Guide: Things to Consider When Choosing a Laptop", "Buying Guides", "/images/products/laptop.svg", "24 Jun 2026", "14 min. read", "Your ultimate laptop buying guide: smart, future-ready, and tailored to your needs."],
  ["Best Charger Fans in Bangladesh for Summer Power Cuts", "Best Products", "https://www.startech.com.bd/image/cache/catalog/blog/2026/best-charger-fan-in-bangladesh/best-charger-fan-in-bangladesh-cover-420x198.webp", "26 May 2026", "6 min. read", "Find the best charger fans for dependable cooling when you need it most."],
  ["Top 5 Best Camera Phones in Bangladesh", "Best Products", "/images/products/phone.svg", "19 Aug 2026", "9 min. read", "Compare popular camera phones, features, and photo capabilities."],
  ["How to Choose the Best Air Conditioner", "Buying Guides", "/images/products/monitor.svg", "31 Mar 2026", "7 min. read", "Tips for finding the right air conditioner for your home and budget."],
  ["Best Mini Fan in Bangladesh", "Best Products", "/images/products/headphone.svg", "30 Apr 2026", "8 min. read", "Find compact, portable, and rechargeable fans for everyday comfort."],
  ["iPad vs Drawing Tablet: Which One Is Better for Digital Art?", "Comparisons", "https://www.startech.com.bd/image/cache/catalog/blog/2026/ipad-vs-drawing-tablet/ipad-vs-drawing-tablet-420x198.webp", "10 Sep 2026", "8 min. read", "Compare devices to find the right tool for your creative workflow."],
  ["Apple Unveils Watch Series 12 and Ultra 4", "Tech Trends", "https://www.startech.com.bd/image/cache/catalog/blog/2026/apple-unveils-watch-series-12-and-ultra-4/apple-unveils-watch-series-12-and-ultra-4-cover-420x198.webp", "11 Sep 2026", "8 min. read", "The latest Apple wearables bring new health, fitness, and battery upgrades."],
  ["iPhone 18 Pro vs iPhone 17 Pro: Should You Upgrade?", "Tech Trends", "https://www.startech.com.bd/image/cache/catalog/blog/2026/iphone-18-pro-vs-iphone-17-pro/iphone-18-pro-vs-iphone-17-pro-420x198.png", "13 Sep 2026", "7 min. read", "A clear comparison to help you decide whether an upgrade is worthwhile."],
  ["The Complete iPad Guide: Setup, Features, Tips, and Troubleshooting", "Buying Guides", "https://www.startech.com.bd/image/cache/catalog/blog/2026/ipad-guide-in-bangladesh/complete-ipad-guide-in-bangladesh-slider-420x198.webp", "10 Sep 2026", "11 min. read", "Learn how to set up, use, and get more from your iPad."],
  ["CCTV vs. WiFi Camera: Which Is Better for Home or Office?", "Comparisons", "https://www.startech.com.bd/image/cache/catalog/blog/2026/cctv-vs-wifi-camera/cctv-vs-wifi-camera-cover-420x198.webp", "31 Aug 2026", "10 min. read", "Choose the right security camera with our practical comparison."],
  ["Best Blood Pressure Monitors for Home Use", "Best Products", "https://www.startech.com.bd/image/cache/catalog/blog/2026/best-blood-pressure-monitor-in-bangladesh/best-blood-pressure-monitor-in-bangladesh-cover-420x198.webp", "12 Sep 2026", "9 min. read", "Find reliable monitors for accurate checks at home."],
  ["10 Must-Have Kitchen Appliances for Every Home", "Buying Guides", "https://www.startech.com.bd/image/cache/catalog/blog/2026/must-have-kitchen-appliances/must-have-kitchen-appliances-in-bangladesh-420x198.webp", "27 Aug 2026", "9 min. read", "Discover useful appliances that make everyday life easier."],
];

const articleSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function ArticleCard({ article, index }: { article: string[]; index: number }) {
  const [title, category, image, date, time, description] = article;
  return <article className={`blog-card blog-card--${index % 6}`}>
    <div className="blog-card__image"><Image src={image} alt="" width={160} height={120} /><span>{category}</span></div>
    <div className="blog-card__body"><div className="blog-card__meta"><span>{date}</span><span>{time}</span></div><h3><Link href={`/blog/${articleSlug(title)}`}>{title}</Link></h3><p>{description}</p><Link href={`/blog/${articleSlug(title)}`}>Read More <span>→</span></Link></div>
  </article>;
}

export default function BlogPage() {
  return <><Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} /><main className="blog-page"><div className="blog-page__content">
    <section className="blog-heading"><span>Explore Nexora Tech</span><h1>Featured Categories</h1><p>Read insightful articles from top categories</p></section>
    <div className="blog-categories">{[["◈", "Best Products", "112 Articles", "best-products"], ["▣", "Comparisons", "33 Articles", "comparisons"], ["▤", "Buying Guides", "62 Articles", "buying-guides"], ["⌁", "Tech Trends", "72 Articles", "tech-trends"]].map(([icon, label, count, slug]) => <Link className="blog-category" href={`/blog/${slug}`} key={label}><b>{icon}</b><div><strong>{label}</strong><small>{count}</small></div></Link>)}</div>
    <section className="blog-heading blog-heading--articles"><h2>Featured Articles</h2><p>Read the latest tech articles by the industry experts.</p></section>
    <div className="blog-grid">{articles.slice(0, 6).map((article, index) => <ArticleCard article={article} index={index} key={article[0]} />)}</div>
    <section className="blog-heading blog-heading--articles"><h2>Latest Articles</h2><p>Fresh buying guides, comparisons, and technology news.</p></section>
    <div className="blog-grid">{articles.slice(6).map((article, index) => <ArticleCard article={article} index={index + 6} key={article[0]} />)}</div>
  </div></main><Footer /></>;
}

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/common/JsonLd";
import { absoluteUrl } from "@/config/seo";
import { organizationId } from "@/modules/structuredData";

const categories: Record<
  string,
  { name: string; articles: [string, string, string, string, string][] }
> = {
  "best-products": {
    name: "Best Products",
    articles: [
      [
        "Best Blood Pressure Monitors for Home Use",
        "/images/products/keyboard.svg",
        "12 Sep 2026",
        "11 min. read",
        "Find the best blood pressure monitors for accurate home health checks.",
      ],
      [
        "Best Hair Straighteners and Flat Irons in Bangladesh",
        "/images/products/headphone.svg",
        "02 Aug 2026",
        "4 min. read",
        "Explore reliable hair styling tools for smooth, healthy hair.",
      ],
      [
        "Best Monitors for Video Editing in Bangladesh",
        "/images/products/monitor.svg",
        "29 Jul 2026",
        "11 min. read",
        "Find a display that gives creators accurate color and sharp detail.",
      ],
      [
        "Best Waterproof Laptop Backpacks",
        "/images/products/laptop.svg",
        "23 Jul 2026",
        "6 min. read",
        "Keep your devices protected with the right backpack.",
      ],
      [
        "Best Mini Fan in Bangladesh",
        "/images/products/headphone.svg",
        "30 Apr 2026",
        "8 min. read",
        "Portable cooling options for everyday comfort.",
      ],
      [
        "Top 5 Best Camera Phones in Bangladesh",
        "/images/products/phone.svg",
        "19 Aug 2026",
        "9 min. read",
        "Compare the best camera phones for photo enthusiasts.",
      ],
    ],
  },
  comparisons: {
    name: "Comparisons",
    articles: [
      [
        "iPad vs Drawing Tablet: Which One Is Better?",
        "/images/products/monitor.svg",
        "10 Sep 2026",
        "8 min. read",
        "Choose the right tool for your digital art workflow.",
      ],
      [
        "CCTV vs. WiFi Camera: Which Is Better?",
        "/images/products/desktop-pc.svg",
        "31 Aug 2026",
        "10 min. read",
        "A practical camera comparison for home and office.",
      ],
      [
        "Laptop vs Desktop: Which Should You Buy?",
        "/images/products/laptop.svg",
        "20 Aug 2026",
        "7 min. read",
        "Compare performance, portability, and value.",
      ],
    ],
  },
  "buying-guides": {
    name: "Buying Guides",
    articles: [
      [
        "Laptop Buying Guide for Bangladesh",
        "/images/products/laptop.svg",
        "24 Jun 2026",
        "14 min. read",
        "Everything to consider before you choose a new laptop.",
      ],
      [
        "How to Choose the Best Air Conditioner",
        "/images/products/monitor.svg",
        "31 Mar 2026",
        "7 min. read",
        "Find the right air conditioner for your space and budget.",
      ],
      [
        "The Complete iPad Guide",
        "/images/products/phone.svg",
        "10 Sep 2026",
        "11 min. read",
        "Set up, features, tips, and troubleshooting.",
      ],
    ],
  },
  "tech-trends": {
    name: "Tech Trends",
    articles: [
      [
        "Apple Unveils Watch Series 12 and Ultra 4",
        "/images/products/phone.svg",
        "11 Sep 2026",
        "8 min. read",
        "The latest features and upgrades from Apple.",
      ],
      [
        "iPhone 18 Pro vs iPhone 17 Pro",
        "/images/products/phone.svg",
        "13 Sep 2026",
        "7 min. read",
        "Should you upgrade to the latest model?",
      ],
      [
        "Technology Trends to Watch",
        "/images/products/desktop-pc.svg",
        "05 Sep 2026",
        "6 min. read",
        "The trends changing how we work and play.",
      ],
    ],
  },
};

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function ArticleDetail({ slug }: { slug: string }) {
  const title = titleFromSlug(slug);
  const normalizedTitle = title.toLowerCase();
  const topic = normalizedTitle.includes("ipad")
    ? "iPad"
    : normalizedTitle.includes("iphone") || normalizedTitle.includes("apple")
      ? "Apple"
      : normalizedTitle.includes("laptop")
        ? "Laptop"
        : normalizedTitle.includes("camera") || normalizedTitle.includes("cctv")
          ? "Camera"
          : normalizedTitle.includes("monitor")
            ? "Monitor"
            : normalizedTitle.includes("calculator")
              ? "Calculator"
              : normalizedTitle.includes("fan")
                ? "Cooling"
                : "Tech Guides";
  const coverImage = normalizedTitle.includes("ipad vs drawing tablet")
    ? "https://www.startech.com.bd/image/cache/catalog/blog/2026/ipad-vs-drawing-tablet/ipad-vs-drawing-tablet-420x198.webp"
    : normalizedTitle.includes("best charger fans")
      ? "https://www.startech.com.bd/image/cache/catalog/blog/2026/best-charger-fan-in-bangladesh/best-charger-fan-in-bangladesh-cover-420x198.webp"
    : normalizedTitle.includes("apple unveils watch")
      ? "https://www.startech.com.bd/image/cache/catalog/blog/2026/apple-unveils-watch-series-12-and-ultra-4/apple-unveils-watch-series-12-and-ultra-4-cover-420x198.webp"
      : normalizedTitle.includes("iphone 18 pro vs iphone 17 pro")
        ? "https://www.startech.com.bd/image/cache/catalog/blog/2026/iphone-18-pro-vs-iphone-17-pro/iphone-18-pro-vs-iphone-17-pro-420x198.png"
        : normalizedTitle.includes("complete ipad guide")
          ? "https://www.startech.com.bd/image/cache/catalog/blog/2026/ipad-guide-in-bangladesh/complete-ipad-guide-in-bangladesh-slider-420x198.webp"
          : "/images/products/keyboard.svg";
  const latest = [
    "Apple Unveils Watch Series 12 and Ultra 4",
    "iPhone 18 Pro vs iPhone 17 Pro: Should You Upgrade?",
    "iPad vs Drawing Tablet: Which One Is Better for Digital Art?",
    "The Complete iPad Guide: Setup, Features, Tips, and Troubleshooting",
    "Best Blood Pressure Monitors for Home Use",
  ];
  return (
    <>
      <JsonLd id="article-jsonld" data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/blog/${encodeURIComponent(slug)}`)}#article`,
        url: absoluteUrl(`/blog/${encodeURIComponent(slug)}`),
        mainEntityOfPage: { "@id": `${absoluteUrl(`/blog/${encodeURIComponent(slug)}`)}#webpage` },
        headline: title,
        image: [absoluteUrl(coverImage)],
        dateModified: "2026-07-22",
        author: { "@type": "Organization", name: "Nexora Tech Team", url: absoluteUrl("/blog/author/nexora-tech-team") },
        publisher: { "@id": organizationId },
        articleSection: "Buying Guides",
        inLanguage: "en",
      }} />
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title },
        ]}
      />
      <main className="blog-page">
        <div className="article-layout">
          <article className="article-detail">
            <div className="article-detail__hero">
              <Image
                src={coverImage}
                alt=""
                width={460}
                height={280}
                priority
              />
            </div>
            <div className="article-detail__body">
              <h1>{title}</h1>
              <p className="article-detail__byline">
                By <Link href="/blog/author/nexora-tech-team"><strong>Nexora Tech Team</strong></Link> · Buying Guides · Updated:
                22 Jul, 2026 · 5 min. read
              </p>
              <div className="article-detail__summary">
                <strong>Summary:</strong> Explore clear product information,
                helpful tips, and practical advice to help you make the right
                technology choice.
              </div>
              <p>
                Technology choices can feel complicated, especially when there
                are many models and features to compare. This guide explains the
                most important details in a clear, practical way so you can
                confidently choose the product that fits your needs.
              </p>
              <h2>What you need to know</h2>
              <p>
                Start by considering your everyday use, budget, and the features
                that matter most. Comparing reliable specifications and support
                information will help you find lasting value.
              </p>
              <h2>Key points to consider</h2>
              <ul>
                <li>Choose products that match your actual requirements.</li>
                <li>
                  Compare features, warranty coverage, and long-term value.
                </li>
                <li>
                  Review trusted support and delivery information before
                  ordering.
                </li>
              </ul>
              <div className="article-detail__note">
                Please check product specifications and availability before
                placing your order.
              </div>
              <h2>Final thoughts</h2>
              <p>
                Nexora Tech is here to help you choose with confidence. If you
                need product advice or order support, our team is ready to
                assist.
              </p>
              <div className="article-detail__topic">
                Topic: <Link href={`/blog/tag/${topic.toLowerCase()}`}>{topic}</Link>
              </div>
              <div className="article-detail__author">
                <b>N</b>
                <div>
                  <strong>Nexora Tech Team</strong>
                  <span>Web Content Team</span>
                  <p>
                    A team of technology enthusiasts sharing useful guides,
                    comparisons, and product advice.
                  </p>
                </div>
              </div>
              <div className="article-detail__share">
                Share on: <span>f</span>
                <span>in</span>
                <span>𝕏</span>
              </div>
            </div>
            <div className="article-helpful">
              <div>
                <strong>Was this article helpful?</strong>
                <small>People found this helpful</small>
              </div>
              <button>Yes</button>
              <button>No</button>
            </div>
            <section className="article-comments">
              <h2>Comments</h2>
              <p>There are no comments for this article.</p>
              <h3>Write a comment</h3>
              <div>
                <input placeholder="Name" />
                <input placeholder="Your Email" />
              </div>
              <textarea placeholder="Your Comment" rows={5} />
              <button>Submit</button>
            </section>
          </article>
          <aside className="article-sidebar">
            <h2>Latest Article</h2>
            {latest.map((item, index) => (
              <Link
                href={`/blog/${item
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}
                key={item}
              >
                <small>{index % 2 ? "Tech Trends" : "Buying Guides"}</small>
                <strong>{item}</strong>
              </Link>
            ))}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = categories[category];
  if (!data) return <ArticleDetail slug={category} />;
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: data.name },
        ]}
      />
      <main className="blog-page">
        <div className="blog-page__content blog-category-page">
          <div className="blog-heading">
            <span>Blog Category</span>
            <h1>Articles on “{data.name}”</h1>
            <p>Explore useful technology articles selected for you.</p>
          </div>
          <div className="blog-grid">
            {data.articles.map(
              ([title, image, date, time, description], index) => (
                <article
                  className={`blog-card blog-card--${index % 6}`}
                  key={title}
                >
                  <div className="blog-card__image">
                    <Image src={image} alt="" width={160} height={120} />
                    <span>{data.name}</span>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>{date}</span>
                      <span>{time}</span>
                    </div>
                    <h3>
                      <Link
                        href={`/blog/${title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}`}
                      >
                        {title}
                      </Link>
                    </h3>
                    <p>{description}</p>
                    <Link
                      href={`/blog/${title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")}`}
                    >
                      Read More <span>→</span>
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>
          <nav className="blog-pagination" aria-label="Blog pagination">
            <span>Previous</span>
            <b>1</b>
            <span>Next</span>
            <div className="blog-pagination__summary">
              Showing 1 to {data.articles.length} of {data.articles.length} (1 Page)
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}

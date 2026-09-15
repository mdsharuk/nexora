"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";
import JsonLd from "@/components/common/JsonLd";
import { productSchema } from "@/modules/structuredData";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductHero from "./ProductHero";
import ProductSpecs, { type SpecSection } from "./ProductSpecs";
import ProductDescription from "./ProductDescription";
import ProductQuestions, { type Question } from "./ProductQuestions";
import ProductReviews, { type Review } from "./ProductReviews";
import SimilarProducts, { type SimilarProduct } from "./SimilarProducts";

export interface ProductDetailProps {
  images: string[];
  title: string;
  price: number;
  oldPrice?: number;
  regularPrice?: number;
  status?: string;
  productCode?: string;
  brand?: string;
  keyFeatures?: string[];
  gift?: { label: string; image?: string };
  breadcrumbs?: { label: string; href?: string }[];
  specSections: SpecSection[];
  description: {
    title: string;
    content: string;
    links?: { label: string; href: string }[];
    faqTitle?: string;
    faqAnswer?: string;
  };
  questions: Question[];
  reviews: Review[];
  similarProducts: SimilarProduct[];
}

export default function ProductDetail({
  images,
  title,
  price,
  oldPrice,
  regularPrice,
  status,
  productCode,
  brand,
  keyFeatures,
  gift,
  breadcrumbs,
  specSections,
  description,
  questions,
  reviews,
  similarProducts,
}: ProductDetailProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("specification");
  const [headerHeight, setHeaderHeight] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".header-wrapper");
    if (!header) return;

    const updateHeight = () => setHeaderHeight(header.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const getScrollOffset = useCallback(
    () => headerHeight + (tabsRef.current?.getBoundingClientRect().height ?? 0) + 16,
    [headerHeight],
  );

  const scrollToSection = useCallback((id: string) => {
    setActiveTab(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = getScrollOffset();
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [getScrollOffset]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = getScrollOffset();
      const tabs = ["specification", "description", "questions", "reviews"];
      for (const id of tabs) {
        const el = sectionRefs.current[id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset + 1 && rect.bottom > offset) {
            setActiveTab(id);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getScrollOffset]);

  const tabs = [
    { id: "specification", label: "Specification" },
    { id: "description", label: "Description" },
    { id: "questions", label: `Questions (${questions.length})` },
    { id: "reviews", label: `Reviews (${reviews.length})` },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4400",
          colorPrimaryHover: "#ff4400",
        },
      }}
    >
      <Header breadcrumbs={breadcrumbs} />
      {pathname && <JsonLd id="product-jsonld" data={productSchema({ title, images, price, status, productCode, brand, description, reviews }, pathname)} />}

      <main style={{ background: "#f1f3f7", minHeight: "60vh" }}>
        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "16px 0",
          }}
        >
          <ProductHero
            images={images}
            title={title}
            price={price}
            oldPrice={oldPrice}
            regularPrice={regularPrice}
            status={status}
            productCode={productCode}
            brand={brand}
            keyFeatures={keyFeatures}
            gift={gift}
          />
        </div>
      </main>

      <div
        style={{
          width: "calc(100% - 32px)",
          maxWidth: 1320,
          margin: "0 auto",
          padding: "16px 0 32px",
        }}
      >
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", minWidth: 0 }}>
            <div
              ref={tabsRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0,
                marginBottom: 20,
                position: "sticky",
                top: headerHeight,
                zIndex: 10,
                background: "#ffffff",
                paddingTop: 8,
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px 6px 0 0",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "all 0.2s",
                    background: activeTab === tab.id ? "#ff4400" : "#ffffff",
                    color: activeTab === tab.id ? "#ffffff" : "#6b7280",
                    boxShadow:
                      activeTab === tab.id
                        ? "0 -2px 0 0 #ff4400 inset"
                        : "0 -2px 0 0 #e5e7eb inset",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["specification"] = el;
              }}
              id="specification"
              style={{ marginBottom: 24 }}
            >
              <ProductSpecs sections={specSections} />
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["description"] = el;
              }}
              id="description"
              style={{ marginBottom: 24 }}
            >
              <ProductDescription {...description} />
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["questions"] = el;
              }}
              id="questions"
              style={{ marginBottom: 24 }}
            >
              <ProductQuestions questions={questions} productName={title} />
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["reviews"] = el;
              }}
              id="reviews"
            >
              <ProductReviews reviews={reviews} productName={title} />
            </div>
          </div>
          <div style={{ flex: "0 0 300px", minWidth: 0 }}>
            <SimilarProducts products={similarProducts} />
          </div>
        </div>
      </div>

      <Footer />
    </ConfigProvider>
  );
}

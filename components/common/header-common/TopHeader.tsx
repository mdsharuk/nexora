"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import {
  SearchIcon,
  GiftIcon,
  FlashIcon,
  BuildIcon,
  PersonIcon,
} from "@/components/common/header-common/Icons";

interface SearchProduct {
  id: number;
  title: string;
  imageUrl: string;
  productUrl: string;
  price: number;
  oldPrice?: number;
}

interface SearchCategory {
  name: string;
  slug: string;
}

interface SearchResults {
  products: SearchProduct[];
  categories: SearchCategory[];
}

const TopHeader: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ products: [], categories: [] });
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults({ products: [], categories: [] });
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults({ products: [], categories: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(true);
    setActiveTab("products");
    setLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleProductClick = (url: string) => {
    setShowDropdown(false);
    router.push(url);
  };

  const handleCategoryClick = (slug: string) => {
    setShowDropdown(false);
    router.push(`/category/${slug}`);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const formatPrice = (price: number) =>
    `${new Intl.NumberFormat("en-US").format(price)}৳`;

  const hasResults = results.products.length > 0 || results.categories.length > 0;

  return (
    <div className="top-header">
      <div className="container">
        <div className="top-header-inner">
          <Logo />

          <div className="search-bar" ref={dropdownRef}>
            <form className="search-wrapper" onSubmit={handleSearch}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                aria-label="Search products"
                autoComplete="off"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <SearchIcon />
              </button>
            </form>

            {showDropdown && searchQuery.trim() && (
              <div className="search-dropdown">
                <div className="search-dropdown-tabs">
                  <button
                    className={`search-tab ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                  >
                    Products
                  </button>
                  <button
                    className={`search-tab ${activeTab === "categories" ? "active" : ""}`}
                    onClick={() => setActiveTab("categories")}
                  >
                    Categories
                  </button>
                </div>

                <div className="search-dropdown-content">
                  {loading && (
                    <div className="search-loading">Searching...</div>
                  )}

                  {!loading && !hasResults && (
                    <div className="search-no-results">No results found</div>
                  )}

                  {!loading && activeTab === "products" && results.products.length > 0 && (
                    <div className="search-products-list">
                      {results.products.map((product) => (
                        <div
                          key={product.id}
                          className="search-product-item"
                          onClick={() => handleProductClick(product.productUrl)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="search-product-thumb"
                            width={50}
                            height={50}
                          />
                          <div className="search-product-info">
                            <span className="search-product-title">{product.title}</span>
                            <div className="search-product-prices">
                              <span className="search-product-price">{formatPrice(product.price)}</span>
                              {product.oldPrice && (
                                <span className="search-product-old-price">{formatPrice(product.oldPrice)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!loading && activeTab === "categories" && results.categories.length > 0 && (
                    <div className="search-categories-list">
                      {results.categories.map((cat) => (
                        <div
                          key={cat.slug}
                          className="search-category-item"
                          onClick={() => handleCategoryClick(cat.slug)}
                        >
                          {cat.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="quick-actions">
            <Link href="/offers" className="action-item">
              <span className="action-icon">
                <GiftIcon />
              </span>
              <span className="action-text">
                <span className="action-title">Offers</span>
                <span className="action-subtitle">Latest Deals</span>
              </span>
            </Link>

            <Link href="/happy-hour" className="action-item">
              <span className="action-icon">
                <FlashIcon className="blink" />
              </span>
              <span className="action-text">
                <span className="action-title">Happy Hour</span>
                <span className="action-subtitle">Special Deals</span>
              </span>
            </Link>

            <Link href="/pc-builder" className="action-item pc-builder-btn">
              <span className="action-icon">
                <BuildIcon />
              </span>
              <span className="action-text">
                <span className="action-title">PC Builder</span>
              </span>
            </Link>

            <Link href="/login" className="action-item">
              <span className="action-icon">
                <PersonIcon />
              </span>
              <span className="action-text">
                <span className="action-title">Account</span>
                <span className="action-subtitle">Login / Register</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

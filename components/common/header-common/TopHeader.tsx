"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  SearchIcon,
  GiftIcon,
  FlashIcon,
  BuildIcon,
  PersonIcon,
} from "@/components/common/header-common/Icons";

const TopHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="top-header">
      <div className="container">
        <div className="top-header-inner">
          <Logo />

          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <SearchIcon />
              </button>
            </div>
          </form>

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

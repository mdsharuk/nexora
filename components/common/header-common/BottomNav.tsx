"use client";

import React from "react";
import Link from "next/link";
import {
  GiftIcon,
  FlashIcon,
  BuildIcon,
  PersonIcon,
} from "@/components/common/header-common/Icons";
import { useCompare } from "@/contexts/CompareContext";

const BottomNav: React.FC = () => {
  const { products } = useCompare();
  const compareCount = products.length;

  return (
    <nav className="bottom-nav">
      <Link href="/offers" className="bottom-nav-item">
        <span className="bottom-nav-icon">
          <GiftIcon size={20} />
        </span>
        <span className="bottom-nav-label">Offers</span>
      </Link>
      <Link href="/happy-hour" className="bottom-nav-item">
        <span className="bottom-nav-icon">
          <FlashIcon size={20} />
        </span>
        <span className="bottom-nav-label">Happy Hour</span>
      </Link>
      <Link href="/pc-builder" className="bottom-nav-item">
        <span className="bottom-nav-icon">
          <BuildIcon size={20} />
        </span>
        <span className="bottom-nav-label">PC Builder</span>
      </Link>
      <Link href="/compare" className="bottom-nav-item" style={{ position: "relative" }}>
        <span className="bottom-nav-icon">
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="8" height="18" rx="1" />
            <rect x="14" y="3" width="8" height="18" rx="1" />
            <line x1="6" y1="12" x2="18" y2="12" />
          </svg>
          {compareCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 8,
                minWidth: 16,
                height: 16,
                padding: "0 4px",
                borderRadius: 8,
                background: "#ff4400",
                color: "#ffffff",
                fontSize: 10,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {compareCount}
            </span>
          )}
        </span>
        <span className="bottom-nav-label">Compare ({compareCount})</span>
      </Link>
      <Link href="/login" className="bottom-nav-item">
        <span className="bottom-nav-icon">
          <PersonIcon size={20} />
        </span>
        <span className="bottom-nav-label">Account</span>
      </Link>
    </nav>
  );
};

export default BottomNav;

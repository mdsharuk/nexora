"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { MenuIcon, SearchIcon, PersonIcon, CartIcon } from "@/components/common/header-common/Icons";

interface MobileHeaderProps {
  onMenuToggle: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuToggle }) => {
  return (
    <div className="mobile-header">
      <div className="mobile-header-inner">
        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <Logo className="mobile-logo" />

        <div className="mobile-actions">
          <Link href="/search" className="mobile-action-btn" aria-label="Search">
            <SearchIcon size={22} />
          </Link>
          <Link href="/login" className="mobile-action-btn" aria-label="Account">
            <PersonIcon size={22} />
          </Link>
          <Link href="/cart" className="mobile-action-btn" aria-label="Cart">
            <CartIcon size={22} />
            <span className="cart-count">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

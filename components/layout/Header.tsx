"use client";

import React, { useState, useEffect, useCallback } from "react";
import TopHeader from "@/components/common/header-common/TopHeader";
import MainNav from "@/components/common/header-common/MainNav";
import MobileHeader from "@/components/common/header-common/MobileHeader";
import MobileDrawer from "@/components/common/header-common/MobileDrawer";
import BottomNav from "@/components/common/header-common/BottomNav";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import type { BreadcrumbItem } from "@/components/common/Breadcrumb/Breadcrumb";
import { menuData } from "@/modules/menuData";
import PageStructuredData from "@/components/common/PageStructuredData";

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  useEffect(() => {
    const checkViewMode = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewMode("mobile");
      } else if (width < 1280) {
        setViewMode("tablet");
      } else {
        setViewMode("desktop");
      }
    };
    checkViewMode();
    window.addEventListener("resize", checkViewMode);
    return () => window.removeEventListener("resize", checkViewMode);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isDesktop = viewMode === "desktop";
  const isTablet = viewMode === "tablet";
  const isMobile = viewMode === "mobile";

  return (
    <>
      <PageStructuredData breadcrumbs={breadcrumbs} />
      <header className="header-wrapper">
        {isDesktop ? (
          <>
            <TopHeader />
            <MainNav items={menuData} />
          </>
        ) : (
          <MobileHeader onMenuToggle={handleMobileMenuToggle} />
        )}

        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          items={menuData}
        />

        {(isTablet || isMobile) && <BottomNav />}
      </header>

      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
    </>
  );
};

export default Header;

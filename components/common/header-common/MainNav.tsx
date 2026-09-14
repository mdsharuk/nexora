"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import type { MenuItem } from "@/modules/menuData";

interface MainNavProps {
  items: MenuItem[];
}

const MainNav: React.FC<MainNavProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [megaMenuAlign, setMegaMenuAlign] = useState<"left" | "right">("left");
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    const navItem = navItemRefs.current[index];
    if (navItem) {
      const rect = navItem.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const estimatedMenuWidth = 700;

      if (rect.left + estimatedMenuWidth > viewportWidth - 16) {
        setMegaMenuAlign("right");
      } else {
        setMegaMenuAlign("left");
      }
    }

    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const renderMenuItem = (item: MenuItem, index: number) => {
    const hasMegaMenu = item.megaMenu && item.megaMenu.length > 0;
    const hasChildren = item.children && item.children.length > 0;
    const isHovered = hoveredIndex === index;

    return (
      <li
        className="nav-item"
        key={item.href}
        ref={(el) => {
          navItemRefs.current[index] = el;
        }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href={item.href}
          className={`nav-link ${isHovered ? "active" : ""}`}
        >
          {item.label}
        </Link>

        {hasMegaMenu && isHovered && (
          <MegaMenu
            groups={item.megaMenu!}
            featured={item.featured}
            align={megaMenuAlign}
          />
        )}

        {hasChildren && !hasMegaMenu && isHovered && (
          <ul className="simple-dropdown">
            {item.children!.map((child) => (
              <li className="dropdown-item" key={child.href}>
                <Link href={child.href} className="nav-link">
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="main-nav">
      <div className="container">
        <ul className="nav-list">{items.map(renderMenuItem)}</ul>
      </div>
    </nav>
  );
};

export default MainNav;

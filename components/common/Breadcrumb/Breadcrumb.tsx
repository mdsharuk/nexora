import React from "react";
import Link from "next/link";
import { HomeIcon } from "@/components/common/header-common/Icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="breadcrumb-bar">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="home-icon" aria-label="Home">
              <HomeIcon />
            </Link>
            <span className="separator">/</span>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li className="breadcrumb-item" key={`${item.label}-${index}`}>
                {isLast ? (
                  <span className="current" title={item.label} aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <>
                    <Link href={item.href}>{item.label}</Link>
                    <span className="separator">/</span>
                  </>
                ) : (
                  <>
                    <span className="breadcrumb-label">{item.label}</span>
                    <span className="separator">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumb;

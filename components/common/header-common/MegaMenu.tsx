import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/common/header-common/Icons";
import type { MegaMenuGroup } from "@/modules/menuData";

interface MegaMenuProps {
  groups: MegaMenuGroup[];
  featured?: { label: string; href: string };
  align?: "left" | "right";
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  groups,
  featured,
  align = "left",
}) => {
  const colsClass =
    groups.length === 2
      ? "cols-2"
      : groups.length === 4
        ? "cols-4"
        : "";

  return (
    <div className={`mega-menu mega-menu-${align}`}>
      <div className={`mega-menu-grid ${colsClass}`}>
        {groups.map((group) => (
          <div className="mega-menu-col" key={group.title}>
            <h4 className="col-title">{group.title}</h4>
            <ul className="col-items">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {featured && (
        <div className="mega-menu-featured">
          <Link href={featured.href} className="featured-link">
            {featured.label}
            <ArrowRightIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;

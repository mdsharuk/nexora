"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CloseIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@/components/common/header-common/Icons";
import type { MenuItem, MegaMenuGroup } from "@/modules/menuData";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
}

interface MainViewState {
  level: "main";
}

interface GroupViewState {
  level: "group";
  title: string;
  groups: MegaMenuGroup[];
  currentGroup?: MegaMenuGroup;
}

type ViewState = MainViewState | GroupViewState;

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [viewStack, setViewStack] = useState<ViewState[]>([{ level: "main" }]);

  const currentView = viewStack[viewStack.length - 1];

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setViewStack([{ level: "main" }]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navigateToItem = (item: MenuItem) => {
    const hasMegaMenu = item.megaMenu && item.megaMenu.length > 0;
    const hasChildren = item.children && item.children.length > 0;

    if (hasMegaMenu || hasChildren) {
      const groups = hasMegaMenu
        ? item.megaMenu!
        : [
            {
              title: item.label,
              items: item.children!,
            },
          ];
      setViewStack((prev) => [
        ...prev,
        {
          level: "group",
          title: item.label,
          groups,
        },
      ]);
    } else {
      onClose();
    }
  };

  const navigateToGroup = (group: MegaMenuGroup) => {
    setViewStack((prev) => [
      ...prev,
      {
        level: "group",
        title: group.title,
        groups: [],
        currentGroup: group,
      },
    ]);
  };

  const goBack = () => {
    if (viewStack.length > 1) {
      setViewStack((s) => s.slice(0, -1));
    }
  };

  const renderMainView = () => (
    <ul className="drawer-menu">
      {items.map((item) => {
        const hasChildren =
          (item.megaMenu && item.megaMenu.length > 0) ||
          (item.children && item.children.length > 0);

        return (
          <li className="drawer-menu-item" key={item.href}>
            {hasChildren ? (
              <button
                className="drawer-menu-link"
                onClick={() => navigateToItem(item)}
              >
                <span>{item.label}</span>
                <ChevronRightIcon />
              </button>
            ) : (
              <Link
                href={item.href}
                className="drawer-menu-link"
                onClick={onClose}
              >
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  const renderGroupView = (view: GroupViewState) => {
    if (view.currentGroup) {
      return (
        <>
          <button className="drawer-back" onClick={goBack}>
            <ChevronLeftIcon />
            <span>Back</span>
          </button>
          <div className="drawer-group-items">
            <div className="drawer-group-title">
              {view.currentGroup.title}
            </div>
            <ul className="drawer-menu">
              {view.currentGroup.items.map((item) => (
                <li className="drawer-menu-item" key={item.href}>
                  <Link
                    href={item.href}
                    className="drawer-menu-link"
                    onClick={onClose}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }

    return (
      <>
        <button className="drawer-back" onClick={goBack}>
          <ChevronLeftIcon />
          <span>Back</span>
        </button>
        <ul className="drawer-menu">
          {view.groups.map((group) => (
            <li className="drawer-menu-item" key={group.title}>
              <button
                className="drawer-menu-link"
                onClick={() => navigateToGroup(group)}
              >
                <span>{group.title}</span>
                <ChevronRightIcon />
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <div
        className={`mobile-drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`mobile-drawer ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="drawer-header">
          <span className="drawer-title">
            {currentView.level === "main" ? "Menu" : currentView.title}
          </span>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-nav">
          {currentView.level === "main" && renderMainView()}
          {currentView.level === "group" && renderGroupView(currentView)}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;

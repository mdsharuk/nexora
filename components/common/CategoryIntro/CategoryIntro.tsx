"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button, ConfigProvider, Flex, Typography } from "antd";

export interface CategoryIntroOption {
  label: ReactNode;
  href: string;
  active?: boolean;
  disabled?: boolean;
}

export interface CategoryIntroProps {
  title: ReactNode;
  description?: ReactNode;
  options?: CategoryIntroOption[];
  className?: string;
}

export default function CategoryIntro({
  title,
  description,
  options = [],
  className,
}: CategoryIntroProps) {
  const titleId = useId();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#304ac4",
          colorPrimaryHover: "#304ac4",
          colorPrimaryActive: "#263da7",
        },
        components: {
          Button: {
            defaultHoverBg: "#304ac4",
            defaultHoverColor: "#ffffff",
            defaultHoverBorderColor: "#304ac4",
            defaultActiveBg: "#263da7",
            defaultActiveColor: "#ffffff",
            defaultActiveBorderColor: "#263da7",
          },
        },
      }}
    >
      <section
        className={className}
        aria-labelledby={titleId}
        style={{
          width: "100%",
          padding: "12px 16px 18px",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1320, margin: "0 auto" }}>
        <Typography.Title
          id={titleId}
          level={1}
          style={{
            margin: "0 0 8px",
            color: "#304ac4",
            fontSize: "clamp(20px, 2.2vw, 24px)",
            lineHeight: 1.35,
            fontWeight: 500,
          }}
        >
          {title}
        </Typography.Title>

        {description ? (
          <Typography.Paragraph
            style={{
              margin: options.length ? "0 0 18px" : 0,
              color: "#111111",
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            {description}
          </Typography.Paragraph>
        ) : null}

        {options.length ? (
          <Flex wrap gap={8} style={{ rowGap: 10 }}>
            {options.map((option) => (
              <Link
                href={option.disabled ? "#" : option.href}
                aria-current={option.active ? "page" : undefined}
                aria-disabled={option.disabled || undefined}
                tabIndex={option.disabled ? -1 : undefined}
                key={option.href}
              >
                <Button
                  type={option.active ? "primary" : "default"}
                  shape="round"
                  size="middle"
                  disabled={option.disabled}
                  style={{
                    minHeight: 36,
                    paddingInline: 15,
                    boxShadow: "none",
                    fontSize: 13,
                  }}
                >
                  {option.label}
                </Button>
              </Link>
            ))}
          </Flex>
        ) : null}
        </div>
      </section>
    </ConfigProvider>
  );
}

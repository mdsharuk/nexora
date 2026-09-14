"use client";

import { Typography } from "antd";

export interface ProductDescriptionProps {
  title: string;
  content: string;
  links?: { label: string; href: string }[];
  faqTitle?: string;
  faqAnswer?: string;
}

export default function ProductDescription({
  title,
  content,
  links = [],
  faqTitle,
  faqAnswer,
}: ProductDescriptionProps) {
  return (
    <div>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <Typography.Text strong style={{ fontSize: 15, display: "block", marginBottom: 12 }}>
          {title}
        </Typography.Text>
        <Typography.Paragraph style={{ fontSize: 13, lineHeight: 1.7, color: "#4b5563", marginBottom: links.length ? 16 : 0 }}>
          {content}
        </Typography.Paragraph>

        {links.length > 0 && (
          <div>
            <Typography.Text strong style={{ fontSize: 13, display: "block", marginBottom: 8 }}>
              For More Details, Please Visit:
            </Typography.Text>
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#ff4400",
                  lineHeight: 2,
                  textDecoration: "underline",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {faqTitle && faqAnswer && (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <Typography.Text strong style={{ fontSize: 14, display: "block", marginBottom: 8 }}>
            {faqTitle}
          </Typography.Text>
          <Typography.Paragraph style={{ fontSize: 13, lineHeight: 1.7, color: "#4b5563", marginBottom: 0 }}>
            {faqAnswer}
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
}

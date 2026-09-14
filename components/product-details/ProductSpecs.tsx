"use client";

import { Typography } from "antd";

export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecSection {
  title: string;
  items: SpecItem[];
}

export interface ProductSpecsProps {
  sections: SpecSection[];
}

export default function ProductSpecs({ sections }: ProductSpecsProps) {
  return (
    <div>
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: si < sections.length - 1 ? 24 : 0 }}>
          <Typography.Text
            strong
            style={{
              color: "#ff4400",
              fontSize: 13,
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            {section.title}
          </Typography.Text>
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {section.items.map((item, ii) => (
              <div
                key={ii}
                style={{
                  display: "flex",
                  borderBottom: ii < section.items.length - 1 ? "1px solid #e5e7eb" : "none",
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    flex: "0 0 140px",
                    padding: "10px 14px",
                    background: "#f9fafb",
                    fontWeight: 600,
                    color: "#374151",
                  }}
                >
                  {item.label}
                </div>
                <div style={{ flex: 1, padding: "10px 14px", color: "#4b5563" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

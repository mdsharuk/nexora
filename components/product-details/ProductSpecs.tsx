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
    <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 20 }}>
      <Typography.Title level={2} style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 600, color: "#000000" }}>
        Specification
      </Typography.Title>
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: si < sections.length - 1 ? 24 : 0 }}>
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

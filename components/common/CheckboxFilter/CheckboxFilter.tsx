"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Checkbox, Collapse, ConfigProvider, Flex } from "antd";

export type CheckboxFilterValue = string | number;

export interface CheckboxFilterOption<T extends CheckboxFilterValue = string> {
  label: ReactNode;
  value: T;
  disabled?: boolean;
}

export interface CheckboxFilterProps<T extends CheckboxFilterValue = string> {
  title: ReactNode;
  options: CheckboxFilterOption<T>[];
  value?: T[];
  defaultValue?: T[];
  onChange?: (values: T[]) => void;
  defaultOpen?: boolean;
  maxHeight?: number;
  disabled?: boolean;
  className?: string;
}

export default function CheckboxFilter<T extends CheckboxFilterValue = string>({
  title,
  options,
  value,
  defaultValue = [],
  onChange,
  defaultOpen = true,
  maxHeight = 280,
  disabled = false,
  className,
}: CheckboxFilterProps<T>) {
  const [internalValue, setInternalValue] = useState<T[]>(defaultValue);
  const selectedValues = value ?? internalValue;

  const updateSelection = (nextValues: T[]) => {
    if (value === undefined) setInternalValue(nextValues);
    onChange?.(nextValues);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4400",
          colorText: "#111111",
          colorBorder: "#e3e5e8",
          borderRadiusLG: 8,
          fontSize: 14,
        },
        components: {
          Collapse: {
            headerBg: "#ffffff",
            contentBg: "#ffffff",
          },
        },
      }}
    >
      <Collapse
        className={className}
        defaultActiveKey={defaultOpen ? ["filter"] : []}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{ display: "block", transform: `rotate(${isActive ? 0 : 180}deg)` }}
          >
            <path
              d="M2 7.5 6 3.5l4 4"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        style={{ width: "100%", background: "#ffffff" }}
        items={[
          {
            key: "filter",
            label: (
              <span style={{ fontSize: 16, lineHeight: "24px", fontWeight: 700 }}>
                {title}
              </span>
            ),
            styles: {
              header: {
                minHeight: 50,
                padding: "13px 20px",
                alignItems: "center",
              },
              body: { padding: 0 },
            },
            children: (
              <div
                style={{
                  maxHeight,
                  padding: "16px 20px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#c9cdd2 transparent",
                }}
              >
                <Checkbox.Group
                  value={selectedValues}
                  disabled={disabled}
                  onChange={(nextValues) => updateSelection(nextValues as T[])}
                  style={{ width: "100%" }}
                >
                  <Flex vertical gap={14}>
                    {options.map((option) => (
                      <Checkbox
                        value={option.value}
                        disabled={option.disabled}
                        key={String(option.value)}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </Flex>
                </Checkbox.Group>
              </div>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
}

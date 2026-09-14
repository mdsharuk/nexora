"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { Card, ConfigProvider, Flex, InputNumber, Slider, Typography } from "antd";

export type PriceRangeValue = [number, number];

export interface PriceRangeProps {
  title?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: PriceRangeValue;
  defaultValue?: PriceRangeValue;
  onChange?: (value: PriceRangeValue) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const formatNumber = (value: number | string | undefined) => {
  if (value === undefined || value === "") return "";
  return Number(value).toLocaleString("en-US");
};

const parseNumber = (value: string | undefined) =>
  Number(value?.replace(/[^0-9.-]/g, "") || 0);

export default function PriceRange({
  title = "Price Range",
  min = 0,
  max = 590000,
  step = 1000,
  value,
  defaultValue,
  onChange,
  className,
  style,
  disabled = false,
}: PriceRangeProps) {
  const [internalValue, setInternalValue] = useState<PriceRangeValue>(
    defaultValue ?? [min, max],
  );
  const currentValue = value ?? internalValue;

  const updateValue = (nextValue: PriceRangeValue) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const updateMinimum = (nextMinimum: number | null) => {
    if (nextMinimum === null) return;
    updateValue([Math.min(Math.max(nextMinimum, min), currentValue[1]), currentValue[1]]);
  };

  const updateMaximum = (nextMaximum: number | null) => {
    if (nextMaximum === null) return;
    updateValue([currentValue[0], Math.max(Math.min(nextMaximum, max), currentValue[0])]);
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#ff4400", colorText: "#111111", borderRadiusLG: 8 },
        components: {
          Slider: {
            handleColor: "#ff4400",
            handleActiveColor: "#e03d00",
            trackBg: "#ff4400",
            trackHoverBg: "#e03d00",
            railBg: "#e7e7e7",
            railHoverBg: "#dddddd",
            railSize: 8,
            handleSize: 20,
            handleSizeHover: 22,
            handleLineWidth: 3,
            handleLineWidthHover: 3,
          },
        },
      }}
    >
      <Card
        className={className}
        title={
          <Typography.Title level={3} style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}>
            {title}
          </Typography.Title>
        }
        style={{ width: "100%", overflow: "hidden", ...style }}
        styles={{
          header: { minHeight: 62, paddingInline: 20, borderBottomColor: "#e7e7e7" },
          body: { padding: "26px 20px 16px" },
        }}
      >
        <Slider
          range
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          tooltip={{ formatter: (price) => (price === undefined ? "" : `${formatNumber(price)}৳`) }}
          onChange={(nextValue) => updateValue(nextValue as PriceRangeValue)}
          styles={{ root: { margin: "6px 10px 24px" } }}
        />

        <Flex align="center" justify="space-between" gap={12}>
          <InputNumber<number>
            aria-label="Minimum price"
            min={min}
            max={currentValue[1]}
            step={step}
            value={currentValue[0]}
            disabled={disabled}
            controls={false}
            formatter={formatNumber}
            parser={parseNumber}
            onChange={updateMinimum}
            style={{ width: 96, textAlign: "center" }}
          />
          <InputNumber<number>
            aria-label="Maximum price"
            min={currentValue[0]}
            max={max}
            step={step}
            value={currentValue[1]}
            disabled={disabled}
            controls={false}
            formatter={formatNumber}
            parser={parseNumber}
            onChange={updateMaximum}
            style={{ width: 96, textAlign: "center" }}
          />
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

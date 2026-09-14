"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Image, Select, Typography } from "antd";
import {
  ShoppingCartOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCompare } from "@/contexts/CompareContext";

const allProducts = [
  {
    id: 1,
    title: "Intel Core i7 14700 14th Gen Gaming Desktop PC",
    imageUrl: "/images/products/desktop-pc.svg",
    productUrl: "/product/intel-core-i7-14700",
    price: 175397,
    oldPrice: 188846,
    brand: "INTEL",
    status: "In Stock",
    productCode: "52367",
    specs: {
      Model: "14th Gen Gaming Desktop PC",
      Brand: "INTEL",
      CPU: "Intel Core i7-14700 14th Gen",
      RAM: "Corsair VENGEANCE RGB 16GB DDR5 6000MHz",
      Motherboard: "MSI PRO B760M-E DDR5 m-ATX",
      "Graphics Card": "Colorful iGame GeForce RTX 3050 Ultra W DUO OC V2-V 8GB GDDR6",
      Storage: "Corsair MP600 PRO LPX 2TB M.2 NVMe SSD + Kingston KC3000 1TB M.2 NVMe SSD",
      Casing: "Valour GC3 V2 ARGB Mid-Tower ATX Casing",
      "Power Supply": "Gamdias ASTROPE P2-650W 80+ Bronze Power Supply",
      "CPU Cooler": "DeepCool AG400 ARGB Tower CPU Air Cooler",
    },
  },
  {
    id: 2,
    title: "Intel Core i5 14400F 14th Gen Gaming Desktop PC",
    imageUrl: "/images/products/desktop-pc.svg",
    productUrl: "/product/intel-core-i5-14400f",
    price: 129363,
    oldPrice: 140554,
    brand: "INTEL",
    status: "In Stock",
    productCode: "52368",
    specs: {
      Model: "14th Gen Gaming Desktop PC",
      Brand: "INTEL",
      CPU: "Intel Core i5-14400F 14th Gen Raptor Lake Processor",
      RAM: "Corsair VENGEANCE RGB 16GB DDR5 6000MHz",
      Motherboard: "MSI PRO B760M-GAMING WIFI DDR5 m-ATX",
      "Graphics Card": "PNY GeForce RTX 4060 Ti VERTO DLSS 3 8GB GDDR6X",
      Storage: "Kingston NV2 1TB M.2 NVMe SSD",
      Casing: "GAMDIAS ATHENA M2 ARGB Micro-ATX Casing",
      "Power Supply": "Gamdias ASTROPE P2-650W 80+ Bronze Power Supply",
      "CPU Cooler": "DeepCool AK400 Digital Tower CPU Air Cooler",
    },
  },
];

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("en-US").format(price)}৳`;

export default function ComparePage() {
  const { products, removeProduct } = useCompare();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const compareProducts = products.length > 0 ? products : allProducts;

  const specKeys =
    compareProducts.length > 0
      ? Object.keys(compareProducts[0].specs || {})
      : [];

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Product Comparison" },
        ]}
      />

      <main style={{ background: "#f1f3f7", minHeight: "60vh" }}>
        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "20px 0 40px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              overflow: "auto",
            }}
          >
            {/* Title + Print/Share */}
            <div
              style={{
                padding: isMobile ? "12px 16px" : "16px 24px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <Typography.Title
                  level={3}
                  style={{ margin: 0, fontSize: isMobile ? 16 : 20, fontWeight: 700 }}
                >
                  Product Comparison
                </Typography.Title>
                <Typography.Text style={{ fontSize: isMobile ? 11 : 13, color: "#6b7280" }}>
                  Find and select products to see the differences and similarities between them
                </Typography.Text>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <Button
                  icon={<PrinterOutlined />}
                  size={isMobile ? "small" : "middle"}
                  style={{
                    fontWeight: 600,
                    borderColor: "#ff4400",
                    color: "#ff4400",
                  }}
                >
                  Print
                </Button>
                <Button
                  type="primary"
                  icon={<ShareAltOutlined />}
                  size={isMobile ? "small" : "middle"}
                  style={{
                    fontWeight: 600,
                    background: "#ff4400",
                    borderColor: "#ff4400",
                  }}
                >
                  Share
                </Button>
              </div>
            </div>

            {/* ============ DESKTOP TABLE ============ */}
            {!isMobile ? (
              <table
                style={{
                  width: "100%",
                  minWidth: compareProducts.length > 2 ? 900 : 600,
                  borderCollapse: "collapse",
                  fontSize: 13,
                  tableLayout: "fixed",
                }}
              >
                <colgroup>
                  <col style={{ width: 200 }} />
                  {compareProducts.map((product) => (
                    <col key={product.id} />
                  ))}
                  {compareProducts.length < 4 && <col />}
                </colgroup>

                {/* Selector Row */}
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        borderBottom: "1px solid #e5e7eb",
                        fontWeight: 500,
                        color: "#6b7280",
                        fontSize: 13,
                        verticalAlign: "middle",
                      }}
                    >
                      You can add Max 4 Products
                    </th>
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #e5e7eb",
                          borderLeft: "1px solid #e5e7eb",
                        }}
                      >
                        <Select
                          placeholder="Search and Select Product"
                          style={{ width: "100%" }}
                          showSearch
                          allowClear
                          value={product.id}
                          size="middle"
                          suffixIcon={<SearchOutlined style={{ color: "#9ca3af" }} />}
                          onChange={(value) => {
                            if (!value) removeProduct(product.id);
                          }}
                        >
                          {allProducts.map((p) => (
                            <Select.Option key={p.id} value={p.id}>
                              {p.title}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                    ))}
                    {compareProducts.length < 4 && (
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #e5e7eb",
                          borderLeft: "1px solid #e5e7eb",
                        }}
                      >
                        <Select
                          placeholder="Search and Select Product"
                          style={{ width: "100%" }}
                          showSearch
                          size="middle"
                          suffixIcon={<SearchOutlined style={{ color: "#9ca3af" }} />}
                          disabled
                        >
                          {allProducts.map((p) => (
                            <Select.Option key={p.id} value={p.id}>
                              {p.title}
                            </Select.Option>
                          ))}
                        </Select>
                      </td>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {/* Product Images + Title + Price */}
                  <tr>
                    <td style={{ padding: 0, borderBottom: "1px solid #e5e7eb" }} />
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        style={{
                          padding: "24px 16px",
                          borderBottom: "1px solid #e5e7eb",
                          borderLeft: "1px solid #e5e7eb",
                          textAlign: "center",
                          verticalAlign: "top",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, aspectRatio: "1 / 1", overflow: "hidden", maxHeight: 160 }}>
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            preview={false}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                        <Link
                          href={product.productUrl}
                          style={{ fontSize: 14, color: "#111111", fontWeight: 600, display: "block", marginBottom: 8, lineHeight: 1.4 }}
                        >
                          {product.title}
                        </Link>
                        <div style={{ fontSize: 18, color: "#ff4400", fontWeight: 700 }}>
                          {formatPrice(product.price)}
                          {product.oldPrice && (
                            <del style={{ color: "#9ca3af", fontSize: 12, fontWeight: 400, marginLeft: 8 }}>
                              {formatPrice(product.oldPrice)}
                            </del>
                          )}
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && (
                      <td
                        style={{
                          padding: "24px 16px",
                          borderBottom: "1px solid #e5e7eb",
                          borderLeft: "1px solid #e5e7eb",
                          textAlign: "center",
                          verticalAlign: "middle",
                          color: "#9ca3af",
                          fontSize: 14,
                        }}
                      >
                        Find and select product to compare
                      </td>
                    )}
                  </tr>

                  {/* Model / Brand / Availability */}
                  {["Model", "Brand", "Availability"].map((label) => (
                    <tr key={label}>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "1px solid #e5e7eb",
                          background: "#f9fafb",
                        }}
                      >
                        {label}
                      </td>
                      {compareProducts.map((product) => (
                        <td
                          key={product.id}
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #e5e7eb",
                            borderLeft: "1px solid #e5e7eb",
                            textAlign: "center",
                          }}
                        >
                          {label === "Model"
                            ? product.specs?.Model || "-"
                            : label === "Brand"
                              ? product.brand || "-"
                              : product.status || "-"}
                        </td>
                      ))}
                      {compareProducts.length < 4 && (
                        <td style={{ borderBottom: "1px solid #e5e7eb", borderLeft: "1px solid #e5e7eb" }} />
                      )}
                    </tr>
                  ))}

                  {/* Basic Information Header */}
                  <tr>
                    <td
                      colSpan={compareProducts.length + 2}
                      style={{ padding: "14px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}
                    >
                      <Typography.Text strong style={{ color: "#ff4400", fontSize: 15 }}>
                        Basic Information
                      </Typography.Text>
                    </td>
                  </tr>

                  {/* Spec Rows */}
                  {specKeys.map((key) => (
                    <tr key={key}>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          color: "#374151",
                          borderBottom: "1px solid #e5e7eb",
                          background: "#f9fafb",
                        }}
                      >
                        {key}
                      </td>
                      {compareProducts.map((product) => (
                        <td
                          key={product.id}
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #e5e7eb",
                            borderLeft: "1px solid #e5e7eb",
                            textAlign: "center",
                            fontSize: 12,
                            lineHeight: 1.5,
                          }}
                        >
                          {(product.specs as Record<string, string>)?.[key] || "-"}
                        </td>
                      ))}
                      {compareProducts.length < 4 && (
                        <td style={{ borderBottom: "1px solid #e5e7eb", borderLeft: "1px solid #e5e7eb" }} />
                      )}
                    </tr>
                  ))}

                  {/* Buy Now */}
                  <tr>
                    <td style={{ padding: "16px", borderBottom: "none" }} />
                    {compareProducts.map((product) => (
                      <td
                        key={product.id}
                        style={{ padding: "16px", borderBottom: "none", borderLeft: "1px solid #e5e7eb", textAlign: "center" }}
                      >
                        <Link href={product.productUrl}>
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            size="large"
                            block
                            style={{ background: "#ff4400", borderColor: "#ff4400", fontWeight: 600, maxWidth: 240, margin: "0 auto" }}
                          >
                            Buy Now
                          </Button>
                        </Link>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td />}
                  </tr>
                </tbody>
              </table>
            ) : (
              /* ============ MOBILE CARD LAYOUT ============ */
              <div style={{ padding: "12px 16px" }}>
                {/* Mobile Selector Row */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                    You can add Max 4 Products
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {compareProducts.map((product) => (
                      <div key={product.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Select
                          placeholder="Search and Select Product"
                          style={{ flex: 1 }}
                          showSearch
                          allowClear
                          value={product.id}
                          size="small"
                          suffixIcon={<SearchOutlined style={{ color: "#9ca3af" }} />}
                          onChange={(value) => {
                            if (!value) removeProduct(product.id);
                          }}
                        >
                          {allProducts.map((p) => (
                            <Select.Option key={p.id} value={p.id}>
                              {p.title}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Product Cards */}
                {compareProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: 16,
                      marginBottom: idx < compareProducts.length - 1 ? 12 : 0,
                    }}
                  >
                    {/* Product Image */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, aspectRatio: "1 / 1", overflow: "hidden", maxHeight: 120 }}>
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        preview={false}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>

                    {/* Product Title */}
                    <Link
                      href={product.productUrl}
                      style={{ fontSize: 14, color: "#111111", fontWeight: 600, display: "block", marginBottom: 8, lineHeight: 1.4, textAlign: "center" }}
                    >
                      {product.title}
                    </Link>

                    {/* Price */}
                    <div style={{ fontSize: 16, color: "#ff4400", fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
                      {formatPrice(product.price)}
                      {product.oldPrice && (
                        <del style={{ color: "#9ca3af", fontSize: 11, fontWeight: 400, marginLeft: 6 }}>
                          {formatPrice(product.oldPrice)}
                        </del>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div style={{ fontSize: 13, color: "#ff4400", fontWeight: 600, marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #e5e7eb" }}>
                      Basic Information
                    </div>
                    {["Model", "Brand", "Availability"].map((label) => (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "6px 0",
                          borderBottom: "1px solid #f3f4f6",
                          fontSize: 12,
                        }}
                      >
                        <span style={{ color: "#6b7280", fontWeight: 500 }}>{label}</span>
                        <span style={{ color: "#111111" }}>
                          {label === "Model"
                            ? product.specs?.Model || "-"
                            : label === "Brand"
                              ? product.brand || "-"
                              : product.status || "-"}
                        </span>
                      </div>
                    ))}

                    {/* Specs */}
                    <div style={{ fontSize: 13, color: "#ff4400", fontWeight: 600, marginTop: 12, marginBottom: 8, paddingBottom: 6, borderBottom: "1px solid #e5e7eb" }}>
                      Specifications
                    </div>
                    {specKeys.map((key) => (
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "6px 0",
                          borderBottom: "1px solid #f3f4f6",
                          fontSize: 12,
                          gap: 8,
                        }}
                      >
                        <span style={{ color: "#6b7280", fontWeight: 500, flexShrink: 0 }}>{key}</span>
                        <span style={{ color: "#111111", textAlign: "right" }}>
                          {(product.specs as Record<string, string>)?.[key] || "-"}
                        </span>
                      </div>
                    ))}

                    {/* Buy Now */}
                    <div style={{ marginTop: 16 }}>
                      <Link href={product.productUrl}>
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          block
                          style={{ background: "#ff4400", borderColor: "#ff4400", fontWeight: 600 }}
                        >
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

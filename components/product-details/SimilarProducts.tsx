"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Image, Typography, message } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import CompareSuccessModal from "@/components/common/CompareSuccessModal";
import { useCompare } from "@/contexts/CompareContext";

export interface SimilarProduct {
  id: string | number;
  title: string;
  imageUrl: string;
  productUrl: string;
  price: number;
  oldPrice?: number;
}

export interface SimilarProductsProps {
  products: SimilarProduct[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  const formatPrice = (p: number) =>
    `${new Intl.NumberFormat("en-US").format(p)}৳`;

  const { addProduct, isInCompare, products: compareProducts, maxProducts } = useCompare();
  const [messageApi, contextHolder] = message.useMessage();
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareProductName, setCompareProductName] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
      }}
    >
      {contextHolder}
      <Typography.Text
        strong
        style={{
          fontSize: 15,
          color: "#ff4400",
          display: "block",
          marginBottom: 16,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Similar Product
      </Typography.Text>

      {products.map((product, i) => (
        <div
          key={product.id}
          style={{
            display: "flex",
            gap: 12,
            padding: "12px 0",
            borderBottom: i < products.length - 1 ? "1px solid #f3f4f6" : "none",
          }}
        >
          <div style={{ flex: "0 0 70px", textAlign: "center", aspectRatio: "1 / 1", overflow: "hidden" }}>
            <Image
              src={product.imageUrl}
              alt={product.title}
              preview={false}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <a
              href={product.productUrl}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.color = "#ff4400"; }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; e.currentTarget.style.color = "#111111"; }}
              style={{
                fontSize: 12,
                color: "#111111",
                display: "block",
                lineHeight: 1.4,
                marginBottom: 4,
                textDecoration: "none",
              }}
            >
              {product.title}
            </a>
            <div style={{ fontSize: 13, color: "#ff4400", fontWeight: 700 }}>
              {formatPrice(product.price)}
              {product.oldPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#9ca3af",
                    fontSize: 11,
                    fontWeight: 400,
                    marginLeft: 6,
                  }}
                >
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <Button
              type="text"
              icon={<PlusSquareOutlined />}
              onClick={() => {
                if (isInCompare(product.id)) {
                  messageApi.info("This product is already in your comparison list.");
                  return;
                }
                const added = addProduct({
                  id: product.id,
                  title: product.title,
                  imageUrl: product.imageUrl,
                  productUrl: product.productUrl,
                  price: product.price,
                  oldPrice: product.oldPrice,
                });
                if (added) {
                  if (compareProducts.length + 1 >= maxProducts) {
                    router.push("/compare");
                  } else {
                    setCompareProductName(product.title);
                    setCompareModalOpen(true);
                  }
                } else {
                  messageApi.warning("You can compare up to 3 products. Remove one first.");
                }
              }}
              style={{
                color: isInCompare(product.id) ? "#ff4400" : "#6b7280",
                fontSize: 11,
                padding: 0,
                marginTop: 4,
              }}
            >
              {isInCompare(product.id) ? "Added" : "Add to Compare"}
            </Button>
          </div>
        </div>
      ))}

      <CompareSuccessModal
        open={compareModalOpen}
        productName={compareProductName}
        onClose={() => setCompareModalOpen(false)}
      />
    </div>
  );
}

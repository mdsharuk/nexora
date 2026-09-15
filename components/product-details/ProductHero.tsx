"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Flex, Image, Modal, Tag, Typography } from "antd";
import {
  CheckCircleFilled,
  CreditCardOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  MinusOutlined,
  PhoneFilled,
  PlusOutlined,
  ShoppingCartOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import EmiPlansModal from "./EmiPlansModal";

export interface ProductHeroProps {
  images: string[];
  title: string;
  price: number;
  oldPrice?: number;
  regularPrice?: number;
  status?: string;
  productCode?: string;
  brand?: string;
  keyFeatures?: string[];
  gift?: { label: string; image?: string };
  sharedData?: {
    image: string;
  };
}

export default function ProductHero({
  images,
  title,
  price,
  oldPrice,
  regularPrice,
  status = "In Stock",
  productCode,
  brand,
  keyFeatures = [],
  gift,
  sharedData,
}: ProductHeroProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [buyNowOpen, setBuyNowOpen] = useState(false);

  const formatPrice = (p: number) =>
    `${new Intl.NumberFormat("en-US").format(p)}৳`;

  const emiPrice = regularPrice || price;
  const monthlyEmi = Math.round(emiPrice / 12);

  const showPaymentMethods = () => {
    router.push("/payment-terms");
  };

  const shareProduct = (platform: "facebook" | "whatsapp") => {
    const pageUrl = window.location.href;
    const shareUrl =
      platform === "facebook"
        ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
        : `https://wa.me/?text=${encodeURIComponent(`${title} - ${pageUrl}`)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const copyProductLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
  };

  const orderQuery = new URLSearchParams({
    title,
    price: String(price),
    quantity: String(quantity),
    image: images[selectedImage] ?? "",
    model:
      keyFeatures
        .find((feature) => /^Model:/i.test(feature))
        ?.replace(/^Model:\s*/i, "") ?? title,
    productUrl: pathname,
  }).toString();

  return (
    <Flex gap={24} wrap="wrap">
      <div style={{ flex: "0 1 42%", minWidth: 0 }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            padding: 16,
            marginBottom: 12,
            aspectRatio: "4 / 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={images[selectedImage]}
            alt={title}
            preview={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <Flex gap={8} wrap="wrap">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(i)}
              style={{
                width: 64,
                height: 64,
                border:
                  selectedImage === i
                    ? "2px solid #ff4400"
                    : "1px solid #e5e7eb",
                borderRadius: 6,
                padding: 4,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#ffffff",
                aspectRatio: "1 / 1",
                overflow: "hidden",
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${i + 1}`}
                preview={false}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ))}
        </Flex>
      </div>

      <div style={{ flex: "1 1 500px", minWidth: 0 }}>
        <Typography.Title
          level={3}
          style={{
            margin: "0 0 12px",
            color: "#ff4400",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography.Title>

        <Flex wrap gap={8} style={{ marginBottom: 16 }}>
          {price && (
            <Tag style={{ margin: 0, fontSize: 12, padding: "2px 8px" }}>
              Price:{" "}
              <strong style={{ color: "#ff4400" }}>{formatPrice(price)}</strong>
              {oldPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#999",
                    marginLeft: 4,
                  }}
                >
                  {formatPrice(oldPrice)}
                </span>
              )}
            </Tag>
          )}
          {regularPrice && (
            <Tag style={{ margin: 0, fontSize: 12, padding: "2px 8px" }}>
              Regular Price: <strong>{formatPrice(regularPrice)}</strong>
            </Tag>
          )}
          {status && (
            <Tag color="green" style={{ margin: 0, fontSize: 12 }}>
              Status: <strong>{status}</strong>
            </Tag>
          )}
          {productCode && (
            <Tag style={{ margin: 0, fontSize: 12, padding: "2px 8px" }}>
              Product Code: <strong>{productCode}</strong>
            </Tag>
          )}
          {brand && (
            <Tag style={{ margin: 0, fontSize: 12, padding: "2px 8px" }}>
              Brand: <strong>{brand}</strong>
            </Tag>
          )}
        </Flex>

        {keyFeatures.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <Typography.Text
              strong
              style={{ fontSize: 14, display: "block", marginBottom: 8 }}
            >
              Key Features
            </Typography.Text>
            {keyFeatures.map((f, i) => (
              <div
                key={i}
                style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.8 }}
              >
                {f}
              </div>
            ))}
          </div>
        )}

        <div className="product-gift-contacts">
          <div className="product-purchase__contacts">
            <a href="tel:+8801812345678" className="product-contact-link">
              <PhoneFilled />
              <span>Hotline</span>
              <strong>+880 1812345678</strong>
            </a>
            <a
              href="mailto:sales@nexoratech.com"
              className="product-contact-link"
            >
              <MailOutlined />
              <strong>sales@nexoratech.com</strong>
            </a>
          </div>
          {gift && (
            <div
              style={{
                background: "linear-gradient(135deg, #ff4400, #ff6600)",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: 18 }}>🎁</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Free Gift</div>
                <div style={{ fontSize: 12 }}>{gift.label}</div>
              </div>
            </div>
          )}
        </div>

        <section className="product-purchase" aria-label="Purchase options">
          <div className="product-purchase__price-grid">
            <div className="product-price-card">
              <Typography.Text className="product-price-card__label">
                Discount Price
              </Typography.Text>
              <div className="product-price-card__price">
                <strong>{formatPrice(price)}</strong>
                {oldPrice && <del>{formatPrice(oldPrice)}</del>}
              </div>
              <Button
                type="link"
                size="small"
                icon={<CreditCardOutlined />}
                onClick={showPaymentMethods}
                className="product-payment-link"
              >
                Available Payment Method
              </Button>
            </div>

            <div className="product-price-card">
              <Typography.Text className="product-price-card__label">
                EMI Start From*
              </Typography.Text>
              <div className="product-price-card__price">
                <strong>{formatPrice(monthlyEmi)}</strong>
                <span className="product-price-card__period">/month</span>
              </div>
              <EmiPlansModal price={emiPrice} />
            </div>
          </div>

          <div
            className="product-purchase__actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "nowrap",
              width: "100%",
            }}
          >
            <div className="product-quantity" aria-label="Product quantity">
              <Button
                type="text"
                aria-label="Decrease quantity"
                icon={<MinusOutlined />}
                disabled={quantity === 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              />
              <output aria-live="polite" aria-label={`Quantity: ${quantity}`}>
                {quantity}
              </output>
              <Button
                type="text"
                aria-label="Increase quantity"
                icon={<PlusOutlined />}
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>

            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={() => router.push(`/cart?${orderQuery}`)}
              style={{ flex: 1, minWidth: 0 }}
            >
              Add to Cart
            </Button>

            <Button
              type="primary"
              size="large"
              onClick={() => setBuyNowOpen(true)}
              style={{
                background: "#ff4400",
                borderColor: "#ff4400",
                fontWeight: 600,
                flex: 1,
                minWidth: 0,
              }}
            >
              Buy Now
            </Button>

            <Button
              size="large"
              icon={wishlisted ? <HeartFilled /> : <HeartOutlined />}
              aria-pressed={wishlisted}
              onClick={() => setWishlisted((current) => !current)}
              style={{
                color: wishlisted ? "#ff4400" : undefined,
                flexShrink: 0,
              }}
            />

            <Button
              size="large"
              icon={<SwapOutlined />}
              style={{ flexShrink: 0 }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#6b7280",
                fontWeight: 600,
                marginRight: 8,
              }}
            >
              Share:
            </span>
            <button
              type="button"
              aria-label="Share on Facebook"
              onClick={() => shareProduct("facebook")}
              style={{
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#0866FF"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Share on WhatsApp"
              onClick={() => shareProduct("whatsapp")}
              style={{
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#25D366"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Copy product link"
              onClick={copyProductLink}
              style={{
                display: "flex",
                alignItems: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
          </div>

          <Modal
            open={buyNowOpen}
            onCancel={() => setBuyNowOpen(false)}
            footer={null}
            centered
            width={960}
            style={{ maxWidth: "calc(100vw - 32px)" }}
            title={null}
          >
            <div style={{ padding: "20px 4px 4px" }}>
              <Flex align="center" gap={12} justify="space-between" wrap="wrap">
                <Flex align="center" gap={12} style={{ flex: "1 1 280px" }}>
                  <CheckCircleFilled
                    style={{ color: "#10b981", fontSize: 18 }}
                  />
                  <Typography.Text>
                    You have added{" "}
                    <span style={{ color: "#ff4400" }}>{title}</span> to your
                    shopping cart!
                  </Typography.Text>
                </Flex>
                <div className="buy-now-summary">
                  <span>
                    Cart quantity: <strong>{quantity}</strong>
                  </span>
                  <span>
                    Cart Total: <strong>{formatPrice(price * quantity)}</strong>
                  </span>
                </div>
              </Flex>

              <Flex gap={8} style={{ marginTop: 28 }} wrap="wrap">
                <Button onClick={() => router.push(`/cart?${orderQuery}`)}>
                  View Cart
                </Button>
                <Button
                  type="primary"
                  onClick={() => router.push(`/checkout?${orderQuery}`)}
                >
                  Confirm Order
                </Button>
              </Flex>
            </div>
          </Modal>
        </section>
      </div>
    </Flex>
  );
}

"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Button, ConfigProvider, Empty, Image, Input, Typography } from "antd";
import { CloseOutlined, GiftOutlined, MinusOutlined, PlusOutlined, TagsOutlined } from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const formatPrice = (value: number) => new Intl.NumberFormat("en-US").format(value) + "৳";

function DiscountForm({ voucher = false }: { voucher?: boolean }) {
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const name = voucher ? "Voucher" : "Coupon";

  return (
    <form className="cart-discount" onSubmit={(event) => {
      event.preventDefault();
      setFeedback(code.trim() ? name + " redemption is currently unavailable." : "Please enter a " + name.toLowerCase() + " code.");
    }}>
      <h3>{voucher ? <GiftOutlined /> : <TagsOutlined />}{voucher ? "Have any Gift Voucher?" : "Have a Coupon?"}</h3>
      <p>{voucher ? "Apply your voucher for extra discount!" : "Apply your coupon for an instant discount!"}</p>
      <div className="cart-discount__input">
        <Input aria-label={name + " code"} placeholder={voucher ? "Voucher Code" : "PROMO / COUPON Code"} value={code} onChange={(event) => { setCode(event.target.value); setFeedback(""); }} />
        <Button htmlType="submit">Apply {name}</Button>
      </div>
      {feedback && <p role="status">{feedback}</p>}
    </form>
  );
}

function CartContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [notice, setNotice] = useState("");
  const title = params.get("title") || "";
  const rawPrice = Number(params.get("price"));
  const price = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 0;
  const rawQuantity = Number(params.get("quantity"));
  const quantity = Number.isSafeInteger(rawQuantity) && rawQuantity > 0 ? rawQuantity : 1;
  const hasProduct = Boolean(title && price);
  const total = hasProduct ? price * quantity : 0;
  const model = params.get("model");
  const productUrl = params.get("productUrl");
  const safeProductUrl = productUrl?.startsWith("/product/") ? productUrl : undefined;

  const updateQuantity = (value: number) => {
    if (!Number.isSafeInteger(value) || value < 1) return;
    const next = new URLSearchParams(params.toString());
    next.set("quantity", String(value));
    router.replace("/cart?" + next, { scroll: false });
    setNotice("Success: You have modified your shopping cart!");
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#ff4400", colorPrimaryHover: "#e63d00", colorPrimaryActive: "#cc3600" } }}>
      <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} />
      <main className="checkout-page cart-page">
        <div className="checkout-page__content">
          {notice && <Alert className="cart-notice" type="success" showIcon closable title={notice} afterClose={() => setNotice("")} />}
          <Typography.Title level={3}>Shopping Cart</Typography.Title>
          <div className="cart-layout">
            <div className="cart-layout__products">
              <section className="checkout-card">
                <Typography.Title level={5}>Your Products</Typography.Title>
                {hasProduct ? (
                  <div className="cart-product">
                    <Image className="cart-product__image" src={params.get("image") || "/images/products/desktop-pc.svg"} fallback="/images/products/desktop-pc.svg" alt={title} width={72} height={80} preview={false} />
                    <div className="cart-product__details">
                      {safeProductUrl ? <Link href={safeProductUrl}>{title}</Link> : <span>{title}</span>}
                      {model && <p>Model: <strong>{model}</strong></p>}
                    </div>
                    <div className="product-quantity" aria-label="Product quantity">
                      <Button type="text" aria-label="Decrease quantity" icon={<MinusOutlined />} disabled={quantity <= 1} onClick={() => updateQuantity(quantity - 1)} />
                      <output aria-live="polite">{quantity}</output>
                      <Button type="text" aria-label="Increase quantity" icon={<PlusOutlined />} onClick={() => updateQuantity(quantity + 1)} />
                    </div>
                    <div className="cart-product__price"><strong>{formatPrice(total)}</strong><small>{formatPrice(price)}/unit</small></div>
                    <Button type="text" aria-label={"Remove " + title + " from cart"} icon={<CloseOutlined />} onClick={() => { router.replace("/cart", { scroll: false }); setNotice("The product has been removed from your cart."); }} />
                  </div>
                ) : <Empty description="Your shopping cart is empty" />}
              </section>
              {hasProduct && <section className="checkout-card cart-discounts" aria-label="Discount codes"><DiscountForm /><span className="cart-discounts__or">or,</span><DiscountForm voucher /></section>}
            </div>
            <aside className="checkout-card checkout-summary cart-summary">
              <Typography.Title level={5}>Order Summary</Typography.Title>
              <div className="checkout-summary__row"><span>Sub-Total:</span><strong>{formatPrice(total)}</strong></div>
              <div className="checkout-summary__row checkout-summary__total"><strong>Total:</strong><strong>{formatPrice(total)}</strong></div>
              <div className="cart-summary__actions">
                <Link href="/"><Button icon={<PlusOutlined />} block>Add More</Button></Link>
                <Button type="primary" disabled={!hasProduct} onClick={() => router.push("/checkout?" + params.toString())}>Checkout</Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </ConfigProvider>
  );
}

export default function CartPage() {
  return <Suspense fallback={<main className="checkout-page" />}><CartContent /></Suspense>;
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, ConfigProvider, Typography } from "antd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function CartPage() {
  const params = useSearchParams();
  const title = params.get("title") || "Your product";
  const price = Number(params.get("price")) || 0;
  const quantity = Math.max(1, Number(params.get("quantity")) || 1);
  const total = price * quantity;
  const formatPrice = (value: number) => `${new Intl.NumberFormat("en-US").format(value)}৳`;

  return <ConfigProvider theme={{ token: { colorPrimary: "#ff4400", colorPrimaryHover: "#e63d00", colorPrimaryActive: "#cc3600" } }}><Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} /><main className="checkout-page"><div className="checkout-page__content"><Typography.Title level={3}>Shopping Cart</Typography.Title><div className="checkout-page__grid"><section className="checkout-card"><Typography.Title level={5}>Your Products</Typography.Title><div className="checkout-summary__row"><span>{title} × {quantity}</span><strong>{formatPrice(total)}</strong></div></section><aside className="checkout-card checkout-summary"><Typography.Title level={5}>Order Summary</Typography.Title><div className="checkout-summary__row checkout-summary__total"><span>Total</span><strong>{formatPrice(total)}</strong></div><Link href={`/checkout?${params.toString()}`}><Button type="primary" block size="large">Checkout</Button></Link></aside></div></div></main><Footer /></ConfigProvider>;
}

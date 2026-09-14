"use client";

import { useSearchParams } from "next/navigation";
import { Button, Checkbox, ConfigProvider, Flex, Input, Radio, Typography } from "antd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const formatPrice = (value: number) =>
  `${new Intl.NumberFormat("en-US").format(value)}৳`;

export default function CheckoutPage() {
  const params = useSearchParams();
  const title = params.get("title") || "Your product";
  const price = Number(params.get("price")) || 0;
  const quantity = Math.max(1, Number(params.get("quantity")) || 1);
  const total = price * quantity;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4400",
          colorPrimaryHover: "#e63d00",
          colorPrimaryActive: "#cc3600",
          colorInfo: "#ff4400",
        },
      }}
    >
      <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shopping Cart", href: "/cart" }, { label: "Checkout" }]} />
      <main className="checkout-page">
        <div className="checkout-page__content">
          <Typography.Title level={3}>Checkout</Typography.Title>
          <div className="checkout-page__notice">Please complete your delivery and payment details to confirm the order.</div>
          <div className="checkout-page__grid">
            <section className="checkout-card">
              <Typography.Title level={5}>Shipping &amp; Billing</Typography.Title>
              <div className="checkout-form-grid">
                <Input placeholder="First Name*" />
                <Input placeholder="Last Name*" />
                <Input className="checkout-span-full" placeholder="Address*" />
                <Input placeholder="Upazila / Thana*" />
                <Input placeholder="District" />
                <Input placeholder="Telephone*" />
                <Input placeholder="E-Mail*" />
                <Input.TextArea className="checkout-span-full" placeholder="Any special requirement / instruction for us?" rows={4} />
              </div>
            </section>
            <aside className="checkout-card checkout-summary">
              <Typography.Title level={5}>Order Summary</Typography.Title>
              <div className="checkout-summary__row"><span>Product</span><strong>{title}</strong></div>
              <div className="checkout-summary__row"><span>Quantity</span><strong>{quantity}</strong></div>
              <div className="checkout-summary__row"><span>Sub-total</span><strong>{formatPrice(total)}</strong></div>
              <div className="checkout-summary__row checkout-summary__total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <Checkbox>I have read and agree to the Terms and Conditions.</Checkbox>
              <Button type="primary" block size="large" style={{ marginTop: 16 }}>Confirm Order</Button>
            </aside>
          </div>
          <div className="checkout-page__grid checkout-page__options">
            <section className="checkout-card"><Typography.Title level={5}>Payment Method</Typography.Title><Radio.Group defaultValue="cash"><Flex vertical gap={8}><Radio value="cash">Cash on Delivery</Radio><Radio value="online">Online Payment</Radio><Radio value="pos">POS on Delivery</Radio></Flex></Radio.Group></section>
            <section className="checkout-card"><Typography.Title level={5}>Delivery Method</Typography.Title><Radio.Group defaultValue="home"><Flex vertical gap={8}><Radio value="home">Home Delivery</Radio><Radio value="store">Store Pickup</Radio></Flex></Radio.Group></section>
          </div>
        </div>
      </main>
      <Footer />
    </ConfigProvider>
  );
}

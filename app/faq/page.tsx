"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqs = [
  [
    "How do I place an order?",
    "Choose your preferred product, select Buy Now or Add to Cart, then complete your delivery and payment details at checkout. Our team will confirm your order before delivery.",
  ],
  [
    "What payment methods do you accept?",
    "We offer Cash on Delivery and selected online payment options. Available payment methods are shown during checkout and may vary by order.",
  ],
  [
    "How can I track my order?",
    "You can visit the Track Order page or contact our support team with your order number and the phone number used during checkout.",
  ],
  [
    "What is your delivery time?",
    "Delivery time depends on product availability and your location. Your expected delivery schedule will be confirmed when your order is processed.",
  ],
  [
    "How do I request a return or refund?",
    "Please contact us promptly with your order number and details of the issue. Our support team will guide you through the applicable return or refund process.",
  ],
  [
    "Are your products genuine?",
    "We are committed to offering genuine technology products with the applicable seller or manufacturer warranty information.",
  ],
  [
    "How do I claim warranty support?",
    "Keep your invoice and contact our support team with your order details and a description of the problem. We will help you with the next steps.",
  ],
];

export default function FaqPage() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Header breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <main className="faq-page">
        <section className="faq-panel">
          <span className="faq-panel__brand">Nexora Tech Support</span>
          <h1>Frequently Asked Questions</h1>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => {
              const isOpen = open === index;
              return (
                <article
                  className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                  key={question}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{question}</span>
                    <b>{isOpen ? "×" : "+"}</b>
                  </button>
                  {isOpen && <p>{answer}</p>}
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

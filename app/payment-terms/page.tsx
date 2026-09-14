import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const paymentSections = [
  {
    title: "Available Payment Methods",
    text: "Choose from the payment options shown at checkout. Available methods can vary by product, order value, and delivery location.",
    items: ["Cash on Delivery for eligible orders", "Online card payment", "Mobile financial services", "Bank transfer for approved orders"],
  },
  {
    title: "Cash on Delivery (COD)",
    text: "Cash on Delivery is available for eligible delivery areas. Our team will confirm availability and the final payable amount before dispatching your order.",
  },
  {
    title: "Card Payment",
    text: "Secure online card payment is available through the options displayed at checkout. Your bank or card provider may apply its own processing charge.",
  },
  {
    title: "Mobile Banking",
    text: "Supported mobile banking services are listed during checkout. Please use the payment reference provided with your order so we can confirm it quickly.",
  },
  {
    title: "Bank Transfer",
    text: "For bank-transfer orders, contact our support team before making a payment. Delivery will be arranged after the payment has been verified.",
  },
];

export default function PaymentTermsPage() {
  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Payment Terms" },
        ]}
      />
      <main className="payment-terms-page">
        <article className="payment-terms-card">
          <header className="payment-terms__header">
            <div>
              <span className="payment-terms__eyebrow">Nexora Tech</span>
              <h1>Payment Terms</h1>
              <p>Learn about the payment methods available for your order.</p>
            </div>
            <span className="payment-terms__updated">Last updated: September 2026</span>
          </header>

          <div className="payment-terms__content">
            {paymentSections.map((section) => (
              <section className="payment-terms__section" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

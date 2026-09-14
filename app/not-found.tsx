import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "80px", fontWeight: 800, color: "#FF4400", marginBottom: "8px", lineHeight: 1 }}>
            404
          </h1>
          <p style={{ fontSize: "22px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
            Page Not Found
          </p>
          <p style={{ fontSize: "15px", color: "#666", marginBottom: "32px" }}>
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#FF4400",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "15px",
              transition: "background 0.2s",
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

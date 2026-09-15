import type { Metadata, Viewport } from "next";
import "@/styles/globals.scss";
import ClientProviders from "@/components/common/ClientProviders";
import JsonLd from "@/components/common/JsonLd";
import { siteSchema } from "@/modules/structuredData";
import { siteUrl } from "@/config/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nexora Tech - Technology for What's Next",
  description:
    "Your one-stop shop for computers, laptops, components, gadgets, and more. Best deals on top tech brands.",
  keywords: [
    "Nexora Tech",
    "computers",
    "laptops",
    "gadgets",
    "technology",
    "shop",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <JsonLd id="site-jsonld" data={siteSchema()} />
        <ClientProviders>
          <div className="app-shell">{children}</div>
        </ClientProviders>
      </body>
    </html>
  );
}

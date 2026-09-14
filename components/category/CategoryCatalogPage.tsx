"use client";

import { useMemo, useState } from "react";
import { Button, Drawer, Flex, Grid, Space, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryIntro from "@/components/common/CategoryIntro";
import PriceRange, {
  type PriceRangeValue,
} from "@/components/common/PriceRange";
import CheckboxFilter from "@/components/common/CheckboxFilter";
import ProductCatalog, {
  type CatalogProduct,
} from "@/components/ProductCatalog";

interface CategoryCatalogPageProps {
  slug: string;
}

interface CategoryProduct extends CatalogProduct {
  availability: string;
  type: string;
  technology: string;
}

const categoryNames: Record<string, string> = {
  ac: "AC",
  "portable-power-station": "Portable Power Station",
  "air-fryer": "Air Fryer",
  gimbal: "Gimbal",
  "tablet-pc": "Tablet PC",
  tv: "TV",
  fridge: "Fridge",
  "mobile-phone": "Mobile Phone",
  "mobile-accessories": "Mobile Accessories",
  "health-monitor": "Health Monitor",
  "wifi-camera": "WiFi Camera",
  trimmer: "Trimmer",
  earbuds: "Earbuds",
  "torch-light": "Torch Light",
  desktop: "Desktop",
  laptop: "Laptop",
  component: "Component",
  monitor: "Monitor",
  power: "Power",
  phone: "Phone",
  tablet: "Tablet",
  camera: "Camera",
  security: "Security",
  networking: "Networking",
  software: "Software",
  accessories: "Accessories",
  gadget: "Gadget",
  gaming: "Gaming",
  appliance: "Appliance",
  "gaming-pc": "Gaming PC",
  "business-pc": "Business PC",
  "brand-pc": "Brand PC",
  "all-in-one": "All-in-One PC",
  "mini-pc": "Mini PC",
  ultrabook: "Ultrabook",
  macbook: "MacBook",
  bag: "Laptop Bag",
  lenovo: "Lenovo",
  asus: "ASUS",
  hp: "HP",
  acer: "Acer",
  msi: "MSI",
  dell: "Dell",
  apple: "Apple",
  "intel-i3": "Intel Core i3",
  "intel-i5": "Intel Core i5",
  "intel-i7": "Intel Core i7",
  "intel-i9": "Intel Core i9",
  "amd-ryzen-5": "AMD Ryzen 5",
  "amd-ryzen-7": "AMD Ryzen 7",
  processor: "Processor",
  "cpu-cooler": "CPU Cooler",
  motherboard: "Motherboard",
  "ram-desktop": "RAM (Desktop)",
  "ram-laptop": "RAM (Laptop)",
  "graphics-card": "Graphics Card",
  ssd: "SSD",
  "hard-disk": "Hard Disk",
  "power-supply": "Power Supply",
  casing: "Casing",
  "casing-cooler": "Casing Cooler",
  intel: "Intel",
  amd: "AMD",
  gigabyte: "Gigabyte",
  corsair: "Corsair",
  professional: "Professional",
  curved: "Curved",
  portable: "Portable",
  samsung: "Samsung",
  lg: "LG",
  ups: "UPS",
  "power-strip": "Power Strip",
  "surge-protector": "Surge Protector",
  avr: "AVR",
  smartphone: "Smartphone",
  "feature-phone": "Feature Phone",
  charger: "Charger",
  "power-bank": "Power Bank",
  ipad: "iPad",
  windows: "Windows",
  printer: "Printer",
  scanner: "Scanner",
  projector: "Projector",
  "ink-toner": "Ink & Toner",
  "paper-shredder": "Paper Shredder",
  dslr: "DSLR",
  mirrorless: "Mirrorless",
  action: "Action",
  webcam: "Webcam",
  cctv: "CCTV Camera",
  "dvr-nvr": "DVR/NVR",
  biometric: "Biometric",
  "access-control": "Access Control",
  router: "Router",
  switch: "Switch",
  "access-point": "Access Point",
  cable: "Network Cable",
  adapter: "Network Adapter",
  os: "Operating System",
  antivirus: "Antivirus",
  nas: "NAS Storage",
  hdd: "HDD",
  "tape-drive": "Tape Drive",
  keyboard: "Keyboard",
  mouse: "Mouse",
  "mouse-pad": "Mouse Pad",
  combo: "Keyboard & Mouse Combo",
  headphone: "Headphone",
  speaker: "Speaker",
  microphone: "Microphone",
  "sound-card": "Sound Card",
  "flash-drive": "USB Flash Drive",
  "card-reader": "Card Reader",
  "hdmi-cable": "HDMI Cable",
  "usb-hub": "USB Hub",
  "smart-watch": "Smart Watch",
  "smart-band": "Smart Band",
  drone: "Drone",
  console: "Gaming Console",
  chair: "Gaming Chair",
  desk: "Gaming Desk",
  headset: "Gaming Headset",
  gamepad: "Gamepad",
  smart: "Smart TV",
  "android-tv": "Android TV",
  led: "LED TV",
  refrigerator: "Refrigerator",
  "washing-machine": "Washing Machine",
  fan: "Fan",
};

const productImages = [
  "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3-15abr8/ideapad-slim-3-15abr8-arctic-grey-01-228x228.webp",
  "/images/products/monitor.svg",
  "/images/products/desktop-pc.svg",
  "/images/products/laptop.svg",
  "/images/products/phone.svg",
];

const acProducts = [
  { name: "Midea 1 Ton Portable AC", capacity: "12,000 BTU/Hr", airflow: "360-425 m3/Hr", features: "3-in-1 Comfort, Ultra-Quiet Operation, Light and Mobile" },
  { name: "Gree 1.5 Ton Inverter AC", capacity: "18,000 BTU/Hr", airflow: "520-680 m3/Hr", features: "Wi-Fi Control, Gold Fin Anti-Corrosion, Low Noise" },
  { name: "General 2 Ton Split AC", capacity: "24,000 BTU/Hr", airflow: "750-900 m3/Hr", features: "Auto Restart, Timer Function, Dry Mode" },
  { name: "Samsung Wind-Free AC", capacity: "18,000 BTU/Hr", airflow: "350-500 m3/Hr", features: "23,000 Micro Holes, AI Auto Comfort, Fast Cool" },
  { name: "LG Dual Inverter AC", capacity: "12,000 BTU/Hr", airflow: "400-550 m3/Hr", features: "Dual Rotors, 4-Way Swing, Ocean Black Fin" },
  { name: "Panasonic Nanoe-X AC", capacity: "15,000 BTU/Hr", airflow: "450-600 m3/Hr", features: "Nanoe-X Air Purification, Whisper Quiet, Eco Mode" },
  { name: "Daikin FTKF Series AC", capacity: "18,000 BTU/Hr", airflow: "500-700 m3/Hr", features: "Coanda Airflow, Power Chill Operation, 3D Airflow" },
  { name: "Sharp J-Tech Inverter AC", capacity: "12,000 BTU/Hr", airflow: "380-520 m3/Hr", features: "Plasmacluster Ion, J-Tech Inverter, Eco Mode" },
  { name: "Haier Tri-Inverter AC", capacity: "24,000 BTU/Hr", airflow: "650-850 m3/Hr", features: "Triple Inverter Plus, Self Clean, Wi-Fi Ready" },
  { name: "Carrier X Power Series AC", capacity: "15,000 BTU/Hr", airflow: "420-580 m3/Hr", features: "Hydrophilic Blue Fin, Sleep Mode, Dehumidifier" },
  { name: "Toshiba RAS Series AC", capacity: "18,000 BTU/Hr", airflow: "480-660 m3/Hr", features: "DC Hybrid Inverter, Powerful Mode, Quiet Design" },
  { name: "Midea MS Series Split AC", capacity: "12,000 BTU/Hr", airflow: "350-480 m3/Hr", features: "Cold Cathode Lighting, LED Display, 24hr Timer" },
];

const titleFromSlug = (slug: string) => {
  const parts = slug.split("/").filter(Boolean);
  if (parts.length === 1) {
    const name = categoryNames[parts[0]];
    if (name) return name;
  }
  return parts
    .map((part) => categoryNames[part] ?? part
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "))
    .join(" ");
};

const createProducts = (categoryName: string): CategoryProduct[] =>
  Array.from({ length: 24 }, (_, index) => {
    const number = index + 1;
    const product = acProducts[index % acProducts.length];
    const price = 38000 + index * 1750;
    const discounted = index % 3 === 0;

    return {
      id: number,
      title: product.name,
      imageUrl: productImages[index % productImages.length],
      productUrl: `/product/${categoryName.toLowerCase().replaceAll(" ", "-")}-${number}`,
      price,
      oldPrice: discounted ? price + 3500 : undefined,
      badges: discounted
        ? [`Save: 3,500৳`]
        : index % 4 === 0
          ? ["Earn Point: 450"]
          : undefined,
      specifications: [
        `Cooling Capacity: ${product.capacity}`,
        `Air Flow Volume: ${product.airflow}`,
        `Refrigerant: R-410A (CFC Free, 0.43 Kg)`,
        product.features,
      ],
      availability:
        index % 7 === 0
          ? "pre-order"
          : index % 11 === 0
            ? "upcoming"
            : "in-stock",
      type: index % 2 === 0 ? "inverter" : "standard",
      technology: index % 3 === 0 ? "smart" : "energy-saving",
    };
  });

export default function CategoryCatalogPage({
  slug,
}: CategoryCatalogPageProps) {
  const screens = Grid.useBreakpoint();
  const categoryName = titleFromSlug(slug);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRangeValue>([0, 590000]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);

  const products = useMemo(() => createProducts(categoryName), [categoryName]);
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.price >= priceRange[0] &&
          product.price <= priceRange[1] &&
          (!availability.length ||
            availability.includes(product.availability)) &&
          (!types.length || types.includes(product.type)) &&
          (!technologies.length || technologies.includes(product.technology)),
      ),
    [availability, priceRange, products, technologies, types],
  );

  const filters = (
    <Space direction="vertical" size={8} style={{ width: "100%" }}>
      <PriceRange
        min={0}
        max={590000}
        step={1000}
        value={priceRange}
        onChange={setPriceRange}
      />
      <CheckboxFilter
        title="Availability"
        value={availability}
        onChange={setAvailability}
        options={[
          { label: "In Stock", value: "in-stock" },
          { label: "Pre Order", value: "pre-order" },
          { label: "Up Coming", value: "upcoming" },
        ]}
      />
      <CheckboxFilter
        title="Type"
        value={types}
        onChange={setTypes}
        options={[
          { label: "Inverter", value: "inverter" },
          { label: "Standard", value: "standard" },
        ]}
      />
      <CheckboxFilter
        title="Technology"
        value={technologies}
        onChange={setTechnologies}
        options={[
          { label: "Smart", value: "smart" },
          { label: "Energy Saving", value: "energy-saving" },
        ]}
      />
    </Space>
  );

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Featured Category", href: "/#featured-categories-title" },
          { label: categoryName },
        ]}
      />

      <main style={{ background: "#f1f3f7" }}>
        <CategoryIntro
          title={`${categoryName} Price in Bangladesh 2026`}
          description={`Find the latest ${categoryName} products in Bangladesh at competitive prices. Compare specifications, availability, and offers before placing your order.`}
          options={[
            "Popular",
            "Latest",
            "In Stock",
            "Best Deals",
            "Official Warranty",
          ].map((label, index) => ({
            label,
            href: `/category/${slug}${index ? `?view=${label.toLowerCase().replaceAll(" ", "-")}` : ""}`,
          }))}
        />

        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: 1320,
            margin: "0 auto",
            padding: "16px 0 32px",
          }}
        >
          {!screens.lg ? (
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={() => setFilterOpen(true)}
              style={{
                marginBottom: 12,
                fontWeight: 600,
                background: "#ff4400",
                borderColor: "#ff4400",
                height: 36,
              }}
            >
              Filters
            </Button>
          ) : null}

          <Flex align="flex-start" gap={12}>
            {screens.lg ? (
              <aside style={{ flex: "0 0 260px", minWidth: 0 }}>
                {filters}
              </aside>
            ) : null}

            <section
              style={{ flex: 1, minWidth: 0 }}
              aria-label={`${categoryName} products`}
            >
              <ProductCatalog
                title={`All ${categoryName}`}
                products={filteredProducts}
                initialPageSize={24}
                pageSizeOptions={[24, 48]}
                desktopColumns={4}
                paginationMode="append"
              />

              <article
                style={{
                  marginTop: 14,
                  padding: screens.md ? 24 : 16,
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                }}
              >
                <Typography.Title
                  level={2}
                  style={{ color: "#304ac4", fontSize: 20 }}
                >
                  Best {categoryName} Available in Bangladesh
                </Typography.Title>
                <Typography.Paragraph style={{ fontSize: 13, lineHeight: 1.7 }}>
                  Shop dependable {categoryName} products selected for
                  performance, value, and official warranty coverage. Use the
                  filters to narrow the list by price, availability, type, and
                  technology.
                </Typography.Paragraph>
                <Typography.Title
                  level={3}
                  style={{ color: "#304ac4", fontSize: 16 }}
                >
                  How to choose the right {categoryName}
                </Typography.Title>
                <Typography.Paragraph
                  style={{ marginBottom: 0, fontSize: 13, lineHeight: 1.7 }}
                >
                  Compare the important specifications, warranty terms, energy
                  usage, and after-sales support. Choose a model that matches
                  your daily needs and budget instead of selecting on price
                  alone.
                </Typography.Paragraph>
              </article>
            </section>
          </Flex>
        </div>
      </main>

      <Drawer
        title={
          <span style={{ fontWeight: 700, fontSize: 16 }}>Filter Products</span>
        }
        placement="left"
        width={screens.xs ? "85vw" : 320}
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        styles={{
          body: { padding: 12, background: "#f1f3f6", overflowY: "auto" },
          header: { borderBottom: "1px solid #e5e7eb", padding: "12px 16px" },
        }}
        extra={
          <Button
            type="primary"
            block
            onClick={() => setFilterOpen(false)}
            style={{
              fontWeight: 600,
              background: "#ff4400",
              borderColor: "#ff4400",
            }}
          >
            Apply Filters
          </Button>
        }
      >
        {filters}
      </Drawer>

      <Footer />
    </>
  );
}

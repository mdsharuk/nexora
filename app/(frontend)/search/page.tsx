"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryIntro from "@/components/common/CategoryIntro";
import ProductCatalog from "@/components/ProductCatalog/ProductCatalog";
import type { CatalogProduct } from "@/components/ProductCatalog/ProductCatalog";

const allProducts: (CatalogProduct & { category: string })[] = [
  {
    id: 1,
    title: "AMD Ryzen 7 5700G Desktop PC",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-7-5700g-custom-pc-04-200x200.webp",
    productUrl: "/product/amd-ryzen-7-5700g-desktop-pc",
    price: 56850,
    oldPrice: 58949,
    category: "desktop",
    specifications: ["Processor: AMD Ryzen 7 5700G", "RAM: 16GB DDR4", "Storage: 512GB NVMe SSD", "Graphics: Radeon Vega 8"],
  },
  {
    id: 2,
    title: "Lenovo IdeaPad Slim 3 Ryzen 5 15.6-inch Laptop",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3/lenovo-ideapad-slim-3-200x200.jpg",
    productUrl: "/product/lenovo-ideapad-slim-3",
    price: 62900,
    oldPrice: 65900,
    category: "laptop",
    specifications: ["Processor: AMD Ryzen 5 5500U", "RAM: 8GB DDR4", "Storage: 512GB NVMe SSD", "Display: 15.6\" FHD IPS"],
  },
  {
    id: 3,
    title: "GEESUU 24-inch FHD IPS Borderless Monitor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/geesuu/geesuu-24-inch-fhd-ips-borderless-monitor-200x200.jpg",
    productUrl: "/product/geesuu-24-inch-monitor",
    price: 12999,
    category: "monitor",
    specifications: ["Screen Size: 24 Inch", "Resolution: 1920x1080 FHD", "Panel: IPS Borderless", "Refresh Rate: 75Hz"],
  },
  {
    id: 4,
    title: "Havit H2002D Multi-Platform Gaming Headphone",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/headphone/havit/havit-h2002d/havit-h2002d-200x200.jpg",
    productUrl: "/product/havit-h2002d-gaming-headphone",
    price: 2450,
    oldPrice: 2750,
    category: "headphone",
    specifications: ["Driver: 50mm", "Frequency: 20Hz-20KHz", "Connection: 3.5mm + USB", "Mic: Yes, Detachable"],
  },
  {
    id: 5,
    title: "Samsung Galaxy A35 5G Smartphone",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a35/samsung-galaxy-a35-5g-200x200.jpg",
    productUrl: "/product/samsung-galaxy-a35-5g",
    price: 41999,
    oldPrice: 44999,
    category: "mobile-phone",
    specifications: ["Display: 6.6\" Super AMOLED", "RAM: 8GB", "Storage: 128GB", "Camera: 50MP Triple"],
  },
  {
    id: 6,
    title: "Fantech Maxfit Mechanical Gaming Keyboard",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/maxfit/fantech-maxfit-200x200.jpg",
    productUrl: "/product/fantech-maxfit-mechanical-keyboard",
    price: 4850,
    category: "keyboard",
    specifications: ["Switch: Mechanical Blue", "Layout: Full Size", "Backlit: RGB", "Connection: USB wired"],
  },
  {
    id: 7,
    title: "Intel Core i5 12400 12th Gen Desktop PC",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/intel-core-i5-12400-200x200.jpg",
    productUrl: "/product/intel-core-i5-12400-desktop-pc",
    price: 48500,
    oldPrice: 51200,
    category: "desktop",
    specifications: ["Processor: Intel Core i5-12400", "RAM: 8GB DDR4", "Storage: 256GB NVMe SSD", "Graphics: Intel UHD 730"],
  },
  {
    id: 8,
    title: "MSI PRO MP273A 27-inch 100Hz IPS Monitor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/msi/pro-mp273a/msi-pro-mp273a-200x200.jpg",
    productUrl: "/product/msi-pro-mp273a-monitor",
    price: 21900,
    oldPrice: 23500,
    category: "monitor",
    specifications: ["Screen Size: 27 Inch", "Resolution: 1920x1080 FHD", "Panel: IPS", "Refresh Rate: 100Hz"],
  },
  {
    id: 9,
    title: "ASUS VivoBook 15 Core i5 13th Gen Laptop",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-15/asus-vivobook-15-200x200.jpg",
    productUrl: "/product/asus-vivobook-15",
    price: 78900,
    category: "laptop",
    specifications: ["Processor: Intel Core i5-1335U", "RAM: 8GB DDR4", "Storage: 512GB NVMe SSD", "Display: 15.6\" FHD"],
  },
  {
    id: 10,
    title: "Razer BlackShark V2 X Wired Gaming Headset",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/headphone/razer/blackshark-v2-x/razer-blackshark-v2-x-200x200.jpg",
    productUrl: "/product/razer-blackshark-v2-x",
    price: 5999,
    oldPrice: 6500,
    category: "headphone",
    specifications: ["Driver: 50mm TriForce", "Frequency: 12Hz-28KHz", "Connection: 3.5mm", "Surround: 7.1 Virtual"],
  },
  {
    id: 11,
    title: "Logitech G413 TKL SE Mechanical Gaming Keyboard",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/logitech/g413-tkl-se/logitech-g413-tkl-se-200x200.jpg",
    productUrl: "/product/logitech-g413-tkl-se",
    price: 8900,
    oldPrice: 9500,
    category: "keyboard",
    specifications: ["Switch: Mechanical Tactile", "Layout: TKL", "Backlit: White LED", "Body: Aluminum"],
  },
  {
    id: 12,
    title: "Xiaomi Redmi Note 14 Pro 5G Smartphone",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/mobile/xiaomi/redmi-note-14-pro/xiaomi-redmi-note-14-pro-200x200.jpg",
    productUrl: "/product/xiaomi-redmi-note-14-pro",
    price: 38999,
    category: "mobile-phone",
    specifications: ["Display: 6.67\" AMOLED 120Hz", "RAM: 8GB", "Storage: 256GB", "Camera: 200MP Triple"],
  },
  {
    id: 13,
    title: "LG UltraGear 24GS60F 180Hz Gaming Monitor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/lg/ultragear-24gs60f/lg-ultragear-24gs60f-200x200.jpg",
    productUrl: "/product/lg-ultragear-24gs60f-monitor",
    price: 27900,
    oldPrice: 29500,
    category: "monitor",
    specifications: ["Screen Size: 24 Inch", "Resolution: 1920x1080 FHD", "Panel: IPS", "Refresh Rate: 180Hz"],
  },
  {
    id: 14,
    title: "AMD Ryzen 5 7600 RTX 4060 Gaming Desktop PC",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/desktop-pc/gaming-pc/amd-ryzen-5-7600-rtx-4060-200x200.jpg",
    productUrl: "/product/amd-ryzen-5-7600-gaming-pc",
    price: 112500,
    oldPrice: 118000,
    category: "desktop",
    specifications: ["Processor: AMD Ryzen 5 7600", "RAM: 16GB DDR5", "Storage: 1TB NVMe SSD", "Graphics: RTX 4060 8GB"],
  },
  {
    id: 15,
    title: "HP Victus 15 Ryzen 5 RTX 4050 Gaming Laptop",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/laptop/hp/victus-15/hp-victus-15-200x200.jpg",
    productUrl: "/product/hp-victus-15-gaming-laptop",
    price: 109900,
    category: "laptop",
    specifications: ["Processor: AMD Ryzen 5 7535HS", "RAM: 16GB DDR5", "Storage: 512GB NVMe SSD", "Graphics: RTX 4050 6GB"],
  },
  {
    id: 16,
    title: "JBL Tune 720BT Wireless Over-Ear Headphone",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/headphone/jbl/tune-720bt/jbl-tune-720bt-200x200.jpg",
    productUrl: "/product/jbl-tune-720bt-headphone",
    price: 6750,
    oldPrice: 7200,
    category: "headphone",
    specifications: ["Driver: 40mm", "Battery: 76 Hours", "Connection: Bluetooth 5.3", "ANC: No"],
  },
  {
    id: 17,
    title: "Apple iPhone 15 Pro Max 256GB",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro-max/iphone-15-pro-max-200x200.jpg",
    productUrl: "/product/iphone-15-pro-max",
    price: 159999,
    oldPrice: 177999,
    category: "mobile-phone",
    specifications: ["Display: 6.7\" Super Retina XDR", "Chip: A17 Pro", "Storage: 256GB", "Camera: 48MP Triple"],
  },
  {
    id: 18,
    title: "Samsung Odyssey G5 32-inch 165Hz Curved Gaming Monitor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/odyssey-g5/samsung-odyssey-g5-200x200.jpg",
    productUrl: "/product/samsung-odyssey-g5-monitor",
    price: 34500,
    oldPrice: 38000,
    category: "monitor",
    specifications: ["Screen Size: 32 Inch", "Resolution: 2560x1440 QHD", "Panel: VA Curved 1000R", "Refresh Rate: 165Hz"],
  },
  {
    id: 19,
    title: "Apple MacBook Air M3 13-inch Laptop",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m3/macbook-air-m3-200x200.jpg",
    productUrl: "/product/macbook-air-m3",
    price: 129999,
    oldPrice: 144999,
    category: "laptop",
    specifications: ["Chip: Apple M3", "RAM: 8GB Unified", "Storage: 256GB SSD", "Display: 13.6\" Liquid Retina"],
  },
  {
    id: 20,
    title: "SteelSeries Apex 3 TKL RGB Gaming Keyboard",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/steelseries/apex-3-tkl/steelseries-apex-3-tkl-200x200.jpg",
    productUrl: "/product/steelseries-apex-3-tkl",
    price: 5500,
    category: "keyboard",
    specifications: ["Switch: Whisper Quiet Membrane", "Layout: TKL", "Backlit: RGB per-key", "IP Rating: IP32"],
  },
  {
    id: 21,
    title: 'Gigasonic RB-G1855-300C 18.5" HD LED Monitor',
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g1855-300c/gigasonic-rb-g1855-300c-200x200.jpg",
    productUrl: "/product/gigasonic-rb-g1855-300c",
    price: 4999,
    oldPrice: 5900,
    category: "monitor",
    specifications: ["Screen Size: 18.5 Inch", "Resolution: 1366x768 HD", "Panel: LED", "Refresh Rate: 60Hz"],
  },
  {
    id: 22,
    title: "Gigasonic RB-G20S-400C 20 Inch HD LED Monitor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g20s-400c/gigasonic-rb-g20s-400c-200x200.jpg",
    productUrl: "/product/gigasonic-rb-g20s-400c",
    price: 5200,
    oldPrice: 6100,
    category: "monitor",
    specifications: ["Screen Size: 20 Inch", "Resolution: 1600x900 HD+", "Panel: LED", "Refresh Rate: 60Hz"],
  },
  {
    id: 23,
    title: 'Gigasonic RB-G215S-400C 21.5" FHD LED Monitor',
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g215s-400c/gigasonic-rb-g215s-400c-200x200.jpg",
    productUrl: "/product/gigasonic-rb-g215s-400c",
    price: 6400,
    oldPrice: 6700,
    category: "monitor",
    specifications: ["Screen Size: 21.5 Inch", "Resolution: 1920x1080 FHD", "Panel: LED IPS", "Refresh Rate: 60Hz"],
  },
  {
    id: 24,
    title: 'Samsung 24" FHD IPS Monitor',
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/samsung-24-fhd-ips/samsung-24-fhd-ips-200x200.jpg",
    productUrl: "/product/samsung-24-fhd-ips",
    price: 14500,
    oldPrice: 15800,
    category: "monitor",
    specifications: ["Screen Size: 24 Inch", "Resolution: 1920x1080 FHD", "Panel: IPS", "Refresh Rate: 75Hz"],
  },
  {
    id: 25,
    title: "Logitech G102 LIGHTSYNC Gaming Mouse",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/g102/logitech-g102-200x200.jpg",
    productUrl: "/product/logitech-g102-lightsync",
    price: 1650,
    oldPrice: 1950,
    category: "mouse",
    specifications: ["Sensor: 8000 DPI", "Buttons: 6", "RGB: LIGHTSYNC", "Connection: USB wired"],
  },
  {
    id: 26,
    title: "Corsair K65 PLUS 75% RGB Gaming Keyboard",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/corsair/k65-plus/corsair-k65-plus-200x200.jpg",
    productUrl: "/product/corsair-k65-plus",
    price: 12500,
    category: "keyboard",
    specifications: ["Switch: Corsair MLX Red", "Layout: 75%", "Backlit: RGB per-key", "Connection: USB-C"],
  },
  {
    id: 27,
    title: "Intel Core i7 14700K 14th Gen Processor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/processor/intel/core-i7-14700k/intel-core-i7-14700k-200x200.jpg",
    productUrl: "/product/intel-core-i7-14700k",
    price: 48500,
    category: "processor",
    specifications: ["Cores: 20 (8P+12E)", "Threads: 28", "Base: 3.4GHz", "Boost: 5.6GHz"],
  },
  {
    id: 28,
    title: "AMD Ryzen 9 7900X Processor",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/processor/amd/ryzen-9-7900x/amd-ryzen-9-7900x-200x200.jpg",
    productUrl: "/product/amd-ryzen-9-7900x",
    price: 52000,
    oldPrice: 56000,
    category: "processor",
    specifications: ["Cores: 12", "Threads: 24", "Base: 4.7GHz", "Boost: 5.6GHz"],
  },
  {
    id: 29,
    title: "ASUS ROG Strix RTX 4070 SUPER 12GB Graphics Card",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/graphics-card/asus/rog-strix-rtx-4070-super/asus-rog-strix-rtx-4070-super-200x200.jpg",
    productUrl: "/product/asus-rog-strix-rtx-4070-super",
    price: 89000,
    category: "graphics-card",
    specifications: ["GPU: RTX 4070 SUPER", "VRAM: 12GB GDDR6X", "Clock: 2580MHz Boost", "CUDA Cores: 7168"],
  },
  {
    id: 30,
    title: "Corsair VENGEANCE RGB 16GB DDR5 6000MHz RAM",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/ram/corsair/vengeance-rgb-16gb-ddr5/corsair-vengeance-rgb-16gb-ddr5-200x200.jpg",
    productUrl: "/product/corsair-vengeance-rgb-16gb-ddr5",
    price: 6800,
    oldPrice: 7500,
    category: "ram-desktop",
    specifications: ["Capacity: 16GB (2x8GB)", "Speed: DDR5 6000MHz", "Latency: CL36", "RGB: Yes"],
  },
  {
    id: 31,
    title: "Kingston NV2 1TB M.2 NVMe SSD",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/ssd/kingston/nv2-1tb/kingston-nv2-1tb-200x200.jpg",
    productUrl: "/product/kingston-nv2-1tb",
    price: 8200,
    category: "ssd",
    specifications: ["Capacity: 1TB", "Interface: NVMe PCIe 4.0", "Read: 3500 MB/s", "Write: 2100 MB/s"],
  },
  {
    id: 32,
    title: "TP-Link Archer AX55 WiFi 6 Router",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/networking/tp-link/archer-ax55/tp-link-archer-ax55-200x200.jpg",
    productUrl: "/product/tp-link-archer-ax55",
    price: 4500,
    oldPrice: 5200,
    category: "router",
    specifications: ["Standard: WiFi 6 AX3000", "Speed: 2400 Mbps (5GHz)", "Ports: 4x Gigabit LAN", "Antenna: 4x External"],
  },
  {
    id: 33,
    title: "Hikvision 4CH Turbo HD DVR",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/security/hikvision/4ch-turbo-dvr/hikvision-4ch-turbo-dvr-200x200.jpg",
    productUrl: "/product/hikvision-4ch-turbo-dvr",
    price: 3800,
    category: "dvr-nvr",
    specifications: ["Channels: 4", "Resolution: 1080p Lite", "Storage: 1 HDD", "Interface: HDMI + VGA"],
  },
  {
    id: 34,
    title: "Canon PIXMA G3010 Multi-Function Printer",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/printer/canon/pixma-g3010/canon-pixma-g3010-200x200.jpg",
    productUrl: "/product/canon-pixma-g3010",
    price: 18500,
    oldPrice: 20000,
    category: "printer",
    specifications: ["Function: Print/Scan/Copy", "Print Speed: 8.8 ipm", "Ink: Refillable Tank", "Connectivity: USB + WiFi"],
  },
  {
    id: 35,
    title: "Logitech MX Master 3S Wireless Mouse",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/mx-master-3s/logitech-mx-master-3s-200x200.jpg",
    productUrl: "/product/logitech-mx-master-3s",
    price: 9500,
    category: "mouse",
    specifications: ["Sensor: 8000 DPI", "Connection: Bluetooth + USB", "Battery: 70 Days", "Scroll: MagSpeed Electromagnetic"],
  },
  {
    id: 36,
    title: "Apple AirPods Pro 2nd Gen with USB-C",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/headphone/apple/airpods-pro-2/apple-airpods-pro-2-200x200.jpg",
    productUrl: "/product/apple-airpods-pro-2",
    price: 26500,
    oldPrice: 29500,
    category: "earbuds",
    specifications: ["Chip: H2", "ANC: Active + Transparency", "Battery: 6 Hours", "Charging: USB-C + MagSafe"],
  },
  {
    id: 37,
    title: "Samsung Galaxy Watch 6 Classic 47mm",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/samsung/galaxy-watch-6-classic/samsung-galaxy-watch-6-classic-200x200.jpg",
    productUrl: "/product/samsung-galaxy-watch-6-classic",
    price: 32000,
    category: "smart-watch",
    specifications: ["Display: 1.47\" Super AMOLED", "OS: Wear OS 4", "Battery: 425mAh", "Water Resistance: 5ATM"],
  },
  {
    id: 38,
    title: "EcoFlow DELTA 2 Portable Power Station",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/power/ecoflow/delta-2/ecoflow-delta-2-200x200.jpg",
    productUrl: "/product/ecoflow-delta-2",
    price: 85000,
    category: "portable-power-station",
    specifications: ["Capacity: 1024Wh", "Output: 1800W", "Charging: 0-80% in 1hr", "Battery: LFP"],
  },
  {
    id: 39,
    title: "DJI Mini 4 Pro Drone",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/drone/dji/mini-4-pro/dji-mini-4-pro-200x200.jpg",
    productUrl: "/product/dji-mini-4-pro",
    price: 95000,
    category: "drone",
    specifications: ["Weight: <249g", "Camera: 4K/60fps", "Flight Time: 34 min", "Obstacle Sensing: Omni"],
  },
  {
    id: 40,
    title: "Hisense 55A6500H 55-inch 4K Smart TV",
    imageUrl:
      "https://www.startech.com.bd/image/cache/catalog/tv/hisense/55a6500h/hisense-55a6500h-200x200.jpg",
    productUrl: "/product/hisense-55a6500h",
    price: 48000,
    oldPrice: 55000,
    category: "tv",
    specifications: ["Screen: 55\" 4K UHD", "OS: VIDAA U5", "HDR: Dolby Vision", "Audio: DTS Virtual:X"],
  },
];

const categoryMap: Record<string, string> = {
  monitor: "Monitor",
  laptop: "Laptop",
  desktop: "Desktop",
  keyboard: "Keyboard",
  mouse: "Mouse",
  headphone: "Headphone",
  "mobile-phone": "Mobile Phone",
  processor: "Processor",
  "graphics-card": "Graphics Card",
  "ram-desktop": "RAM",
  ssd: "SSD",
  router: "Router",
  printer: "Printer",
  tv: "TV",
  "smart-watch": "Smart Watch",
  earbuds: "Earbuds",
  drone: "Drone",
  webcam: "Webcam",
  speaker: "Speaker",
  casing: "Casing",
  "power-supply": "Power Supply",
  motherboard: "Motherboard",
  ups: "UPS",
};

const sortOptions = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

function SearchPageInner() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") arr.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc")
      arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [filtered, sortBy]);

  const uniqueCategories = [
    ...new Set(filtered.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Search", href: "/search" },
          { label: query || "All Products" },
        ]}
      />

      <main style={{ background: "#f1f3f7" }}>
        <CategoryIntro
          title={``}
          description={``}
          options={uniqueCategories.map((cat) => ({
            label: categoryMap[cat] || cat,
            href: `/search?q=${encodeURIComponent(categoryMap[cat] || cat)}`,
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
          <ProductCatalog
            title={`Search - ${query}`}
            products={sorted}
            sortOptions={sortOptions}
            initialPageSize={20}
            desktopColumns={5}
            onSortChange={setSortBy}
            emptyText={`No products found for "${query}"`}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
      }
    >
      <SearchPageInner />
    </Suspense>
  );
}

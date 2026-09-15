import { NextRequest, NextResponse } from "next/server";

const allProducts = [
  { id: 1, title: "AMD Ryzen 7 5700G Desktop PC", imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-7-5700g-custom-pc-04-200x200.webp", productUrl: "/product/amd-ryzen-7-5700g-desktop-pc", price: 56850, oldPrice: 58949, category: "desktop" },
  { id: 2, title: "Lenovo IdeaPad Slim 3 Ryzen 5 15.6-inch Laptop", imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3/lenovo-ideapad-slim-3-200x200.jpg", productUrl: "/product/lenovo-ideapad-slim-3", price: 62900, oldPrice: 65900, category: "laptop" },
  { id: 3, title: "GEESUU 24-inch FHD IPS Borderless Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/geesuu/geesuu-24-inch-fhd-ips-borderless-monitor-200x200.jpg", productUrl: "/product/geesuu-24-inch-monitor", price: 12999, category: "monitor" },
  { id: 4, title: "Havit H2002D Multi-Platform Gaming Headphone", imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/havit-h2002d/havit-h2002d-200x200.jpg", productUrl: "/product/havit-h2002d-gaming-headphone", price: 2450, oldPrice: 2750, category: "headphone" },
  { id: 5, title: "Samsung Galaxy A35 5G Smartphone", imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a35/samsung-galaxy-a35-5g-200x200.jpg", productUrl: "/product/samsung-galaxy-a35-5g", price: 41999, oldPrice: 44999, category: "mobile-phone" },
  { id: 6, title: "Fantech Maxfit Mechanical Gaming Keyboard", imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/maxfit/fantech-maxfit-200x200.jpg", productUrl: "/product/fantech-maxfit-mechanical-keyboard", price: 4850, category: "keyboard" },
  { id: 7, title: "Intel Core i5 12400 12th Gen Desktop PC", imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/intel-core-i5-12400-200x200.jpg", productUrl: "/product/intel-core-i5-12400-desktop-pc", price: 48500, oldPrice: 51200, category: "desktop" },
  { id: 8, title: "MSI PRO MP273A 27-inch 100Hz IPS Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/msi/pro-mp273a/msi-pro-mp273a-200x200.jpg", productUrl: "/product/msi-pro-mp273a-monitor", price: 21900, oldPrice: 23500, category: "monitor" },
  { id: 9, title: "ASUS VivoBook 15 Core i5 13th Gen Laptop", imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-15/asus-vivobook-15-200x200.jpg", productUrl: "/product/asus-vivobook-15", price: 78900, category: "laptop" },
  { id: 10, title: "Razer BlackShark V2 X Wired Gaming Headset", imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/razer/blackshark-v2-x/razer-blackshark-v2-x-200x200.jpg", productUrl: "/product/razer-blackshark-v2-x", price: 5999, oldPrice: 6500, category: "headphone" },
  { id: 11, title: "Logitech G413 TKL SE Mechanical Gaming Keyboard", imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/logitech/g413-tkl-se/logitech-g413-tkl-se-200x200.jpg", productUrl: "/product/logitech-g413-tkl-se", price: 8900, oldPrice: 9500, category: "keyboard" },
  { id: 12, title: "Xiaomi Redmi Note 14 Pro 5G Smartphone", imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/xiaomi/redmi-note-14-pro/xiaomi-redmi-note-14-pro-200x200.jpg", productUrl: "/product/xiaomi-redmi-note-14-pro", price: 38999, category: "mobile-phone" },
  { id: 13, title: "LG UltraGear 24GS60F 180Hz Gaming Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/lg/ultragear-24gs60f/lg-ultragear-24gs60f-200x200.jpg", productUrl: "/product/lg-ultragear-24gs60f-monitor", price: 27900, oldPrice: 29500, category: "monitor" },
  { id: 14, title: "AMD Ryzen 5 7600 RTX 4060 Gaming Desktop PC", imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/gaming-pc/amd-ryzen-5-7600-rtx-4060-200x200.jpg", productUrl: "/product/amd-ryzen-5-7600-gaming-pc", price: 112500, oldPrice: 118000, category: "desktop" },
  { id: 15, title: "HP Victus 15 Ryzen 5 RTX 4050 Gaming Laptop", imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/victus-15/hp-victus-15-200x200.jpg", productUrl: "/product/hp-victus-15-gaming-laptop", price: 109900, category: "laptop" },
  { id: 16, title: "JBL Tune 720BT Wireless Over-Ear Headphone", imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/jbl/tune-720bt/jbl-tune-720bt-200x200.jpg", productUrl: "/product/jbl-tune-720bt-headphone", price: 6750, oldPrice: 7200, category: "headphone" },
  { id: 17, title: "Apple iPhone 15 Pro Max 256GB", imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro-max/iphone-15-pro-max-200x200.jpg", productUrl: "/product/iphone-15-pro-max", price: 159999, oldPrice: 177999, category: "mobile-phone" },
  { id: 18, title: "Samsung Odyssey G5 32-inch 165Hz Curved Gaming Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/odyssey-g5/samsung-odyssey-g5-200x200.jpg", productUrl: "/product/samsung-odyssey-g5-monitor", price: 34500, oldPrice: 38000, category: "monitor" },
  { id: 19, title: "Apple MacBook Air M3 13-inch Laptop", imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m3/macbook-air-m3-200x200.jpg", productUrl: "/product/macbook-air-m3", price: 129999, oldPrice: 144999, category: "laptop" },
  { id: 20, title: "SteelSeries Apex 3 TKL RGB Gaming Keyboard", imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/steelseries/apex-3-tkl/steelseries-apex-3-tkl-200x200.jpg", productUrl: "/product/steelseries-apex-3-tkl", price: 5500, category: "keyboard" },
  { id: 21, title: "Gigasonic RB-G1855-300C 18.5\" HD LED Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g1855-300c/gigasonic-rb-g1855-300c-200x200.jpg", productUrl: "/product/gigasonic-rb-g1855-300c", price: 4999, oldPrice: 5900, category: "monitor" },
  { id: 22, title: "Gigasonic RB-G20S-400C 20 Inch HD LED Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g20s-400c/gigasonic-rb-g20s-400c-200x200.jpg", productUrl: "/product/gigasonic-rb-g20s-400c", price: 5200, oldPrice: 6100, category: "monitor" },
  { id: 23, title: "Gigasonic RB-G215S-400C 21.5\" FHD LED Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/gigasonic/rb-g215s-400c/gigasonic-rb-g215s-400c-200x200.jpg", productUrl: "/product/gigasonic-rb-g215s-400c", price: 6400, oldPrice: 6700, category: "monitor" },
  { id: 24, title: "Samsung 24\" FHD IPS Monitor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/samsung-24-fhd-ips/samsung-24-fhd-ips-200x200.jpg", productUrl: "/product/samsung-24-fhd-ips", price: 14500, oldPrice: 15800, category: "monitor" },
  { id: 25, title: "Logitech G102 LIGHTSYNC Gaming Mouse", imageUrl: "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/g102/logitech-g102-200x200.jpg", productUrl: "/product/logitech-g102-lightsync", price: 1650, oldPrice: 1950, category: "mouse" },
  { id: 26, title: "Corsair K65 PLUS 75% RGB Gaming Keyboard", imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/corsair/k65-plus/corsair-k65-plus-200x200.jpg", productUrl: "/product/corsair-k65-plus", price: 12500, category: "keyboard" },
  { id: 27, title: "Intel Core i7 14700K 14th Gen Processor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/processor/intel/core-i7-14700k/intel-core-i7-14700k-200x200.jpg", productUrl: "/product/intel-core-i7-14700k", price: 48500, category: "processor" },
  { id: 28, title: "AMD Ryzen 9 7900X Processor", imageUrl: "https://www.startech.com.bd/image/cache/catalog/processor/amd/ryzen-9-7900x/amd-ryzen-9-7900x-200x200.jpg", productUrl: "/product/amd-ryzen-9-7900x", price: 52000, oldPrice: 56000, category: "processor" },
  { id: 29, title: "ASUS ROG Strix RTX 4070 SUPER 12GB Graphics Card", imageUrl: "https://www.startech.com.bd/image/cache/catalog/graphics-card/asus/rog-strix-rtx-4070-super/asus-rog-strix-rtx-4070-super-200x200.jpg", productUrl: "/product/asus-rog-strix-rtx-4070-super", price: 89000, category: "graphics-card" },
  { id: 30, title: "Corsair VENGEANCE RGB 16GB DDR5 6000MHz RAM", imageUrl: "https://www.startech.com.bd/image/cache/catalog/ram/corsair/vengeance-rgb-16gb-ddr5/corsair-vengeance-rgb-16gb-ddr5-200x200.jpg", productUrl: "/product/corsair-vengeance-rgb-16gb-ddr5", price: 6800, oldPrice: 7500, category: "ram-desktop" },
  { id: 31, title: "Kingston NV2 1TB M.2 NVMe SSD", imageUrl: "https://www.startech.com.bd/image/cache/catalog/ssd/kingston/nv2-1tb/kingston-nv2-1tb-200x200.jpg", productUrl: "/product/kingston-nv2-1tb", price: 8200, category: "ssd" },
  { id: 32, title: "TP-Link Archer AX55 WiFi 6 Router", imageUrl: "https://www.startech.com.bd/image/cache/catalog/networking/tp-link/archer-ax55/tp-link-archer-ax55-200x200.jpg", productUrl: "/product/tp-link-archer-ax55", price: 4500, oldPrice: 5200, category: "router" },
  { id: 33, title: "Hikvision 4CH Turbo HD DVR", imageUrl: "https://www.startech.com.bd/image/cache/catalog/security/hikvision/4ch-turbo-dvr/hikvision-4ch-turbo-dvr-200x200.jpg", productUrl: "/product/hikvision-4ch-turbo-dvr", price: 3800, category: "dvr-nvr" },
  { id: 34, title: "Canon PIXMA G3010 Multi-Function Printer", imageUrl: "https://www.startech.com.bd/image/cache/catalog/printer/canon/pixma-g3010/canon-pixma-g3010-200x200.jpg", productUrl: "/product/canon-pixma-g3010", price: 18500, oldPrice: 20000, category: "printer" },
  { id: 35, title: "Logitech MX Master 3S Wireless Mouse", imageUrl: "https://www.startech.com.bd/image/cache/catalog/mouse/logitech/mx-master-3s/logitech-mx-master-3s-200x200.jpg", productUrl: "/product/logitech-mx-master-3s", price: 9500, category: "mouse" },
  { id: 36, title: "Apple AirPods Pro 2nd Gen with USB-C", imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/apple/airpods-pro-2/apple-airpods-pro-2-200x200.jpg", productUrl: "/product/apple-airpods-pro-2", price: 26500, oldPrice: 29500, category: "earbuds" },
  { id: 37, title: "Samsung Galaxy Watch 6 Classic 47mm", imageUrl: "https://www.startech.com.bd/image/cache/catalog/smart-watch/samsung/galaxy-watch-6-classic/samsung-galaxy-watch-6-classic-200x200.jpg", productUrl: "/product/samsung-galaxy-watch-6-classic", price: 32000, category: "smart-watch" },
  { id: 38, title: "EcoFlow DELTA 2 Portable Power Station", imageUrl: "https://www.startech.com.bd/image/cache/catalog/power/ecoflow/delta-2/ecoflow-delta-2-200x200.jpg", productUrl: "/product/ecoflow-delta-2", price: 85000, category: "portable-power-station" },
  { id: 39, title: "DJI Mini 4 Pro Drone", imageUrl: "https://www.startech.com.bd/image/cache/catalog/drone/dji/mini-4-pro/dji-mini-4-pro-200x200.jpg", productUrl: "/product/dji-mini-4-pro", price: 95000, category: "drone" },
  { id: 40, title: "Hisense 55A6500H 55-inch 4K Smart TV", imageUrl: "https://www.startech.com.bd/image/cache/catalog/tv/hisense/55a6500h/hisense-55a6500h-200x200.jpg", productUrl: "/product/hisense-55a6500h", price: 48000, oldPrice: 55000, category: "tv" },
];

const allCategories = [
  { name: "Desktop", slug: "desktop" },
  { name: "Laptop", slug: "laptop" },
  { name: "Monitor", slug: "monitor" },
  { name: "Processor", slug: "processor" },
  { name: "Graphics Card", slug: "graphics-card" },
  { name: "Keyboard", slug: "keyboard" },
  { name: "Mouse", slug: "mouse" },
  { name: "Headphone", slug: "headphone" },
  { name: "Mobile Phone", slug: "mobile-phone" },
  { name: "Smart Watch", slug: "smart-watch" },
  { name: "SSD", slug: "ssd" },
  { name: "RAM (Desktop)", slug: "ram-desktop" },
  { name: "Router", slug: "router" },
  { name: "Printer", slug: "printer" },
  { name: "TV", slug: "tv" },
  { name: "Drone", slug: "drone" },
  { name: "Power Supply", slug: "power-supply" },
  { name: "Casing", slug: "casing" },
  { name: "Motherboard", slug: "motherboard" },
  { name: "SSD", slug: "ssd" },
  { name: "UPS", slug: "ups" },
  { name: "Camera", slug: "camera" },
  { name: "Speaker", slug: "speaker" },
  { name: "Tablet PC", slug: "tablet-pc" },
  { name: "Earbuds", slug: "earbuds" },
  { name: "Webcam", slug: "webcam" },
  { name: "Mouse Pad", slug: "mouse-pad" },
  { name: "USB Flash Drive", slug: "flash-drive" },
  { name: "HDMI Cable", slug: "hdmi-cable" },
  { name: "Gaming Chair", slug: "chair" },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase().trim() || "";

  if (!query) {
    return NextResponse.json({ products: [], categories: [] });
  }

  const matchedProducts = allProducts
    .filter((p) => p.title.toLowerCase().includes(query))
    .slice(0, 10);

  const matchedCategories = allCategories
    .filter((c) => c.name.toLowerCase().includes(query))
    .slice(0, 8);

  return NextResponse.json({
    products: matchedProducts,
    categories: matchedCategories,
  });
}

import Image from "next/image";
import Link from "next/link";

interface FeaturedProduct {
  imageUrl: string;
  productUrl: string;
  title: string;
  price: number;
  oldPrice?: number;
  badges?: string[];
}

const products: FeaturedProduct[] = [
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/amd-ryzen-7-5700g-custom-pc-04-200x200.webp",
    productUrl: "/product/amd-ryzen-7-5700g-desktop-pc",
    title: "AMD Ryzen 7 5700G Desktop PC",
    price: 56850,
    oldPrice: 58949,
    badges: ['Save: 2,099৳ (-4%)', 'Gift: GEESUU 24" Monitor!'],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/lenovo/ideapad-slim-3/lenovo-ideapad-slim-3-200x200.jpg",
    productUrl: "/product/lenovo-ideapad-slim-3",
    title: "Lenovo IdeaPad Slim 3 Ryzen 5 15.6-inch Laptop",
    price: 62900,
    oldPrice: 65900,
    badges: ["Save: 3,000৳ (-5%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/geesuu/geesuu-24-inch-fhd-ips-borderless-monitor-200x200.jpg",
    productUrl: "/product/geesuu-24-inch-monitor",
    title: "GEESUU 24-inch FHD IPS Borderless Monitor",
    price: 12999,
    badges: ["Earn Point: 450"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/havit/havit-h2002d/havit-h2002d-200x200.jpg",
    productUrl: "/product/havit-h2002d-gaming-headphone",
    title: "Havit H2002D Multi-Platform Gaming Headphone",
    price: 2450,
    oldPrice: 2750,
    badges: ["Save: 300৳ (-11%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/samsung/galaxy-a35/samsung-galaxy-a35-5g-200x200.jpg",
    productUrl: "/product/samsung-galaxy-a35-5g",
    title: "Samsung Galaxy A35 5G Smartphone",
    price: 41999,
    oldPrice: 44999,
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/fantech/maxfit/fantech-maxfit-200x200.jpg",
    productUrl: "/product/fantech-maxfit-mechanical-keyboard",
    title: "Fantech Maxfit Mechanical Gaming Keyboard",
    price: 4850,
    badges: ["Earn Point: 180"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/desktop-offer/intel-core-i5-12400-200x200.jpg",
    productUrl: "/product/intel-core-i5-12400-desktop-pc",
    title: "Intel Core i5 12400 12th Gen Desktop PC",
    price: 48500,
    oldPrice: 51200,
    badges: ["Save: 2,700৳ (-5%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/msi/pro-mp273a/msi-pro-mp273a-200x200.jpg",
    productUrl: "/product/msi-pro-mp273a-monitor",
    title: "MSI PRO MP273A 27-inch 100Hz IPS Monitor",
    price: 21900,
    oldPrice: 23500,
    badges: ["Gift: HDMI Cable!"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/asus/vivobook-15/asus-vivobook-15-200x200.jpg",
    productUrl: "/product/asus-vivobook-15",
    title: "ASUS VivoBook 15 Core i5 13th Gen Laptop",
    price: 78900,
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/razer/blackshark-v2-x/razer-blackshark-v2-x-200x200.jpg",
    productUrl: "/product/razer-blackshark-v2-x",
    title: "Razer BlackShark V2 X Wired Gaming Headset",
    price: 5999,
    oldPrice: 6500,
    badges: ["Save: 501৳ (-8%)", "Earn Point: 220"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/logitech/g413-tkl-se/logitech-g413-tkl-se-200x200.jpg",
    productUrl: "/product/logitech-g413-tkl-se",
    title: "Logitech G413 TKL SE Mechanical Gaming Keyboard",
    price: 8900,
    oldPrice: 9500,
    badges: ["Save: 600৳ (-6%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/xiaomi/redmi-note-14-pro/xiaomi-redmi-note-14-pro-200x200.jpg",
    productUrl: "/product/xiaomi-redmi-note-14-pro",
    title: "Xiaomi Redmi Note 14 Pro 5G Smartphone",
    price: 38999,
    badges: ["Earn Point: 520"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/lg/ultragear-24gs60f/lg-ultragear-24gs60f-200x200.jpg",
    productUrl: "/product/lg-ultragear-24gs60f-monitor",
    title: "LG UltraGear 24GS60F 180Hz Gaming Monitor",
    price: 27900,
    oldPrice: 29500,
    badges: ["Save: 1,600৳ (-5%)", "Gift: DisplayPort Cable!"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/desktop-pc/gaming-pc/amd-ryzen-5-7600-rtx-4060-200x200.jpg",
    productUrl: "/product/amd-ryzen-5-7600-gaming-pc",
    title: "AMD Ryzen 5 7600 RTX 4060 Gaming Desktop PC",
    price: 112500,
    oldPrice: 118000,
    badges: ["Save: 5,500৳ (-5%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/hp/victus-15/hp-victus-15-200x200.jpg",
    productUrl: "/product/hp-victus-15-gaming-laptop",
    title: "HP Victus 15 Ryzen 5 RTX 4050 Gaming Laptop",
    price: 109900,
    badges: ["Earn Point: 900"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/headphone/jbl/tune-720bt/jbl-tune-720bt-200x200.jpg",
    productUrl: "/product/jbl-tune-720bt-headphone",
    title: "JBL Tune 720BT Wireless Over-Ear Headphone",
    price: 6750,
    oldPrice: 7200,
    badges: ["Save: 450৳ (-6%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro-max/iphone-15-pro-max-200x200.jpg",
    productUrl: "/product/iphone-15-pro-max",
    title: "Apple iPhone 15 Pro Max 256GB",
    price: 159999,
    oldPrice: 177999,
    badges: ["Save: 18,000৳ (-10%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/monitor/samsung/odyssey-g5/samsung-odyssey-g5-200x200.jpg",
    productUrl: "/product/samsung-odyssey-g5-monitor",
    title: "Samsung Odyssey G5 32-inch 165Hz Curved Gaming Monitor",
    price: 34500,
    oldPrice: 38000,
    badges: ["Save: 3,500৳ (-9%)", "Gift: Mouse Pad!"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-air-m3/macbook-air-m3-200x200.jpg",
    productUrl: "/product/macbook-air-m3",
    title: "Apple MacBook Air M3 13-inch Laptop",
    price: 129999,
    oldPrice: 144999,
    badges: ["Save: 15,000৳ (-10%)"],
  },
  {
    imageUrl: "https://www.startech.com.bd/image/cache/catalog/keyboard/steelseries/apex-3-tkl/steelseries-apex-3-tkl-200x200.jpg",
    productUrl: "/product/steelseries-apex-3-tkl",
    title: "SteelSeries Apex 3 TKL RGB Gaming Keyboard",
    price: 5500,
    badges: ["Earn Point: 200"],
  },
];

const formatPrice = (price: number) => `${new Intl.NumberFormat("en-US").format(price)}৳`;

export default function FeaturedProducts() {
  return (
    <section className="featured-products" aria-labelledby="featured-products-title">
      <div className="featured-products-container">
        <header className="featured-products-header">
          <h2 id="featured-products-title">Featured Products</h2>
          <p>Check &amp; Get Your Desired Product!</p>
        </header>

        <div className="featured-products-grid">
          {products.map((product) => (
            <Link
              href={product.productUrl}
              className="featured-product-card"
              key={product.productUrl}
            >
              <div className="featured-product-image-area">
                {product.badges?.length ? (
                  <div className="featured-product-badges">
                    {product.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>
                ) : null}

                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={210}
                  height={130}
                  className="featured-product-image"
                />
              </div>

              <div className="featured-product-info">
                <h3>{product.title}</h3>
                <div className="featured-product-prices">
                  <span className="featured-product-price">{formatPrice(product.price)}</span>
                  {product.oldPrice ? (
                    <span className="featured-product-old-price">
                      {formatPrice(product.oldPrice)}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

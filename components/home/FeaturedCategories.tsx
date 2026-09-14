"use client";

import Link from "next/link";
import {
  ApiOutlined,
  AudioOutlined,
  BulbOutlined,
  CameraOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  ControlOutlined,
  DesktopOutlined,
  HeartOutlined,
  MobileOutlined,
  AppstoreOutlined,
  RocketOutlined,
  ScissorOutlined,
  TabletOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const categories = [
  { name: "AC", href: "/category/ac", icon: ControlOutlined },
  {
    name: "Portable Power Station",
    href: "/category/portable-power-station",
    icon: ThunderboltOutlined,
  },
  { name: "Air Fryer", href: "/category/air-fryer", icon: CoffeeOutlined },
  { name: "Drone", href: "/category/drone", icon: RocketOutlined },
  { name: "Gimbal", href: "/category/gimbal", icon: VideoCameraOutlined },
  { name: "Tablet PC", href: "/category/tablet-pc", icon: TabletOutlined },
  { name: "TV", href: "/category/tv", icon: DesktopOutlined },
  { name: "Fridge", href: "/category/fridge", icon: AppstoreOutlined },
  {
    name: "Mobile Phone",
    href: "/category/mobile-phone",
    icon: MobileOutlined,
  },
  {
    name: "Mobile Accessories",
    href: "/category/mobile-accessories",
    icon: ApiOutlined,
  },
  {
    name: "Health Monitor",
    href: "/category/health-monitor",
    icon: HeartOutlined,
  },
  { name: "WiFi Camera", href: "/category/wifi-camera", icon: CameraOutlined },
  { name: "Trimmer", href: "/category/trimmer", icon: ScissorOutlined },
  {
    name: "Smart Watch",
    href: "/category/smart-watch",
    icon: ClockCircleOutlined,
  },
  { name: "Earbuds", href: "/category/earbuds", icon: AudioOutlined },
  { name: "Torch Light", href: "/category/torch-light", icon: BulbOutlined },
];

export default function FeaturedCategories() {
  return (
    <section
      className="featured-categories"
      aria-labelledby="featured-categories-title"
    >
      <div className="featured-categories-container">
        <header className="featured-categories-header">
          <h2 id="featured-categories-title">Featured Category</h2>
          <p>Get Your Desired Product from Featured Category!</p>
        </header>

        <div className="featured-categories-grid">
          {categories.map(({ name, href, icon: Icon }) => (
            <Link className="featured-category-card" href={href} key={href}>
              <Icon className="featured-category-icon" aria-hidden="true" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

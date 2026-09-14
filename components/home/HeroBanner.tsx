"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Intel Core i7 14th Gen",
    subtitle: "Gaming Desktop PC",
    description: "And Get Amazing Gifts",
    bgColor: "#1a1a6e",
    image: "/images/banner1.svg",
    link: "/product/gaming-desktop-i7",
  },
  {
    id: 2,
    title: "AMD Ryzen 9 Series",
    subtitle: "Workstation Bundle",
    description: "Free RAM + SSD Upgrade",
    bgColor: "#8b0000",
    image: "/images/banner2.svg",
    link: "/product/workstation-ryzen9",
  },
  {
    id: 3,
    title: "NVIDIA RTX 4070",
    subtitle: "Graphics Card Sale",
    description: "Up to 20% Off Today",
    bgColor: "#0a5c36",
    image: "/images/banner3.svg",
    link: "/product/rtx-4070",
  },
];

const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-slider">
            <div
              className="hero-slides"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="hero-slide"
                  style={{ backgroundColor: slide.bgColor }}
                >
                  <div className="hero-slide-bg">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </div>
                  <div className="hero-slide-content">
                    <p className="hero-slide-desc">{slide.description}</p>
                    <h2 className="hero-slide-title">{slide.title}</h2>
                    <h3 className="hero-slide-subtitle">{slide.subtitle}</h3>
                    <Link href={slide.link} className="hero-slide-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="hero-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`hero-dot ${index === current ? "active" : ""}`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hero-side">
            <Link href="/feedback" className="hero-side-banner hero-side-top">
              <div className="hero-side-content">
                <p className="hero-side-tagline">Share Your Feedback</p>
                <h3 className="hero-side-title">Complaints or Suggestions</h3>
                <span className="hero-side-btn">Let Us Know</span>
              </div>
            </Link>
            <Link href="/careers" className="hero-side-banner hero-side-bottom">
              <div className="hero-side-content">
                <span className="hero-side-badge">Apply Now</span>
                <h3 className="hero-side-title">
                  Shape Your<br />Career With Us!
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

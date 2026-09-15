"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/images/hero-banner1.webp",
    alt: "Laptop Service",
    link: "/service-center",
  },
  {
    id: 2,
    image: "/images/hero-banner2.webp",
    alt: "Printer Service",
    link: "/service-center",
  },
  {
    id: 3,
    image: "/images/hero-banner3.webp",
    alt: "Mobile Service",
    link: "/service-center",
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
                <div key={slide.id} className="hero-slide">
                  <Link href={slide.link} className="hero-slide-link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="hero-slide-img"
                    />
                  </Link>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/side-feedback.webp"
                alt="Complaints or Suggestions"
                className="hero-side-img"
              />
            </Link>
            <Link href="/careers" className="hero-side-banner hero-side-bottom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/side-careers.webp"
                alt="Shape Your Career With Us"
                className="hero-side-img"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

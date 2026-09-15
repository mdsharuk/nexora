"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  DesktopOutlined,
  LaptopOutlined,
  PrinterOutlined,
  MobileOutlined,
  VideoCameraOutlined,
  SafetyCertificateOutlined,
  FileSearchOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const services = [
  {
    name: "Desktop Service",
    icon: DesktopOutlined,
    detail: "Startup issues, upgrades & hardware checks",
    guide: "desktop-care",
  },
  {
    name: "Laptop Service",
    icon: LaptopOutlined,
    detail: "Battery, keyboard & performance support",
    guide: "laptop-care",
  },
  {
    name: "Printer Service",
    icon: PrinterOutlined,
    detail: "Paper jams, printing & connectivity",
    guide: "printer-care",
  },
  {
    name: "Monitor Service",
    icon: DesktopOutlined,
    detail: "Display, power & connection issues",
    guide: "display-care",
  },
  {
    name: "Projector Service",
    icon: VideoCameraOutlined,
    detail: "Image quality, cooling & setup",
    guide: "projector-care",
  },
  {
    name: "Mobile Service",
    icon: MobileOutlined,
    detail: "Charging, screen & device assessment",
    guide: "mobile-care",
  },
];

const steps = [
  [
    "Describe your issue",
    "Tell us about your device, the problem, and the best way to contact you.",
  ],
  [
    "Discuss a quote",
    "Ask the team about inspection, estimated costs, and the expected repair time.",
  ],
  [
    "Approve the service plan",
    "Review the proposed work and charges before authorizing a repair.",
  ],
  [
    "Arrange device handover",
    "Confirm a drop-off location and what accessories to bring with your device.",
  ],
  [
    "Collect your device",
    "Check the completed work and ask about care instructions and any repair warranty.",
  ],
];

const slides = [
  {
    image: "/images/service-laptop.webp",
    alt: "Laptop service",
  },
  {
    image: "/images/service-desktop.webp",
    alt: "Desktop service",
  },
  {
    image: "/images/service-laptop.webp",
    alt: "Printer service",
  },
  {
    image: "/images/service-mobile.webp",
    alt: "Mobile service",
  },
];

const tips = [
  {
    id: "laptop-care",
    icon: LaptopOutlined,
    title: "Keep your laptop clean and cool",
    text: "Turn the laptop off and disconnect power before cleaning. Use a soft, dry cloth, keep vents clear, and avoid spraying liquid directly onto the device.",
  },
  {
    id: "display-care",
    icon: DesktopOutlined,
    title: "Check a flickering screen",
    text: "Check the display cable and power connection. Try another cable or port when available, and note whether the issue also appears on an external display.",
  },
  {
    id: "projector-care",
    icon: VideoCameraOutlined,
    title: "Help your projector stay cool",
    text: "Keep ventilation openings unobstructed and follow the manufacturer's filter cleaning instructions. Allow the cooling cycle to finish before disconnecting power.",
  },
  {
    id: "mobile-care",
    icon: MobileOutlined,
    title: "Troubleshoot charging problems",
    text: "Try a compatible charger and cable in good condition. Stop using damaged cables. If the device becomes unusually hot or the battery swells, stop charging and request an inspection.",
  },
];

export default function ServiceCenter() {
  const [slide, setSlide] = useState(0);
  const [service, setService] = useState("");
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(
    null,
  );
  const bookingRef = useRef<HTMLElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const current = slides[slide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setSlide((previous) => (previous + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  function chooseService(name: string) {
    setService(name);
    setDraft(null);
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    selectRef.current?.focus({ preventScroll: true });
  }

  function prepareRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft({
      subject: "Service request: " + service,
      body: [
        "Service: " + service,
        "Device / model: " + data.get("device"),
        "Issue: " + data.get("issue"),
        "",
        "Name: " + data.get("name"),
        "Phone: " + data.get("phone"),
        "Email: " + data.get("email"),
      ].join("\n"),
    });
  }

  return (
    <>
      <Header />
      <main className="service-page">
        <div className="service-container">
          <section
            className="service-hero"
            aria-label="Service highlights"
            aria-roledescription="carousel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.alt}
              width="1290"
              height="500"
            />
            <div
              className="service-hero__dots"
              role="group"
              aria-label="Choose a banner"
            >
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  type="button"
                  aria-label={"Show " + item.alt + " banner"}
                  aria-pressed={slide === index}
                  onClick={() => setSlide(index)}
                />
              ))}
            </div>
          </section>

          <div className="service-values">
            {[
              [
                FileSearchOutlined,
                "Describe the problem",
                "A clear starting point",
              ],
              [
                MessageOutlined,
                "Discuss your options",
                "Understand the next steps",
              ],
              [
                SafetyCertificateOutlined,
                "Approve the work",
                "Review costs before repair",
              ],
              [
                CheckCircleOutlined,
                "Care for your device",
                "Practical support and guidance",
              ],
            ].map(([Icon, title, text]) => {
              const ValueIcon = Icon as typeof FileSearchOutlined;
              return (
                <div key={String(title)}>
                  <ValueIcon />
                  <span>
                    <strong>{String(title)}</strong>
                    <small>{String(text)}</small>
                  </span>
                </div>
              );
            })}
          </div>

          <section
            id="book-service"
            ref={bookingRef}
            className="service-booking"
          >
            <div className="service-booking__form">
              <span className="service-eyebrow">TELL US WHAT HAPPENED</span>
              <h2>Get help with your device</h2>
              <p>Prepare a request to send to our support team.</p>
              <form onSubmit={prepareRequest} onChange={() => setDraft(null)}>
                <label>
                  Service you&apos;re looking for
                  <select
                    ref={selectRef}
                    name="service"
                    required
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  >
                    <option value="">Select a service</option>
                    {services.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                    <option>Other Device</option>
                  </select>
                </label>
                <label>
                  Device / model
                  <input
                    name="device"
                    required
                    maxLength={150}
                    placeholder="e.g. Lenovo IdeaPad Slim 3"
                  />
                </label>
                <label>
                  A little about the issue
                  <textarea
                    name="issue"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="What is happening, and when did it start?"
                  />
                </label>
                <div className="service-form-row">
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="Full name"
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={30}
                      placeholder="Contact number"
                    />
                  </label>
                </div>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    placeholder="you@example.com"
                  />
                </label>
                <button type="submit" className="service-button">
                  Prepare Service Request <ArrowRightOutlined />
                </button>
                <small className="service-form-note">
                  You&apos;ll review your request, then send it using your email
                  app. A booking is confirmed only after the team replies.
                </small>
              </form>
              {draft && (
                <div className="service-draft" role="status">
                  <h3>Your request is ready</h3>
                  <pre>{draft.body}</pre>
                  <a
                    className="service-button"
                    href={
                      "mailto:sales@nexoratech.com?subject=" +
                      encodeURIComponent(draft.subject) +
                      "&body=" +
                      encodeURIComponent(draft.body)
                    }
                  >
                    <MailOutlined /> Open Email to Send
                  </a>
                  <p>
                    No email app? Send these details to{" "}
                    <a href="mailto:sales@nexoratech.com">
                      sales@nexoratech.com
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
            <div id="how-it-works" className="service-booking__steps">
              <span className="service-eyebrow">FROM REQUEST TO REPAIR</span>
              <h2>Follow these simple steps</h2>
              <ol>
                {steps.map(([title, text], index) => (
                  <li key={title}>
                    <span>{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="service-booking__reminder">
                <SafetyCertificateOutlined />
                <p>
                  Before handing over a device, back up your files and bring
                  your invoice if you&apos;re asking about warranty support.
                </p>
              </div>
            </div>
          </section>

          <section id="featured-services" className="service-section">
            <div className="service-section__heading">
              <span className="service-eyebrow">WHAT NEEDS ATTENTION?</span>
              <h2>Featured Services</h2>
              <p>Choose your device to start a service request.</p>
            </div>
            <div className="service-cards">
              {services.map(({ name, icon: Icon, detail }) => (
                <button
                  key={name}
                  type="button"
                  className="service-card-option"
                  onClick={() => chooseService(name)}
                >
                  <span className="service-card-option__visual">
                    <Icon />
                  </span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                  <span className="service-card-option__link">
                    Request service <ArrowRightOutlined />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section id="service-locations" className="service-section">
            <div className="service-location-banner">
              <div>
                <span className="service-eyebrow">LET&apos;S GET YOU CONNECTED</span>
                <h2>Support for your next step.</h2>
                <p>Speak with the team before visiting or sending a device.</p>
              </div>
              <a href="mailto:sales@nexoratech.com" className="service-button">
                <MailOutlined /> Contact Support
              </a>
            </div>
            <div className="service-contact-grid">
              <article>
                <MailOutlined />
                <h3>Email support</h3>
                <p>Share your device model, symptoms, and contact details.</p>
                <a href="mailto:sales@nexoratech.com">
                  sales@nexoratech.com <ArrowRightOutlined />
                </a>
              </article>
              <article>
                <EnvironmentOutlined />
                <h3>Plan your visit</h3>
                <p>
                  Ask support to confirm the service address, opening hours, and
                  available service before you travel.
                </p>
                <a href="/contact">
                  Contact information <ArrowRightOutlined />
                </a>
              </article>
              <article>
                <FileSearchOutlined />
                <h3>Warranty enquiries</h3>
                <p>
                  Have your purchase invoice and product serial number ready for
                  the team to review.
                </p>
                <a href="/warranty">
                  View warranty policy <ArrowRightOutlined />
                </a>
              </article>
            </div>
          </section>

          <section className="service-section">
            <div className="service-section__heading">
              <span className="service-eyebrow">
                A LITTLE CARE GOES A LONG WAY
              </span>
              <h2>Tips for Your Tech</h2>
              <p>Simple checks and everyday habits for your devices.</p>
            </div>
            <div className="service-tips">
              {tips.map(({ id, icon: Icon, title }) => (
                <a href={"#" + id} key={id}>
                  <div>
                    <Icon />
                    <span>DEVICE CARE GUIDE</span>
                    <h3>{title}</h3>
                  </div>
                  <p>
                    Read the tips <ArrowRightOutlined />
                  </p>
                </a>
              ))}
            </div>
          </section>

          <article className="service-guide">
            <h2>Device service at Nexora Tech</h2>
            <p>
              A useful service request starts with the device model and a clear
              description of the issue. Include when the issue began, any error
              messages, and what you have already tried. Photos or a short video
              can help when you email the team.
            </p>
            <h2>Before you arrange a repair</h2>
            <p>
              Ask about inspection fees, parts availability, estimated
              turnaround time, and the warranty offered on any completed work.
              Repair options and prices depend on the device and the findings of
              an inspection.
            </p>
            <h3 id="desktop-care">Desktop service and upgrades</h3>
            <p>
              Note whether your computer powers on, displays an image, or
              produces a startup error. For an upgrade enquiry, include your
              current processor, motherboard, memory, storage, and power supply
              details.
            </p>
            <h3 id="printer-care">Printer service</h3>
            <p>
              Record the printer model and any error code. Check paper placement
              and the connection first. Follow the manufacturer&apos;s instructions
              for clearing paper jams, and avoid forcing stuck parts.
            </p>
            {tips.map(({ id, title, text }) => (
              <section id={id} key={id}>
                <h3>{title}</h3>
                <p>{text}</p>
              </section>
            ))}
            <h3>Protect your files and accounts</h3>
            <p>
              Back up important files before service. Remove removable storage
              you do not need to leave with the device, and ask how the team
              handles access to your device and data.
            </p>
            <h3>Ready to get started?</h3>
            <p>
              Use the request form above to prepare your details, then email the
              team to discuss the next steps. Confirm the location and
              appointment before arranging a visit.
            </p>
            <a href="#book-service" className="service-button">
              Prepare a service request <ArrowRightOutlined />
            </a>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

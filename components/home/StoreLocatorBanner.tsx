import Link from "next/link";
import { SearchIcon } from "@/components/common/header-common/Icons";

function LocationPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.15 7 13 7 13s7-7.85 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

export default function StoreLocatorBanner() {
  return (
    <section className="store-locator-section" aria-labelledby="store-locator-title">
      <div className="store-locator-banner">
        <div className="store-locator-content">
          <span className="store-locator-pin">
            <LocationPinIcon />
          </span>

          <div className="store-locator-copy">
            <h2 id="store-locator-title">20+ Physical Stores</h2>
            <p>Visit Our Store &amp; Get Your Desired IT Product!</p>
          </div>
        </div>

        <Link href="/contact" className="store-locator-button">
          <span>Find Our Store</span>
          <SearchIcon size={20} />
        </Link>
      </div>
    </section>
  );
}

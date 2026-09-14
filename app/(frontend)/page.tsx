import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import NewsBar from "@/components/home/NewsBar";
import ServiceBar from "@/components/home/ServiceBar";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import StoreLocatorBanner from "@/components/home/StoreLocatorBanner";
import SeoContent from "@/components/home/SeoContent";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main-bg">
        <HeroBanner />
        <NewsBar />
        <ServiceBar />
        <FeaturedCategories />
        <StoreLocatorBanner />
        <FeaturedProducts />
        <SeoContent />
      </main>
      <Footer />
    </>
  );
}

import Nav from "@/components/Nav";
import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import AdvantageSection from "@/sections/AdvantageSection";
import MetricsSection from "@/sections/MetricsSection";
import CTASection from "@/sections/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <HeroSection />
      <FeaturesSection />
      <AdvantageSection />
      <MetricsSection />
      <CTASection />
      <Footer />
    </>
  );
}

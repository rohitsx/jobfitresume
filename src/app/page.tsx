import FaqSection from "@/components/faq";
import FeaturesSection from "@/components/feature";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/howItWork";
import PricingSection from "@/components/price";

export default function LandingPage() {
  return (
    <>
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* <PricingSection /> */}
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}

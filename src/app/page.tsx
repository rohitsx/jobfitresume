import FaqSection from "@/components/faq";
import FeaturesSection from "@/components/feature";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/howItWork";
import NavBar from "@/components/navbar";
import { getCookies } from "@/lib/getCookies";

export default async function LandingPage() {
  const userData = await getCookies();

  return (
    <>
      <NavBar userData={userData} />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
      </main>
    </>
  );
}

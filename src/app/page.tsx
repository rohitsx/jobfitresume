import FaqSection from "@/components/faq";
import FeaturesSection from "@/components/feature";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import HowItWorksSection from "@/components/howItWork";

export default function LandingPage() {
	return (
		<>
			<main className="flex-grow">
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<FaqSection />
			</main>
			<Footer />
		</>
	);
}

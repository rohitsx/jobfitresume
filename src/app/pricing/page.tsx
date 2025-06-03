import Footer from "@/components/footer";
import PricingSection from "./price";
import { cookies } from "next/headers";

export default async function Pricing() {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  return (
    <>
      <main>
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}

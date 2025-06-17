import Footer from "@/components/footer";
import PricingSection from "./price";
import { cookies } from "next/headers";
import { getCookies } from "@/lib/getCookies";
import NavBar from "@/components/navbar";

export default async function Pricing() {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  const userData = await getCookies();

  return (
    <>
      <NavBar userData={userData} />
      <main>
        <PricingSection uid={uid} />
      </main>
    </>
  );
}

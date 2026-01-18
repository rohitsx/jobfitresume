import { cookies } from "next/headers";
import AuthGaurd from "@/components/AuthGuard";
import { SideBar } from "./cvComponent/SideBar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) return <AuthGaurd />;

  return (
    <div className="bg-gray-50 text-lg text-gray-500 min-h-screen flex">
      <div className="hidden h-full lg:block lg:fixed">
        <SideBar uid={uid} />
      </div>

      <main className="flex-1 w-full pt-2 lg:ml-65 xl:ml-75 2xl:ml-85">
        {children}
      </main>
    </div>
  );
}

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
      <div className="hidden lg:block lg:fixed lg:w-[300px] xl:w-[400px] h-full overflow-auto">
        <SideBar uid={uid} />
      </div>

      <main className="flex-1 w-full lg:ml-[300px] xl:ml-[400px] pt-2">
        {children}
      </main>
    </div>
  );
}

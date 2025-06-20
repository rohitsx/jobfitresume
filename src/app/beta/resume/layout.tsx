import { SideBar } from "./cvComponent/SideBar";
import { Suspense } from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-50 text-lg text-gray-500 min-h-screen flex">
      <div className="hidden h-full lg:block lg:fixed">
        <Suspense fallback={<div className="p-4">Loading Sidebar...</div>}>
          <SideBar />
        </Suspense>
      </div>

      <main className="flex-1 w-full pt-2 lg:ml-65 xl:ml-75 2xl:ml-85">
        {children}
      </main>
    </div>
  );
}

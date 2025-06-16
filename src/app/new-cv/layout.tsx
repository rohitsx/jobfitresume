import { Newsreader } from "next/font/google";
import React from "react";

const newsreader = Newsreader({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main
			className={`${newsreader.className} text-base h-full text-gray-800 bg-gray-50`}
		>
			<div className="flex justify-center">{children}</div>
		</main>
	);
}

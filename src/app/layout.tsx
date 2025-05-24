import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
import NavBar from "@/components/navbar";
import { getCookies } from "@/lib/getCookies";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "JobFit Resume | AI-Powered Resume Tailoring to Land Your Dream Job",
	description:
		"Create perfectly tailored resumes in minutes with JobFit Resume. Our AI, powered by Gemini and other top models, analyzes job descriptions to help you stand out and get hired faster.",
	keywords:
		"AI resume builder, tailored resume, custom resume, job description resume, resume optimization, Gemini resume, stand out resume, get hired faster, resume AI, Next.js resume tool",
	icons: {
		icon: "/icon.ico",
	},
	openGraph: {
		title: "JobFit Resume | AI-Powered Resume Tailoring",
		description:
			"Instantly craft job-winning resumes with AI. Analyze job descriptions and customize your resume to perfection.",
		type: "website",
		url: "https://jobfitresume.vercel.app",
		// images: [{ url: 'https://yourdomain.com/og-image.png' }], // Replace with your OG image
	},
	twitter: {
		card: "summary_large_image",
		title: "JobFit Resume | AI-Powered Resume Tailoring",
		description:
			"Stop sending generic resumes. Start getting interviews with AI-personalized resumes from JobFit Resume.",
		// site: '@yourtwitterhandle', // Replace with your Twitter handle
		creator: "@rohitsxx",
		// images: ['https://yourdomain.com/twitter-image.png'], // Replace with your Twitter image
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userData = await getCookies();

	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>
				<div className="flex flex-col min-h-screen">
					<NavBar userData={userData} />
					{children}
				</div>
			</body>
		</html>
	);
}

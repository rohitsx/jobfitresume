import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "JobFit Resume",
	description:
		"Create Job ready tailored resumes in minutes with JobFit Resume.",
	keywords:
		"AI resume builder, tailored resume, custom resume, job description resume, job fit resume, jobfitresume, JobFit Resume, JobFitResume, Job Fit Resume , resume optimization, Gemini resume, stand out resume, get hired faster, resume AI, Next.js resume tool",
	icons: {
		icon: "/icon.ico",
	},
	openGraph: {
		title: "JobFit Resume",
		description:
			"Instantly craft job-winning resumes with AI. Analyze job descriptions and customize your resume to perfection.",
		type: "website",
		url: "https://jobfitresume.vercel.app",
	},
	twitter: {
		card: "summary_large_image",
		title: "JobFit Resume | AI-Powered Resume Tailoring",
		description:
			"Stop sending generic resumes. Start getting interviews with AI-personalized resumes from JobFit Resume.",
		creator: "@rohitsxx",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.className} font-sans`}>
			<body>
				<div className="flex flex-col min-h-screen">{children}</div>
				<GoogleAnalytics gaId="G-5SG5WZET44" />
			</body>
		</html>
	);
}

import { UserDetails } from "@/types/ResumeData.types";
import { Github, Linkedin, Globe, LucideIcon } from "lucide-react";
import React from "react";

const SocialLink: React.FC<{
	href: string;
	display: string;
	icon?: LucideIcon;
}> = ({ href, display, icon: Icon }) => (
	<>
		<span>▪</span>
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center gap-1"
		>
			{Icon && <Icon className="size-4" />} {display}
		</a>
	</>
);

export default function ResumeHeader({
	userDetails,
}: {
	userDetails: UserDetails;
}) {
	const { name, country, email, website, github, linkedin, currentTitle } =
		userDetails;

	const formatWebsiteUrl = (url: string) => {
		return url.startsWith("http") ? url : `https://${url}`;
	};

	const formatWebsiteDisplay = (url: string) => {
		return url.replace(/^https?:\/\/(www\.)?/, "");
	};

	const formatGithubUrl = (username: string) => {
		const cleanedUsername = username.replace(/^(github\/|githube\/)/i, "");
		return cleanedUsername.startsWith("http")
			? cleanedUsername
			: `https://github.com/${cleanedUsername}`;
	};

	const formatGithubDisplay = (username: string) => {
		return `${username
			.replace(/^(github\/|githube\/)/i, "")
			.replace(/^https?:\/\/(www\.)?github\.com\//i, "")}`;
	};

	const formatLinkedinUrl = (username: string) => {
		const cleanedUsername = username.replace(/^(li\/|in\/)/i, "");
		return cleanedUsername.startsWith("http")
			? cleanedUsername
			: `https://linkedin.com/in/${cleanedUsername}`;
	};

	const formatLinkedinDisplay = (username: string) => {
		return `${username
			.replace(/^(li\/|in\/|linkedin\/)/i, "")
			.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i, "")}`;
	};

	// const formatTwitterUrl = (username: string) => {
	//   const cleanedUsername = username.replace(/^(x\/|twitter\/)/i, "");
	//   return cleanedUsername.startsWith("http")
	//     ? cleanedUsername
	//     : `https://twitter.com/${cleanedUsername}`;
	// };

	// const formatTwitterDisplay = (username: string) => {
	//   return `x/${username
	//     .replace(/^(x\/|twitter\/)/i, "")
	//     .replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")}`;
	// };

	return (
		<header className="space-y-2 text-center">
			<h1 className="text-2xl text-gray-800 font-semibold">
				{name} - {currentTitle}
			</h1>
			<div className="flex flex-wrap gap-x-2 justify-center">
				{country && <span>{country}</span>}
				<span>▪</span>
				<a href={`mailto:${email}`}>{email}</a>

				{github && (
					<SocialLink
						href={formatGithubUrl(github)}
						display={formatGithubDisplay(github)}
						icon={Github}
					/>
				)}
				{linkedin && (
					<SocialLink
						href={formatLinkedinUrl(linkedin)}
						display={formatLinkedinDisplay(linkedin)}
						icon={Linkedin}
					/>
				)}
				{website && (
					<SocialLink
						href={formatWebsiteUrl(website)}
						display={formatWebsiteDisplay(website)}
						icon={Globe}
					/>
				)}
				{/* {twitter && ( */}
				{/*   <SocialLink */}
				{/*     href={formatTwitterUrl(twitter)} */}
				{/*     display={formatTwitterDisplay(twitter)} */}
				{/*   /> */}
				{/* )} */}
			</div>
		</header>
	);
}

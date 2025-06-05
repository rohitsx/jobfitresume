import { UserDetails } from "@/types/types";
import React from "react";

const SocialLink: React.FC<{
	href: string;
	display: string;
}> = ({ href, display }) => (
	<>
		<span>▪</span>
		<a href={href} target="_blank" rel="noopener noreferrer">
			{display}
		</a>
	</>
);

export default function ResumeHeader({
	userDetails,
}: {
	userDetails: UserDetails;
}) {
	const { name, country, email, website, github, linkedin } = userDetails;

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
		return `github/${username
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
		return `linkedin/${username
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
		<header className="text-center">
			<h1 className="text-xl text-gray-800 font-bold">{name}</h1>
			<div className=" flex flex-wrap gap-x-1 items-center justify-center ">
				{country && <span>{country}</span>}
				<span>▪</span>
				<a href={`mailto:${email}`}>{email}</a>

				{github && (
					<SocialLink
						href={formatGithubUrl(github)}
						display={formatGithubDisplay(github)}
					/>
				)}
				{linkedin && (
					<SocialLink
						href={formatLinkedinUrl(linkedin)}
						display={formatLinkedinDisplay(linkedin)}
					/>
				)}
				{website && (
					<SocialLink
						href={formatWebsiteUrl(website)}
						display={formatWebsiteDisplay(website)}
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

"use client";

import { useEffect, useState, useRef } from "react";
import { ResumeData } from "../lib/types";

interface Resume {
	resume: ResumeData;
}

const formatDate = (dateStr: string) => {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function ResumeComponent() {
	const resumeRef = useRef<HTMLDivElement>(null);
	const [resumeData, setResumeData] = useState<ResumeData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const resumeJson = localStorage.getItem("generatedResumeData");
			if (resumeJson) {
				const parsedData: Resume = JSON.parse(resumeJson);
				setResumeData(parsedData.resume);
			}
		} catch (error) {
			console.error("Error loading resume data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				Loading resume...
			</div>
		);
	}

	if (!resumeData) {
		return (
			<div className="flex justify-center items-center h-screen">
				No resume data found
			</div>
		);
	}

	const { userDetails, workExperience, education, projects, skills } =
		resumeData;

	const workExpCount = workExperience.length;
	const projectsToShow = Math.max(
		0,
		Math.min(3 - workExpCount, projects.length),
	);
	const experiencesToShow = Math.min(workExpCount, 3);

	const limitedWorkExperience = workExperience.slice(0, experiencesToShow);
	const limitedProjects = projects.slice(0, projectsToShow);

	// Flag to determine if we should show the projects section at all
	const showProjectsSection = projectsToShow > 0;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white print:w-4xl print:p-0 print:m-0 ">
			<div className="flex justify-end mb-4 print:hidden">
				<button
					onClick={() => window.print()}
					className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Download PDF
				</button>
			</div>

			<div
				ref={resumeRef}
				id="resumeContent"
				className="bg-white p-6  border border-gray-200 print:border-none"
			>
				{/* Header/Contact Info */}
				<header className="mb-2 text-center">
					<h1 className="text-3xl font-bold text-gray-800">
						{userDetails.name} - {userDetails.currentTitle}
					</h1>
					<div className="text-gray-600 mt-2 flex flex-wrap gap-x-2 items-center justify-center text-sm">
						<span>
							{userDetails.state && userDetails.country
								? `${userDetails.country}, ${userDetails.state}`
								: userDetails.country}
						</span>
						<span>▪</span>
						<a
							href={`mailto:${userDetails.email}`}
							className="text-blue-600 hover:underline"
						>
							{userDetails.email}
						</a>
						{userDetails.website && (
							<>
								<span>▪</span>
								<a
									href={
										userDetails.website.startsWith("http")
											? userDetails.website
											: `https://${userDetails.website}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{userDetails.website.replace(/^https?:\/\/(www\.)?/, "")}
								</a>
							</>
						)}
						{userDetails.github && (
							<>
								<span>▪</span>
								<a
									href={
										userDetails.github.startsWith("http")
											? userDetails.github
											: `https://github.com/${userDetails.github.replace(/^(github\/|githube\/)/i, "")}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									github/
									{userDetails.github
										.replace(/^(github\/|githube\/)/i, "")
										.replace(/^https?:\/\/(www\.)?github\.com\//i, "")}
								</a>
							</>
						)}
						{userDetails.linkedin && (
							<>
								<span>▪</span>
								<a
									href={
										userDetails.linkedin.startsWith("http")
											? userDetails.linkedin
											: userDetails.linkedin.startsWith("in/")
												? `https://linkedin.com/${userDetails.linkedin}`
												: userDetails.linkedin.startsWith("li/")
													? `https://linkedin.com/in/${userDetails.linkedin.replace(/^li\//i, "")}`
													: `https://linkedin.com/in/${userDetails.linkedin}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									li/
									{userDetails.linkedin
										.replace(/^li\//i, "")
										.replace(/^in\//i, "")
										.replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i, "")}
								</a>
							</>
						)}
						{userDetails.twitter && (
							<>
								<span>▪</span>
								<a
									href={
										userDetails.twitter.startsWith("http")
											? userDetails.twitter
											: `https://twitter.com/${userDetails.twitter.replace(/^(x\/|twitter\/)/i, "")}`
									}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									x/
									{userDetails.twitter
										.replace(/^(x\/|twitter\/)/i, "")
										.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")}
								</a>
							</>
						)}
					</div>
				</header>
				{/* Work Experience Section */}
				{limitedWorkExperience.length > 0 && (
					<section className="mb-4">
						<h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
							WORK EXPERIENCE
						</h2>
						{limitedWorkExperience.map((exp, index) => (
							<div key={index} className="mb-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-bold text-gray-800">
											{exp.companyName}{" "}
											{exp.projectName && exp.projectName?.length <= 105 && (
												<span className="mt-1 font-semibold">
													- {exp.projectName}
												</span>
											)}
										</h3>
										<p className="text-gray-700 italic">
											{exp.jobTitle} {exp.WorkStyle && `(${exp.WorkStyle})`}
										</p>
									</div>
									<div className="text-right">
										<p className="text-gray-600">
											{formatDate(exp.startDate)} -{" "}
											{exp.current
												? "Present"
												: exp.endDate
													? formatDate(exp.endDate)
													: ""}
										</p>
										{exp.location && (
											<p className="text-gray-600">{exp.location}</p>
										)}
									</div>
								</div>

								<div className="mt-1 ml-4 text-sm">
									{exp.achievements &&
										exp.achievements.map((sentence, i) => {
											if (sentence.trim()) {
												return (
													<p key={i} className="text-gray-700 mt-1">
														‣ {sentence.trim()}
													</p>
												);
											}
											return null;
										})}
								</div>

								{exp.technologies && exp.technologies.length > 0 && (
									<p className="text-gray-700 mt-2 ml-4 text-sm">
										<span className="font-semibold">Tech Stack:</span>{" "}
										{exp.technologies.join(", ")}
									</p>
								)}
							</div>
						))}
					</section>
				)}

				{/* Projects Section - only show if there are projects to show */}
				{showProjectsSection && (
					<section className="mb-4">
						<h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
							PROJECTS
						</h2>
						{limitedProjects.map((project, index) => (
							<div key={index} className="mb-4">
								<div className="flex justify-between items-start">
									<h3 className="font-bold text-gray-800">
										{" "}
										<a
											href={
												project.repoLink
													? project.repoLink
													: project.liveDemoLink
											}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											{project.title}
										</a>
									</h3>
									<p className="text-gray-600">
										{formatDate(project.startDate)} -{" "}
										{formatDate(project.endDate)}
									</p>
								</div>

								{project.type && project.role && (
									<p className="text-gray-700 italic">
										{project.type} Project - {project.role}
									</p>
								)}

								<div className="mt-1 ml-4">
									<p className="text-gray-700">- {project.description}</p>
									<p className="text-gray-700 mt-1">- {project.outcome}</p>
								</div>

								{project.technologies && project.technologies.length > 0 && (
									<p className="text-gray-700 mt-2 ml-4 text-sm">
										<span className="font-semibold">Tech Stack:</span>{" "}
										{project.technologies.join(", ")}
									</p>
								)}
							</div>
						))}
					</section>
				)}

				{/* Education Section */}
				<section className="mb-4">
					<h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
						EDUCATION
					</h2>
					{education.map((edu, index) => (
						<div key={index} className="mb-4">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="font-bold text-gray-800">{edu.university}</h3>
									<p className="text-gray-700">
										Major: {edu.degree} ({edu.major})
									</p>
								</div>
								<div className="text-right">
									<p className="text-gray-600">
										{edu.startDate ? formatDate(edu.startDate) : ""} -{" "}
										{edu.completed
											? edu.graduationDate
												? formatDate(edu.graduationDate)
												: formatDate(edu.endDate || "")
											: edu.endDate
												? formatDate(edu.endDate)
												: ""}
									</p>
									{edu.location && (
										<p className="text-gray-600">{edu.location}</p>
									)}
								</div>
							</div>
						</div>
					))}
				</section>

				{/* Skills & Certifications Section */}
				<section className="mb-6">
					<h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">
						CERTIFICATIONS, SKILLS & INTERESTS
					</h2>

					{/* Skills */}
					<p className="mt-2 font-semibold">Skills:</p>
					<div className="ml-4">
						{/* Group skills by category */}
						{(() => {
							// Filter skills by categories
							const technicalSkills = skills
								.filter((skill) => skill.category === "Technical")
								.map((skill) => skill.name);

							// Get frontend skills
							const frontEndSkills = technicalSkills.filter((skill) =>
								[
									"TypeScript",
									"JavaScript",
									"React",
									"Next.js",
									"Svelte",
									"WebRTC",
									"Vite",
								].some((tech) => skill.includes(tech)),
							);

							// Get backend skills
							const backEndSkills = technicalSkills.filter((skill) =>
								[
									"Deno",
									"Node.js",
									"Python",
									"Express",
									"FastAPI",
									"SQL",
									"NoSQL",
									"Redis",
									"Prisma",
								].some((tech) => skill.includes(tech)),
							);

							// Get DevOps skills
							const devOpsSkills = technicalSkills.filter((skill) =>
								[
									"Git",
									"GitHub",
									"Docker",
									"Nginx",
									"AWS",
									"Google Cloud",
								].some((tech) => skill.includes(tech)),
							);

							return (
								<>
									<p className="text-gray-700">
										‣ <span className="font-semibold">Front-end:</span>{" "}
										{frontEndSkills.join(", ")}
										{frontEndSkills.length
											? ""
											: "TypeScript / JavaScript (React, Next.js)"}
									</p>
									<p className="text-gray-700">
										‣ <span className="font-semibold">Back-end:</span>{" "}
										{backEndSkills.join(", ")}
										{backEndSkills.length ? "" : "Node.js, Python, SQL, NoSQL"}
									</p>
									<p className="text-gray-700">
										‣ <span className="font-semibold">DevOps:</span>{" "}
										{devOpsSkills.join(", ")}
										{devOpsSkills.length ? "" : "Git, Docker, Cloud Services"}
									</p>
								</>
							);
						})()}
					</div>

					{/* Display interests if found in user details */}
					{resumeData.userDetails.summary &&
						resumeData.userDetails.summary.includes("Interests") && (
							<p className="mt-2">
								<span className="font-semibold">▪ Interests:</span>
								{resumeData.userDetails.summary.split("Interests:")[1]?.trim()}
							</p>
						)}
				</section>
			</div>
		</div>
	);
}

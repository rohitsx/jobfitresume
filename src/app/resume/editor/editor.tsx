"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { UserDetailsForm } from "./form/userDetailsForm";
import { HeadingDiv } from "./form/help/formComponents";
import { ExperienceForm } from "./form/experienceForm";
import { EducationForm } from "./form/educationForm";
import { ProjectForm } from "./form/projectForm";
import { SkillsForm } from "./form/skillsForm";

export default function Editor() {
	const {
		resumeData,
		addWorkExperience,
		removeWorkExperience,
		addEducation,
		removeEducation,
		addProject,
		removeProject,
	} = useResumeStore();

	// Show a loading or empty state until the data is available
	if (!resumeData) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-lg text-gray-500">Loading Resume Data...</p>
			</div>
		);
	}

	const { userDetails, education, workExperience, projects, skills } =
		resumeData;

	return (
		<div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8">
			<HeadingDiv heading="User Details">
				<UserDetailsForm userDetails={userDetails} />
			</HeadingDiv>

			<HeadingDiv heading="Work Experience">
				<div className="space-y-6">
					{workExperience.map((exp, index) => (
						<div
							key={index}
							className="relative p-4 border rounded-md bg-white shadow-sm"
						>
							<ExperienceForm experience={exp} index={index} />
							<button
								onClick={() => removeWorkExperience(index)}
								className="absolute top-2 right-2 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
							>
								Remove
							</button>
						</div>
					))}
				</div>
				<button
					onClick={addWorkExperience}
					className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
				>
					+ Add Work Experience
				</button>
			</HeadingDiv>

			<HeadingDiv heading="Education">
				<div className="space-y-6">
					{education.map((edu, index) => (
						<div
							key={index}
							className="relative p-4 border rounded-md bg-white shadow-sm"
						>
							<EducationForm education={edu} index={index} />
							<button
								onClick={() => removeEducation(index)}
								className="absolute top-2 right-2 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
							>
								Remove
							</button>
						</div>
					))}
				</div>
				<button
					onClick={addEducation}
					className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
				>
					+ Add Education
				</button>
			</HeadingDiv>

			<HeadingDiv heading="Projects">
				<div className="space-y-6">
					{projects.map((proj, index) => (
						<div
							key={index}
							className="relative p-4 border rounded-md bg-white shadow-sm"
						>
							<ProjectForm project={proj} index={index} />
							<button
								onClick={() => removeProject(index)}
								className="absolute top-2 right-2 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
							>
								Remove
							</button>
						</div>
					))}
				</div>
				<button
					onClick={addProject}
					className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
				>
					+ Add Project
				</button>
			</HeadingDiv>

			<HeadingDiv heading="Skills">
				<SkillsForm skills={skills} />
			</HeadingDiv>
		</div>
	);
}

"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useEffect } from "react";
import { UserDetailsForm } from "./form/userDetailsForm";
import { HeadingDiv } from "./form/help/formComponents";
import { ExperienceForm } from "./form/experienceForm";
import { EducationForm } from "./form/educationForm";
import { ProjectForm } from "./form/projectForm";
import { SkillsForm } from "./form/skillsForm";
import { ActionBar } from "./form/help/actionBar";
import { commonClass } from "./form/help/commonUi";

export default function Editor() {
	const {
		resumeData,
		draftData,
		startEditing,
		saveChanges,
		discardChanges,
		addWorkExperience,
		removeWorkExperience,
		addEducation,
		removeEducation,
		addProject,
		removeProject,
	} = useResumeStore();

	useEffect(() => {
		startEditing();
	}, [startEditing]);

	const dataForEditor = draftData || resumeData;
	const { removeBtnClass, addBtnClass, commonDivClass } = commonClass();

	if (!dataForEditor) {
		return (
			<div className="text-center p-8 text-lg text-gray-500">
				Loading Resume Data...
			</div>
		);
	}

	const hasChanges = draftData !== null;
	const { userDetails, education, workExperience, projects, skills } =
		dataForEditor;

	return (
		<>
			<div className="space-y-6 max-w-4xl mx-auto p-4 md:p-8 mb-24">
				<HeadingDiv heading="User Details">
					<UserDetailsForm userDetails={userDetails} />
				</HeadingDiv>

				<HeadingDiv heading="Work Experience">
					<div className="space-y-6">
						{workExperience.map((exp, index) => (
							<div key={`exp-${index}`} className={commonDivClass}>
								<ExperienceForm experience={exp} index={index} />
								<button
									onClick={() => removeWorkExperience(index)}
									className={removeBtnClass}
								>
									Remove
								</button>
							</div>
						))}
					</div>
					<button onClick={addWorkExperience} className={addBtnClass}>
						+ Add Work Experience
					</button>
				</HeadingDiv>

				<HeadingDiv heading="Education">
					<div className="space-y-6">
						{education.map((edu, index) => (
							<div key={`edu-${index}`} className={commonDivClass}>
								<EducationForm education={edu} index={index} />
								<button
									onClick={() => removeEducation(index)}
									className={removeBtnClass}
								>
									Remove
								</button>
							</div>
						))}
					</div>
					<button onClick={addEducation} className={addBtnClass}>
						+ Add Education
					</button>
				</HeadingDiv>

				<HeadingDiv heading="Projects">
					<div className="space-y-6">
						{projects.map((proj, index) => (
							<div key={`proj-${index}`} className={commonDivClass}>
								<ProjectForm project={proj} index={index} />
								<button
									onClick={() => removeProject(index)}
									className={removeBtnClass}
								>
									Remove
								</button>
							</div>
						))}
					</div>
					<button onClick={addProject} className={addBtnClass}>
						+ Add Project
					</button>
				</HeadingDiv>

				<HeadingDiv heading="Skills">
					<SkillsForm
						key={draftData ? "draft-skills" : "saved-skills"}
						skills={skills}
					/>
				</HeadingDiv>
			</div>

			<ActionBar
				hasChanges={hasChanges}
				onSave={saveChanges}
				onDiscard={discardChanges}
			/>
		</>
	);
}

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
	User,
	Briefcase,
	GraduationCap,
	FolderOpen,
	Lightbulb,
	Edit3,
	Save,
	X,
	AlertTriangle,
	FileText,
} from "lucide-react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import WorkExperienceView from "./workExperienceView";
import EducationView from "./educationView";
import ProjectsView from "./projectView";
import SkillsView from "./skillsView";
import UserDetailsForm from "./userDetailsForm";
import WorkExperienceForm from "./workExperienceForm";
import EducationForm from "./educationForm";
import SkillsForm from "./skillForm";
import UserDetailsView from "./userDetailsView";
import ProjectsForm from "./projectForm";
import {
	ResumeData,
	UserDetails,
	WorkExperience,
	Education,
	Project,
	Skill,
} from "@/types/types";
import { FirebaseApp } from "@/lib/firebase";
import { getDbRef } from "@/lib/dbRef";

type EditableData =
	| UserDetails
	| WorkExperience[]
	| Education[]
	| Project[]
	| Skill[];

type ChangeValue =
	| string
	| boolean
	| number
	| string[]
	| WorkExperience
	| Education
	| Project
	| Skill;

export default function ResumeEditor() {
	const [resumeData, setResumeData] = useState<ResumeData | null>(null);
	const [activeTab, setActiveTab] = useState("userDetails");
	const [isEditing, setIsEditing] = useState(false);
	const [editData, setEditData] = useState<EditableData | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const defRef = useMemo(() => getDbRef(), []);

	const fetchResumeData = useCallback(async () => {
		const uid = localStorage.getItem("uid");

		if (!uid) throw new Error("No uid found");

		onValue(defRef, (snapshot) => {
			if (snapshot.exists()) {
				const { resumeData } = snapshot.val();
				setResumeData(resumeData);
			}
		});
	}, [defRef]);

	useEffect(() => {
		fetchResumeData();
	}, [fetchResumeData]);

	const handleSave = async () => {
		if (!editData || !resumeData) return;

		setIsSaving(true);

		let updatedData: ResumeData;

		if (activeTab === "userDetails") {
			updatedData = { ...resumeData, userDetails: editData as UserDetails };
		} else if (activeTab === "workExperience" && Array.isArray(editData)) {
			updatedData = {
				...resumeData,
				workExperience: editData as WorkExperience[],
			};
		} else if (activeTab === "education" && Array.isArray(editData)) {
			updatedData = { ...resumeData, education: editData as Education[] };
		} else if (activeTab === "projects" && Array.isArray(editData)) {
			updatedData = { ...resumeData, projects: editData as Project[] };
		} else if (activeTab === "skills" && Array.isArray(editData)) {
			updatedData = { ...resumeData, skills: editData as Skill[] };
		} else {
			setIsSaving(false);
			return;
		}

		try {
			const uid = localStorage.getItem("uid");
			if (!uid) throw new Error("No uid found");
			const db = getDatabase(FirebaseApp);
			const resumeRef = ref(db, `users/${uid}`);

			update(resumeRef, {
				resumeData: updatedData,
			});

			setResumeData(updatedData);
			setIsEditing(false);
		} catch (error) {
			console.error("Error saving data:", error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleEdit = () => {
		if (!resumeData) return;

		let dataToEdit: EditableData;
		if (activeTab === "userDetails") {
			dataToEdit = resumeData.userDetails || ({} as UserDetails);
		} else {
			const tabData = resumeData[activeTab as keyof typeof resumeData];

			if (
				["workExperience", "education", "projects", "skills"].includes(
					activeTab,
				)
			) {
				dataToEdit = Array.isArray(tabData) ? tabData : [];
			} else {
				dataToEdit = (tabData || {}) as UserDetails;
			}
		}

		setEditData(
			dataToEdit ? JSON.parse(JSON.stringify(dataToEdit)) : dataToEdit,
		);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditData(null);
	};

	const handleChange = (
		value: ChangeValue,
		section?: string,
		index?: number,
		field?: string,
	) => {
		if (!editData) return;

		if (activeTab === "userDetails" && !Array.isArray(editData) && field) {
			setEditData({ ...editData, [field]: value } as UserDetails);
		} else if (Array.isArray(editData) && typeof index === "number" && field) {
			const newData = [...editData] as (
				| WorkExperience
				| Education
				| Project
				| Skill
			)[];
			newData[index] = { ...newData[index], [field]: value };
			setEditData(newData as EditableData);
		}
	};

	const renderTab = () => {
		if (!resumeData || isEditing) return null;

		switch (activeTab) {
			case "userDetails":
				return <UserDetailsView data={resumeData.userDetails} />;
			case "workExperience":
				return <WorkExperienceView data={resumeData.workExperience} />;
			case "education":
				return <EducationView data={resumeData.education} />;
			case "projects":
				return <ProjectsView data={resumeData.projects} />;
			case "skills":
				return <SkillsView data={resumeData.skills} />;
			default:
				return null;
		}
	};

	const renderEditForm = () => {
		if (!isEditing || !editData) return null;

		switch (activeTab) {
			case "userDetails":
				return (
					<UserDetailsForm
						data={editData as UserDetails}
						onChange={(field, value) =>
							handleChange(value, undefined, undefined, field)
						}
					/>
				);
			case "workExperience":
				return (
					<WorkExperienceForm
						data={editData as WorkExperience[]}
						onChange={(index, field, value) =>
							handleChange(value, "workExperience", index, field)
						}
					/>
				);
			case "education":
				return (
					<EducationForm
						data={editData as Education[]}
						onChange={(index, field, value) =>
							handleChange(value, "education", index, field)
						}
					/>
				);
			case "projects":
				return (
					<ProjectsForm
						data={editData as Project[]}
						onChange={(index, field, value) =>
							handleChange(value, "projects", index, field)
						}
					/>
				);
			case "skills":
				return (
					<SkillsForm
						data={editData as Skill[]}
						onChange={(index, field, value) =>
							handleChange(value, "skills", index, field)
						}
					/>
				);
			default:
				return null;
		}
	};

	const tabLabels = {
		userDetails: "Personal Details",
		workExperience: "Work Experience",
		education: "Education",
		projects: "Projects",
		skills: "Skills",
	};

	const tabIcons = {
		userDetails: <User className="w-5 h-5 mr-2" />,
		workExperience: <Briefcase className="w-5 h-5 mr-2" />,
		education: <GraduationCap className="w-5 h-5 mr-2" />,
		projects: <FolderOpen className="w-5 h-5 mr-2" />,
		skills: <Lightbulb className="w-5 h-5 mr-2" />,
	};

	if (!resumeData) {
		return (
			<div
				id="resume-editor"
				className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
			>
				<div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
					<div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<FileText className="w-8 h-8 text-indigo-600" />
					</div>
					<h3 className="text-xl font-semibold text-gray-900 mb-2">
						No Resume Data Found
					</h3>
					<p className="text-gray-600">
						Please upload a PDF first to get started with editing your resume.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div id="resume-editor" className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-6 py-8">
				<div className="mb-8">
					<div className="flex items-center gap-3">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Resume Editor
							</h1>
							<p className="text-gray-600">
								Edit and manage your resume sections
							</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
					<div className="flex overflow-x-auto">
						{[
							"userDetails",
							"workExperience",
							"education",
							"projects",
							"skills",
						].map((tab) => (
							<button
								key={tab}
								className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
										? "border-indigo-600 text-indigo-600 bg-indigo-50"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
									}`}
								onClick={() => {
									setActiveTab(tab);
									setIsEditing(false);
								}}
							>
								{tabIcons[tab as keyof typeof tabIcons]}
								{tabLabels[tab as keyof typeof tabLabels]}
							</button>
						))}
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							{!isEditing ? (
								<button
									className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
									onClick={handleEdit}
								>
									<Edit3 className="w-4 h-4 mr-2" />
									Edit Section
								</button>
							) : (
								<div className="flex space-x-3">
									<button
										className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										onClick={handleSave}
										disabled={isSaving}
									>
										{isSaving ? (
											<>
												<svg
													className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													></circle>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>
												Saving...
											</>
										) : (
											<>
												<Save className="w-4 h-4 mr-2" />
												Save Changes
											</>
										)}
									</button>
									<button
										className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
										onClick={handleCancel}
										disabled={isSaving}
									>
										<X className="w-4 h-4 mr-2" />
										Cancel
									</button>
								</div>
							)}
						</div>

						{isEditing && (
							<div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
								<AlertTriangle className="w-4 h-4 mr-2" />
								Editing Mode
							</div>
						)}
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-96">
					{isEditing ? renderEditForm() : renderTab()}
				</div>
			</div>
		</div>
	);
}

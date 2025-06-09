import { Skill } from "@/types/ResumeData.types";
import { useResumeStore } from "@/store/useResumeStore";
import { FormField } from "./help/formComponents";
import { useEffect, useState } from "react";

interface SkillsFormProps {
	skills: Skill[];
}

export const SkillsForm = ({ skills }: SkillsFormProps) => {
	const updateResumeData = useResumeStore((state) => state.updateResumeData);

	// Use local state to manage the input string for better performance
	const [skillsString, setSkillsString] = useState(
		skills.map((s) => s.name).join(", "),
	);

	// Sync local state if the global state changes from an external source
	useEffect(() => {
		setSkillsString(skills.map((s) => s.name).join(", "));
	}, [skills]);

	const handleBlur = () => {
		// On blur, transform the string into Skill[] and update the global store
		const skillObjects = skillsString
			.split(",")
			.map((name) => name.trim())
			.filter(Boolean) // Remove any empty strings
			.map((name) => ({ name })); // Transform into Skill objects

		// Update the entire skills array in the store
		updateResumeData({ path: ["skills"], value: skillObjects });
	};

	return (
		<div className="p-4">
			<FormField label="Skills (comma-separated)">
				<input
					type="text"
					value={skillsString}
					onChange={(e) => setSkillsString(e.target.value)}
					onBlur={handleBlur}
					placeholder="e.g., TypeScript, React, Zustand, Tailwind CSS"
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
				/>
			</FormField>
			<p className="text-xs text-gray-500 mt-1">
				Separate skills with a comma. The list will update when you click away.
			</p>
		</div>
	);
};

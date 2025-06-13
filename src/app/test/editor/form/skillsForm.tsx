import { SkillsFormProps } from "@/types/Form.types";
import { useResumeStore } from "@/store/useResumeStore";
import { FormField } from "./help/formComponents";
import { useEffect, useState } from "react";

export const SkillsForm = ({ skills }: SkillsFormProps) => {
	const updateDraftData = useResumeStore((state) => state.updateDraftData);
	const [skillsString, setSkillsString] = useState(
		skills.map((s) => s.name).join(", "),
	);

	useEffect(() => {
		setSkillsString(skills.map((s) => s.name).join(", "));
	}, [skills]);

	const handleBlur = () => {
		const skillObjects = skillsString
			.split(",")
			.map((name) => name.trim())
			.filter(Boolean)
			.map((name) => ({ name }));
		updateDraftData({ path: ["skills"], value: skillObjects });
	};

	return (
		<div className="p-4">
			<FormField label="Skills (comma-separated)">
				<textarea
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

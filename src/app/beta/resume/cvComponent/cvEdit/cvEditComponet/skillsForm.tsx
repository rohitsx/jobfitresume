import { SkillsFormProps } from "@/types/Form.types";
import { useResumeStore } from "@/store/useResumeStore";
import { FormField } from "../cvEdithelp/FormComponents";
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
		<div className="space-y-6">
			<h1 className="text-black text-xl">Skills (comma-separated)</h1>

			<div>
				<textarea
					value={skillsString}
					onChange={(e) => setSkillsString(e.target.value)}
					onBlur={handleBlur}
					placeholder="e.g., TypeScript, React, Zustand, Tailwind CSS"
					className="border p-2 h-32 border-gray-300 rounded-md shadow-sm w-full"
				/>
				<p className="text-xs text-gray-500 mt-1">
					Separate skills with a comma. The list will update when you click
					away.
				</p>
			</div>
		</div>
	);
};

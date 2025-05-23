import { Skill } from "@/types/types";

export default function SkillsForm({
	data,
	onChange,
}: {
	data: Skill[];
	onChange: (index: number, field: string, value: string | number) => void;
}) {
	const handleAddSkill = () => {
		// Create a new array with all existing skills plus a new empty one
		const newSkill: Skill = {
			name: "",
			category: "Technical",
			proficiency: "Beginner",
			yearsOfExperience: 0,
		};
		// This is the key issue - we need to pass the entire updated array
		// to a special handler rather than using the field-level onChange
		const newSkillsArray = [...data, newSkill];
		// Call a special handler for array updates
		if (typeof window !== "undefined") {
			// This is a workaround to make sure the parent component gets the full updated array
			window.dispatchEvent(
				new CustomEvent("skills-updated", {
					detail: newSkillsArray,
				}),
			);
		}
	};
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Edit Skills</h2>
			{data.map((skill, index) => (
				<div key={index} className="border p-4 rounded mb-4">
					<h3 className="font-medium mb-2">Skill #{index + 1}</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Skill Name
							</label>
							<input
								type="text"
								value={skill.name || ""}
								onChange={(e) => onChange(index, "name", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Category
							</label>
							<select
								value={skill.category || ""}
								onChange={(e) => onChange(index, "category", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							>
								<option value="Technical">Technical</option>
								<option value="Soft Skill">Soft Skill</option>
								<option value="Language">Language</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Proficiency
							</label>
							<select
								value={skill.proficiency || ""}
								onChange={(e) => onChange(index, "proficiency", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							>
								<option value="">Select Proficiency</option>
								<option value="Beginner">Beginner</option>
								<option value="Intermediate">Intermediate</option>
								<option value="Advanced">Advanced</option>
								<option value="Expert">Expert</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Years of Experience
							</label>
							<input
								type="number"
								value={skill.yearsOfExperience || ""}
								onChange={(e) =>
									onChange(index, "yearsOfExperience", Number(e.target.value))
								}
								min="0"
								step="0.5"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>
					</div>
				</div>
			))}
			<button
				type="button"
				onClick={handleAddSkill}
				className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
			>
				Add Skill
			</button>
		</div>
	);
}

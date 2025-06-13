import { Skill } from "@/types/ResumeData.types";
import { SectionHeader } from "./components";

export default function ResumeSkills({ skills }: { skills: Skill[] }) {
	const skillCategories = Object.groupBy(
		skills,
		({ category }) => category || "",
	);
	const categories = Object.keys(skillCategories);

	return (
		<div>
			<SectionHeader title="Skills" />
			{categories.map((category, index) => (
				<div key={index} className="flex flex-wrap gap-x-1">
					<h4 className="font-semibold">{category}: </h4>
					{skillCategories[category]?.map(({ name }, index) => (
						<p key={index}>{name}, </p>
					))}
				</div>
			))}
		</div>
	);
}

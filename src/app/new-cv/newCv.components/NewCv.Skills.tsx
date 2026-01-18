import { NewResumeData } from "@/types/NewResume.type";

export const NewCvSkills = ({ skill }: { skill: NewResumeData["skill"] }) => {
	const skillCategories = Object.groupBy(
		skill,
		({ category }) => category || "",
	);
	const categories = Object.keys(skillCategories);

	return (
		<div className="text-left">
			<h1 className="text-xl border-b-2 border-gray-500  mb-1">Skills</h1>
			{categories.map((category, index) => (
				<div key={index} className="flex flex-wrap gap-x-1 px-3">
					<h4 className="font-semibold text-base">{category}: </h4>
					{skillCategories[category]?.map(({ name }, index) => (
						<p key={index}>{name}, </p>
					))}
				</div>
			))}
		</div>
	);
};

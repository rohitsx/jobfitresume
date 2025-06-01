import { Skill } from "@/types/types";

export default function SkillsView({ data }: { data: Skill[] }) {
	// Group skills by category
	const skillsByCategory = data.reduce(
		(acc: Record<string, Skill[]>, skill) => {
			if (!acc[skill.category]) {
				acc[skill.category] = [];
			}
			acc[skill.category].push(skill);
			return acc;
		},
		{},
	);

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Skills</h2>
			{Object.entries(skillsByCategory).map(
				([category, skills]: [string, Skill[]]) => (
					<div key={category} className="mt-4">
						<h3 className="font-medium">{category}</h3>
						<div className="flex flex-wrap gap-2 mt-2">
							{skills.map((skill: Skill, i: number) => (
								<div key={i} className="bg-gray-100 px-3 py-2 rounded">
									{skill.name}
									<div className="text-xs text-gray-500"></div>
								</div>
							))}
						</div>
					</div>
				),
			)}
		</div>
	);
}

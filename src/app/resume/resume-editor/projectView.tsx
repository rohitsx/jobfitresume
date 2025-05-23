import { Project } from "@/types/types";

export default function ProjectsView({
	data,
}: {
	data: Project[] | undefined;
}) {
	if (!data || !Array.isArray(data) || data.length === 0) {
		return (
			<div className="space-y-6">
				<h2 className="text-xl font-semibold">Projects</h2>
				<div className="text-center py-8 bg-gray-50 rounded-lg">
					<p className="text-gray-500">
						No projects found. Click the &quot;Edit&quot; button to add your
						projects.
					</p>
				</div>
			</div>
		);
	}
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Projects</h2>
			{data.map((project, index) => (
				<div key={index} className="border-b pb-4 last:border-b-0">
					<div className="flex justify-between">
						<h3 className="font-medium">{project.title}</h3>
						<span>
							{project.startDate} - {project.endDate}
						</span>
					</div>
					{project.type && project.role && (
						<p className="text-sm text-gray-500">
							{project.type} Project • {project.role}
							{project.teamSize && ` • Team of ${project.teamSize}`}
						</p>
					)}
					<p className="mt-2">{project.description}</p>
					{project.outcome && (
						<p className="mt-1">
							<strong>Outcome:</strong> {project.outcome}
						</p>
					)}
					{project.technologies && project.technologies.length > 0 && (
						<div className="mt-2">
							<p className="font-medium">Technologies:</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{project.technologies.map((tech: string, i: number) => (
									<span
										key={i}
										className="bg-gray-100 px-2 py-1 rounded text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					)}
					<div className="mt-2 flex gap-4">
						{project.repoLink && (
							<a
								href={project.repoLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								Repository Link
							</a>
						)}
						{project.liveDemoLink && (
							<a
								href={project.liveDemoLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								Live Demo
							</a>
						)}
					</div>
					{project.keyLearnings && project.keyLearnings.length > 0 && (
						<div className="mt-2">
							<p className="font-medium">Key Learnings:</p>
							<ul className="list-disc pl-5 mt-1">
								{project.keyLearnings.map((learning: string, i: number) => (
									<li key={i}>{learning}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

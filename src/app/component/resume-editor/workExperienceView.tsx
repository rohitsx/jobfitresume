import { WorkExperience } from "@/app/lib/types";

export default function WorkExperienceView({
	data,
}: {
	data: WorkExperience[];
}) {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Work Experience</h2>
			{data.map((job, index) => (
				<div key={index} className="border-b pb-4 last:border-b-0">
					<div className="flex justify-between">
						<h3 className="font-medium">{job.jobTitle}</h3>
						<span>
							{job.startDate} - {job.current ? "Present" : job.endDate}
						</span>
					</div>
					<p>
						{job.companyName} • {job.location}
					</p>
					<p className="text-sm text-gray-500">
						{job.WorkStyle} • {job.roleLevel}
					</p>

					{job.industry && (
						<p className="text-sm text-gray-500">
							<span className="font-medium">Industry:</span> {job.industry}
						</p>
					)}

					{job.teamSize && (
						<p className="text-sm text-gray-500">
							<span className="font-medium">Team Size:</span> {job.teamSize}
						</p>
					)}

					{job.projectName && (
						<p className="text-sm text-gray-500">
							<span className="font-medium">Project:</span> {job.projectName}
						</p>
					)}

					{job.workLink && (
						<p className="text-sm text-gray-500">
							<span className="font-medium">Work Link:</span>{" "}
							<a
								href={job.workLink}
								className="text-blue-500 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								{job.workLink}
							</a>
						</p>
					)}

					<p className="mt-2">{job.description}</p>

					{job.technologies && job.technologies.length > 0 && (
						<div className="mt-2">
							<p className="font-medium">Technologies:</p>
							<div className="flex flex-wrap gap-2 mt-1">
								{job.technologies.map((tech: string, i: number) => (
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

					{job.achievements && job.achievements.length > 0 && (
						<div className="mt-2">
							<p className="font-medium">Achievements:</p>
							<ul className="list-disc pl-5 mt-1">
								{job.achievements.map((achievement: string, i: number) => (
									<li key={i}>{achievement}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

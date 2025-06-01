import { Education } from "@/types/types";
import { formatDate, SectionHeader } from "./components";

export default function ResumeEducation({
	education,
}: {
	education: Education[];
}) {
	return (
		<section>
			<SectionHeader title="Education" />
			{education.map((edu, index) => (
				<div key={index} className="mb-4">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-bold ">{edu.university}</h3>
							<p>
								Major: {edu.degree} ({edu.major})
							</p>
						</div>
						<div className="text-right">
							<p>
								{edu.startDate ? formatDate(edu.startDate) : ""} -{" "}
								{edu.completed
									? edu.graduationDate
										? formatDate(edu.graduationDate)
										: formatDate(edu.endDate || "")
									: edu.endDate
										? formatDate(edu.endDate)
										: ""}
							</p>
							{edu.location && <p>{edu.location}</p>}
						</div>
					</div>
				</div>
			))}
		</section>
	);
}

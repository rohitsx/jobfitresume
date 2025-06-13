import { WorkExperience } from "@/types/ResumeData.types";
import { formatDate, SectionHeader } from "./components";
import { convertToStrong } from "@/lib/convertToStrong";

export default function Experience({
	experience,
}: {
	experience: WorkExperience[] | undefined;
}) {
	return (
		<div>
			<SectionHeader title="Experience" />
			<div className="space-y-3">
				{experience?.map((data, index) => (
					<div key={index} className="space-y-1">
						<div className="flex justify-between items-start ">
							<div>
								<p className="font-semibold">
									{data.jobTitle} | {data.companyName} - {data.workStyle}
								</p>
								<div className="flex-wrap flex gap-1 px-1">
									{data.keywords?.map((keyword, i) => (
										<p className="italic text-[16px] " key={i}>
											{keyword}{" "}
											{data.keywords && i !== data.keywords.length - 1 && "/ "}
										</p>
									))}
								</div>
							</div>
							<div className="text-right">
								<p className="font-semibold">
									{formatDate(data.startDate)} -{" "}
									{data.current
										? "Present"
										: data.endDate
											? formatDate(data.endDate)
											: ""}
								</p>
								{data.location && (
									<p className="text-[16px] px-1">{data.location}</p>
								)}
							</div>
						</div>

						<div className="px-2">
							{Array.isArray(data.description) &&
								data.description.map((sentence, i) => {
									if (sentence.trim()) {
										return (
											<div key={i} className="flex gap-1.5 ">
												<a>●</a>
												<p
													dangerouslySetInnerHTML={{
														__html: `${convertToStrong(sentence.trim())}`,
													}}
												></p>
											</div>
										);
									}
									return null;
								})}

							{data.technologies && data.technologies.length > 0 && (
								<div className="flex gap-1.5">
									<a>●</a>
									<p>
										<span className="font-semibold">Tech:</span>{" "}
										{data.technologies.join(", ")}
									</p>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

import { Project } from "@/types/ResumeData.types";
import { formatDate, SectionHeader, UrlHtml } from "./components";

export default function ResumeProject({
	project,
}: {
	project: Project[] | undefined;
}) {
	return (
		<div>
			<SectionHeader title="Projects" />
			<div className="space-y-3">
				{project?.map((data, index) => (
					<div key={index}>
						<div className="flex justify-between items-start font-semibold space-y-1">
							<div className="flex text-base flex-wrap gap-1">
								<p>{data.title}</p>
								{data.link?.live && (
									<UrlHtml link={data.link.live} text="Website" />
								)}
								{data.link?.demo && (
									<UrlHtml link={data.link.demo} text="Demo Video" />
								)}
								{data.link?.repo && (
									<UrlHtml link={data.link.repo} text="Repo" />
								)}
								<p>|</p>
								{data.keywords?.map((keyword, i) => (
									<p key={i}>
										{keyword}
										{data.keywords && i !== data.keywords.length - 1 && ", "}
									</p>
								))}
							</div>
							<p>
								{formatDate(data.startDate)} -{" "}
								{data.current
									? "Present"
									: data.endDate
										? formatDate(data.endDate)
										: ""}
							</p>
						</div>

						<div className="px-2 ">
							{data.description &&
								data.description.map((sentence, i) => {
									if (sentence.trim()) {
										return (
											<div key={i} className="flex gap-1.5">
												<a>●</a>
												<p
													dangerouslySetInnerHTML={{
														__html: sentence.trim(),
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

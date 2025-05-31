import { Project } from "@/types/types";
import { formatDate, SectionHeader } from "./components";

export default function ResumeProject({
  project,
}: {
  project: Project[] | undefined;
}) {
  return (
    <div>
      <SectionHeader title="Projects" />
      <div className="space-y-2">
        {project?.map((data, index) => (
          <div key={index}>
            <div className="flex justify-between items-start">
              <a
                href={data.repoLink ? data.repoLink : data.liveDemoLink}
                className="font-semibold"
              >
                {data.title}
              </a>
              <p>
                {formatDate(data.startDate)} - {formatDate(data.endDate)}
              </p>
            </div>

            <div>
              {data.achievements &&
                data.achievements.map((sentence, i) => {
                  if (sentence.trim()) {
                    return (
                      <div key={i} className="flex gap-1">
                        <a>▪</a>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `${sentence.trim()}`,
                          }}
                        ></p>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>

            {data.technologies && data.technologies.length > 0 && (
              <div className="flex gap-1">
                <a>▪</a>
                <p>
                  <span>Tech Stack:</span> {data.technologies.join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <div className="flex justify-between items-start font-semibold">
              <p>{data.title}</p>
              <p>
                {formatDate(data.startDate)} -{" "}
                {data.current
                  ? "Present"
                  : data.endDate
                    ? formatDate(data.endDate)
                    : ""}
              </p>
            </div>

            <div>
              {data.description &&
                data.description.map((sentence, i) => {
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
                  <span className="font-semibold">Tech Stack:</span>{" "}
                  {data.technologies.join(", ")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

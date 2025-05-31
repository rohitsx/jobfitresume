import { WorkExperience } from "@/types/types";
import { formatDate, SectionHeader } from "./components";

export default function Experience({
  experience,
}: {
  experience: WorkExperience[] | undefined;
}) {
  return (
    <div>
      <SectionHeader title="Experience" />
      <div className="space-y-2">
        {experience?.map((data, index) => (
          <div key={index}>
            <div className="flex justify-between items-start ">
              <div>
                <a
                  href={data.workLink || ""}
                  target="_blank"
                  className="font-semibold"
                >
                  {data.companyName}
                </a>
                <p className=" italic">{data.WorkStyle}</p>
              </div>
              <div className="text-right">
                <p>
                  {formatDate(data.startDate)} -{" "}
                  {data.current
                    ? "Present"
                    : data.endDate
                      ? formatDate(data.endDate)
                      : ""}
                </p>
                {data.location && <p>{data.location}</p>}
              </div>
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

              {data.technologies && data.technologies.length > 0 && (
                <div className="flex gap-1">
                  <a>▪</a>
                  <p>
                    <span>Tech Stack:</span> {data.technologies.join(", ")}
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

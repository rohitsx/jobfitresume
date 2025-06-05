import { WorkExperience } from "@/types/types";

export default function WorkExperienceView({
  data,
}: {
  data: WorkExperience[];
}) {
  console.log(data);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Work Experience</h2>
      {data &&
        data.map((job, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between">
              <h3 className="font-medium">{job.jobTitle}</h3>
              <span>
                {job.startDate} - {job.current ? "Present" : job.endDate}
              </span>
            </div>
            <p>
              {job.companyName} {job.location && ` • ${job.location}`}
            </p>
            <p className="text-sm text-gray-500">
              {job.workStyle}
              {job.roleLevel && ` • ${job.roleLevel}`}
            </p>

            {job.description.map((desc: string, i: number) => (
              <div key={i}>
                <p>• {desc}</p>
              </div>
            ))}

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
          </div>
        ))}
    </div>
  );
}

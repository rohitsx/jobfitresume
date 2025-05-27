import { Education } from "@/types/types";

export default function EducationView({ data }: { data: Education[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education</h2>
      {data.map((edu, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0">
          <div className="flex justify-between">
            <h3 className="font-medium">
              {edu.degree} in {edu.major}
            </h3>
            <span>
              {edu.startDate && `${edu.startDate} - `}
              {edu.completed
                ? edu.graduationDate || edu.endDate
                : "In Progress"}
            </span>
          </div>
          <p>
            {edu.university} • {edu.location}
          </p>
          {edu.institutionType && (
            <p className="text-sm text-gray-500">{edu.institutionType}</p>
          )}

          {edu.gpa && <p className="mt-1">GPA: {edu.gpa}</p>}
          {edu.keyLearnings && edu.keyLearnings.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Key Learnings:</p>
              <ul className="list-disc pl-5 mt-1">
                {edu.keyLearnings.map((learning: string, i: number) => (
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

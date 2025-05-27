import { WorkExperience } from "@/types/types";

type WorkExperienceValue = string | boolean | string[] | number;

export default function WorkExperienceForm({
  data,
  onChange,
}: {
  data: WorkExperience[];
  onChange: (index: number, field: string, value: WorkExperienceValue) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Work Experience</h2>

      {data.map((job, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          <h3 className="font-medium mb-2">Job #{index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={job.jobTitle || ""}
                onChange={(e) => onChange(index, "jobTitle", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={job.companyName || ""}
                onChange={(e) => onChange(index, "companyName", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={job.location || ""}
                onChange={(e) => onChange(index, "location", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Style
              </label>
              <select
                value={job.WorkStyle || ""}
                onChange={(e) => onChange(index, "WorkStyle", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Internship">Internship</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Link
              </label>
              <input
                type="url"
                value={job.workLink || ""}
                onChange={(e) => onChange(index, "workLink", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="https://example.com"
              />
            </div>

            <div className="flex gap-4 w-full">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={job.startDate || ""}
                  onChange={(e) => onChange(index, "startDate", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              {!job.current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={job.endDate || ""}
                    onChange={(e) => onChange(index, "endDate", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              )}

              <div className="flex items-center">
                <div className="flex items-center h-5 mt-5">
                  <input
                    type="checkbox"
                    checked={job.current || false}
                    onChange={(e) =>
                      onChange(index, "current", e.target.checked)
                    }
                    className="h-4 w-4 border-gray-300 rounded text-blue-600"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Current Job
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role Level
              </label>
              <select
                value={job.roleLevel || ""}
                onChange={(e) => onChange(index, "roleLevel", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={job.description || ""}
              onChange={(e) => onChange(index, "description", e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={(job.technologies || []).join(", ")}
              onChange={(e) => {
                const techs = e.target.value
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter(Boolean);
                onChange(index, "technologies", techs);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => {
          const newJobs = [
            ...data,
            {
              jobTitle: "",
              companyName: "",
              WorkStyle: "Full-time" as const,
              startDate: "",
              current: false,
              description: "",
              technologies: [],
              achievements: [],
            },
          ];
          onChange(newJobs.length - 1, "", "");
        }}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Job
      </button>
    </div>
  );
}

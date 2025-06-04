import { WorkExperience } from "@/types/types";
import React, { useState, useEffect } from "react"; // Import useState and useEffect

type WorkExperienceValue = string | boolean | string[] | WorkExperience;

export default function WorkExperienceForm({
  data,
  onChange,
}: {
  data: WorkExperience[];
  onChange: (
    index: number,
    field: keyof WorkExperience | "ADD_NEW" | "REMOVE_JOB",
    value: WorkExperienceValue,
  ) => void;
}) {
  // Local state to manage the raw string value of the technologies input for each job
  // This will be an object where keys are indices and values are the raw string inputs
  const [techInputValues, setTechInputValues] = useState<{
    [key: number]: string;
  }>({});

  // Initialize local state when data changes or component mounts
  useEffect(() => {
    const initialTechValues: { [key: number]: string } = {};
    data.forEach((job, index) => {
      initialTechValues[index] = (job.technologies || []).join(", ");
    });
    setTechInputValues(initialTechValues);
  }, [data]); // Re-run if 'data' prop changes

  const handleAddJob = () => {
    const newJobDefault: WorkExperience = {
      jobTitle: "",
      companyName: "",
      location: "",
      workStyle: "Full-time",
      startDate: "",
      current: false,
      description: [],
      technologies: [],
      roleLevel: "Junior",
    };
    onChange(data.length, "ADD_NEW", newJobDefault);

    // Also update local state for the new job
    setTechInputValues((prev) => ({
      ...prev,
      [data.length]: "", // Initialize the new job's tech input to empty string
    }));
  };

  const handleRemoveJob = (indexToRemove: number) => {
    onChange(indexToRemove, "REMOVE_JOB", "" as WorkExperienceValue);
    // Clean up local state for the removed job
    setTechInputValues((prev) => {
      const newValues = { ...prev };
      delete newValues[indexToRemove];
      return newValues;
    });
  };

  // Handler for local input change (allows typing commas and spaces)
  const handleLocalTechInputChange = (index: number, value: string) => {
    setTechInputValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // Handler to update parent state when input loses focus
  const handleTechInputBlur = (index: number) => {
    const rawValue = techInputValues[index];
    const techs = rawValue
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean); // Only filter when converting to array for parent
    onChange(index, "technologies", techs);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Work Experience</h2>
      {data.map((job, index) => (
        <div key={index} className="border p-4 rounded mb-4 shadow">
          <h3 className="font-medium mb-2 text-lg">Job #{index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={job.jobTitle ?? ""}
                onChange={(e) => onChange(index, "jobTitle", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={job.companyName ?? ""}
                onChange={(e) => onChange(index, "companyName", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={job.location ?? ""}
                onChange={(e) => onChange(index, "location", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Work Style
              </label>
              <select
                value={job.workStyle ?? ""}
                onChange={(e) => onChange(index, "workStyle", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={job.startDate ?? ""}
                  onChange={(e) => onChange(index, "startDate", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {!job.current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={job.endDate ?? ""}
                    onChange={(e) => onChange(index, "endDate", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}

              <div className="flex items-center h-full pb-2">
                <input
                  id={`current-${index}`}
                  type="checkbox"
                  checked={job.current ?? false}
                  onChange={(e) => onChange(index, "current", e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor={`current-${index}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Current Job
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Role Level
              </label>
              <select
                value={job.roleLevel ?? ""}
                onChange={(e) => onChange(index, "roleLevel", e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Founder">Founder</option>
                <option value="CTO">CTO</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Responsibilities/Achievements)
            </label>
            {(job.description || []).map((descItem, descIndex) => (
              <div key={descIndex} className="flex items-start space-x-2 mb-2">
                <textarea
                  value={descItem ?? ""}
                  onChange={(e) => {
                    const newDescriptions = [...(job.description || [])];
                    newDescriptions[descIndex] = e.target.value;
                    onChange(index, "description", newDescriptions);
                  }}
                  rows={2}
                  className="flex-grow mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Point ${descIndex + 1}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newDescriptions = (job.description || []).filter(
                      (_, i) => i !== descIndex,
                    );
                    onChange(index, "description", newDescriptions);
                  }}
                  className="mt-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newDescriptions = [...(job.description || []), ""];
                onChange(index, "description", newDescriptions);
              }}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Add Description Point
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={techInputValues[index] ?? ""} // Use local state for value
              onChange={(e) =>
                handleLocalTechInputChange(index, e.target.value)
              } // Update local state
              onBlur={() => handleTechInputBlur(index)} // Process and update parent on blur
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => handleRemoveJob(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Remove Job
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddJob}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add Job
      </button>
    </div>
  );
}

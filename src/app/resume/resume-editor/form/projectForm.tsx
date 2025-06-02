"use client";

import { Project } from "@/types/types";
import React, { useState, useEffect, useMemo } from "react";

type ProjectFormValue =
  | string
  | boolean
  | string[]
  | Project
  | { repo?: string; live?: string; demo?: string };

export default function ProjectsForm({
  data,
  onChange,
}: {
  data: Project[] | undefined;
  onChange: (
    index: number,
    field: keyof Project | "ADD_NEW" | "REMOVE_PROJECT",
    value: ProjectFormValue,
  ) => void;
}) {
  const projects = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  // Local state to manage the raw string value for the technologies input
  const [techInputValues, setTechInputValues] = useState<{
    [key: number]: string;
  }>({});

  // Initialize local state when data changes or component mounts
  useEffect(() => {
    const initialTechValues: { [key: number]: string } = {};
    projects.forEach((project, index) => {
      initialTechValues[index] = (project.technologies || []).join(", ");
    });
    setTechInputValues(initialTechValues);
  }, [projects]); // Depend on 'projects' (derived from data)

  // Function to add a new empty project
  const handleAddProject = () => {
    const newProject: Project = {
      title: "",
      startDate: "",
      current: false,
      description: [], // Explicitly an array
      technologies: [], // Explicitly an array
      link: {
        // Initialize link object, even if optional, to prevent undefined access
        repo: "",
        live: "",
        demo: "",
      },
      type: "Personal", // Set a default type
    };

    onChange(projects.length, "ADD_NEW", newProject); // Signal to parent to add new project

    // Also update local state for the new project's technologies input
    setTechInputValues((prev) => ({
      ...prev,
      [projects.length]: "", // Initialize the new job's tech input to empty string
    }));
  };

  // Function to delete a project
  const handleDeleteProject = (index: number) => {
    onChange(index, "REMOVE_PROJECT", ""); // Signal to parent to delete project

    // Clean up local state for the removed project
    setTechInputValues((prev) => {
      const newValues = { ...prev };
      delete newValues[index];
      return newValues;
    });
  };

  // --- Handlers for Technologies Input ---
  const handleLocalTechInputChange = (index: number, value: string) => {
    setTechInputValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleTechInputBlur = (index: number) => {
    const rawValue = techInputValues[index] ?? "";
    const techs = rawValue
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean); // Filter empty strings after trimming
    onChange(index, "technologies", techs);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Edit Projects</h2>
        <button
          type="button"
          onClick={handleAddProject}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          + Add Project
        </button>
      </div>

      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="border p-4 rounded mb-4 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Project #{index + 1}</h3>
              <button
                type="button"
                onClick={() => handleDeleteProject(index)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title ?? ""}
                  onChange={(e) => onChange(index, "title", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={project.type ?? ""}
                  onChange={(e) => onChange(index, "type", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Type</option>
                  <option value="Personal">Personal</option>
                  <option value="Academic">Academic</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Hackathon">Hackathon</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={project.startDate ?? ""}
                  onChange={(e) => onChange(index, "startDate", e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              {/* Conditionally render End Date if not current */}
              {!project.current ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={project.endDate ?? ""}
                    onChange={(e) => onChange(index, "endDate", e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ) : (
                <div /> /* Placeholder to maintain grid structure */
              )}
            </div>
            {/* Current Checkbox */}
            <div className="flex items-center mb-4">
              <input
                id={`project-current-${index}`}
                type="checkbox"
                checked={project.current ?? false}
                onChange={(e) => onChange(index, "current", e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`project-current-${index}`}
                className="ml-2 block text-sm text-gray-700"
              >
                Current Project
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Responsibilities/Achievements)
              </label>
              {(project.description || []).map((descItem, descIndex) => (
                <div
                  key={descIndex}
                  className="flex items-start space-x-2 mb-2"
                >
                  <textarea
                    value={descItem ?? ""}
                    onChange={(e) => {
                      const newDescriptions = [...(project.description || [])];
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
                      const newDescriptions = (
                        project.description || []
                      ).filter((_, i) => i !== descIndex);
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
                  const newDescriptions = [...(project.description || []), ""];
                  onChange(index, "description", newDescriptions);
                }}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Add Description Point
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={techInputValues[index] ?? ""}
                onChange={(e) =>
                  handleLocalTechInputChange(index, e.target.value)
                }
                onBlur={() => handleTechInputBlur(index)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="React, TypeScript, Tailwind CSS"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Repository Link
                </label>
                <input
                  type="text"
                  value={project.link?.repo ?? ""} // Accessing nested link.repo
                  onChange={(e) =>
                    onChange(index, "link", {
                      ...project.link,
                      repo: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://github.com/username/repo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Live Demo Link
                </label>
                <input
                  type="text"
                  value={project.link?.live ?? ""} // Accessing nested link.live
                  onChange={(e) =>
                    onChange(index, "link", {
                      ...project.link,
                      live: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Demo Video Link
                </label>
                <input
                  type="text"
                  value={project.link?.demo ?? ""}
                  onChange={(e) =>
                    onChange(index, "link", {
                      ...project.link,
                      demo: e.target.value,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No projects yet. Click the Add Project button to create one.
          </p>
        </div>
      )}
    </div>
  );
}

import { Project } from "@/types/types";

export default function ProjectsView({
  data,
}: {
  data: Project[] | undefined;
}) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No projects found. Click the &quot;Edit&quot; button to add your
            projects.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Projects</h2>
      {data.map((project, index) => (
        <div key={index} className="border-b pb-4 last:border-b-0">
          <div className="flex justify-between items-baseline">
            {" "}
            {/* Added items-baseline for better alignment */}
            <h3 className="font-medium text-lg">{project.title}</h3>{" "}
            {/* Made title slightly larger */}
            <span className="text-sm text-gray-600">
              {project.startDate} -{" "}
              {project.current ? "Present" : project.endDate || "N/A"}{" "}
              {/* Handle 'current' and fallback for endDate */}
            </span>
          </div>
          {project.type && ( // Only display type if it exists. Role/teamSize are removed.
            <p className="text-sm text-gray-500">{project.type} Project</p>
          )}
          {project.description &&
            project.description.length > 0 && ( // Ensure description is an array and not empty
              <ul className="list-disc pl-5 mt-2 text-gray-700">
                {" "}
                {/* Using ul for description points */}
                {project.description.map((descItem: string, i: number) => (
                  <li key={i}>{descItem}</li>
                ))}
              </ul>
            )}
          {/* Outcome is removed as per the new Project interface */}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-gray-700">Technologies:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.technologies.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-2 flex gap-4">
            {project.link?.repo && ( // Accessing nested link.repo
              <a
                href={project.link.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Repository
              </a>
            )}
            {project.link?.demo && ( // Accessing nested link.demo
              <a
                href={project.link.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Video Demo
              </a>
            )}

            {project.link?.live && ( // Accessing nested link.demo
              <a
                href={project.link.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm"
              >
                Video Demo
              </a>
            )}
          </div>
          {/* Key Learnings is removed as per the new Project interface */}
        </div>
      ))}
    </div>
  );
}

import { Project } from "@/types/types";

export default function ProjectsForm({
	data,
	onChange,
}: {
	data: Project[] | undefined;
	onChange: (
		index: number,
		field: string,
		value: string | number | string[] | Project,
	) => void;
}) {
	// Initialize data as empty array if undefined
	const projects = Array.isArray(data) ? data : [];

	// Function to add a new empty project
	const handleAddProject = () => {
		const newProject: Project = {
			title: "New Project",
			type: "Personal",
			startDate: "",
			endDate: "",
			role: "",
			teamSize: 1,
			description: "",
			outcome: "",
			technologies: [],
			repoLink: "",
			liveDemoLink: "",
			keyLearnings: [],
		};

		onChange(projects.length, "new", newProject);
	};

	// Function to delete a project
	const handleDeleteProject = (index: number) => {
		onChange(index, "delete", "");
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
					<div key={index} className="border p-4 rounded mb-4">
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
									value={project.title || ""}
									onChange={(e) => onChange(index, "title", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Type
								</label>
								<select
									value={project.type || ""}
									onChange={(e) => onChange(index, "type", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								>
									<option value="">Select Type</option>
									<option value="Personal">Personal</option>
									<option value="Academic">Academic</option>
									<option value="Freelance">Freelance</option>
									<option value="Hackathon">Hackathon</option>
									<option value="Client">Client</option>
								</select>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Start Date
								</label>
								<input
									type="text"
									value={project.startDate || ""}
									onChange={(e) => onChange(index, "startDate", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									placeholder="MM/YYYY"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									End Date
								</label>
								<input
									type="text"
									value={project.endDate || ""}
									onChange={(e) => onChange(index, "endDate", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									placeholder="MM/YYYY or Present"
								/>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Role
								</label>
								<input
									type="text"
									value={project.role || ""}
									onChange={(e) => onChange(index, "role", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Team Size
								</label>
								<input
									type="number"
									value={project.teamSize || ""}
									onChange={(e) =>
										onChange(index, "teamSize", parseInt(e.target.value) || 1)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									min="1"
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Description
							</label>
							<textarea
								value={project.description || ""}
								onChange={(e) => onChange(index, "description", e.target.value)}
								rows={3}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Outcome
							</label>
							<textarea
								value={project.outcome || ""}
								onChange={(e) => onChange(index, "outcome", e.target.value)}
								rows={2}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Technologies (comma-separated)
							</label>
							<input
								type="text"
								value={(project.technologies || []).join(", ")}
								onChange={(e) => {
									const techArray = e.target.value
										.split(",")
										.map((tech) => tech.trim())
										.filter((tech) => tech !== "");
									onChange(index, "technologies", techArray);
								}}
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
									value={project.repoLink || ""}
									onChange={(e) => onChange(index, "repoLink", e.target.value)}
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
									value={project.liveDemoLink || ""}
									onChange={(e) =>
										onChange(index, "liveDemoLink", e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
									placeholder="https://example.com"
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Key Learnings (one per line)
							</label>
							<textarea
								value={(project.keyLearnings || []).join("\n")}
								onChange={(e) => {
									const learningsArray = e.target.value
										.split("\n")
										.map((learning) => learning.trim())
										.filter((learning) => learning !== "");
									onChange(index, "keyLearnings", learningsArray);
								}}
								rows={3}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								placeholder="Learned about state management in React&#10;Improved TypeScript skills&#10;Mastered responsive design principles"
							/>
						</div>
					</div>
				))
			) : (
				<div className="text-center py-8 bg-gray-50 rounded-lg">
					<p className="text-gray-500">
						No projects yet. Click the &quot;Add Project&quot; button to create
						one.
					</p>
				</div>
			)}
		</div>
	);
}

import { Education } from "@/types/types";

export default function EducationForm({
	data,
	onChange,
}: {
	data: Education[];
	onChange: (
		index: number,
		field: string,
		value: string | boolean | string[],
	) => void;
}) {
	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold">Edit Education</h2>

			{data.map((edu, index) => (
				<div key={index} className="border p-4 rounded mb-4">
					<h3 className="font-medium mb-2">Education #{index + 1}</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Degree
							</label>
							<input
								type="text"
								value={edu.degree || ""}
								onChange={(e) => onChange(index, "degree", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Major
							</label>
							<input
								type="text"
								value={edu.major || ""}
								onChange={(e) => onChange(index, "major", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								University/Institution
							</label>
							<input
								type="text"
								value={edu.university || ""}
								onChange={(e) => onChange(index, "university", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Location
							</label>
							<input
								type="text"
								value={edu.location || ""}
								onChange={(e) => onChange(index, "location", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Institution Type
							</label>
							<select
								value={edu.institutionType || ""}
								onChange={(e) =>
									onChange(index, "institutionType", e.target.value)
								}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							>
								<option value="">Select Type</option>
								<option value="University">University</option>
								<option value="College">College</option>
								<option value="Bootcamp">Bootcamp</option>
								<option value="Online Course">Online Course</option>
								<option value="Certification Program">
									Certification Program
								</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Start Date
							</label>
							<input
								type="date"
								value={edu.startDate || ""}
								onChange={(e) => onChange(index, "startDate", e.target.value)}
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div className="flex items-center">
							<div className="flex items-center h-5 mt-5">
								<input
									type="checkbox"
									checked={edu.completed || false}
									onChange={(e) =>
										onChange(index, "completed", e.target.checked)
									}
									className="h-4 w-4 border-gray-300 rounded text-blue-600"
								/>
								<label className="ml-2 block text-sm text-gray-700">
									Completed
								</label>
							</div>
						</div>

						{edu.completed ? (
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Graduation Date
								</label>
								<input
									type="date"
									value={edu.graduationDate || ""}
									onChange={(e) =>
										onChange(index, "graduationDate", e.target.value)
									}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>
						) : (
							<div>
								<label className="block text-sm font-medium text-gray-700">
									End Date (Expected)
								</label>
								<input
									type="date"
									value={edu.endDate || ""}
									onChange={(e) => onChange(index, "endDate", e.target.value)}
									className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
								/>
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700">
								GPA
							</label>
							<input
								type="text"
								value={edu.gpa || ""}
								onChange={(e) => onChange(index, "gpa", e.target.value)}
								placeholder="e.g., 3.8/4.0"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Honors
							</label>
							<input
								type="text"
								value={edu.honors || ""}
								onChange={(e) => onChange(index, "honors", e.target.value)}
								placeholder="e.g., Cum Laude, Dean's List"
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Relevant Courses (comma separated)
						</label>
						<input
							type="text"
							value={(edu.relevantCourses || []).join(", ")}
							onChange={(e) => {
								const courses = e.target.value
									.split(",")
									.map((course) => course.trim())
									.filter(Boolean);
								onChange(index, "relevantCourses", courses);
							}}
							placeholder="e.g., Data Structures, Algorithms, Web Development"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Key Learnings (each on a new line)
						</label>
						<textarea
							value={(edu.keyLearnings || []).join("\n")}
							onChange={(e) => {
								const learnings = e.target.value
									.split("\n")
									.map((l) => l.trim())
									.filter(Boolean);
								onChange(index, "keyLearnings", learnings);
							}}
							rows={3}
							placeholder="What were your main takeaways from this education?"
							className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
						/>
					</div>
				</div>
			))}

			<button
				type="button"
				onClick={() => {
					const newEducation: Education[] = [
						...data,
						{
							degree: "",
							major: "",
							university: "",
							completed: false,
							relevantCourses: [],
							keyLearnings: [],
						},
					];
					onChange(newEducation.length - 1, "", ""); // Trigger update with empty values
				}}
				className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
			>
				Add Education
			</button>
		</div>
	);
}

import { UserDetails } from "@/types/types";

export default function UserDetailsForm({
  data,
  onChange,
}: {
  data: UserDetails;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Edit Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            value={data.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Title
          </label>
          <input
            type="text"
            value={data.currentTitle || ""}
            onChange={(e) => onChange("currentTitle", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            value={data.country || ""}
            onChange={(e) => onChange("country", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            value={data.state || ""}
            onChange={(e) => onChange("state", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Work Preference
          </label>
          <select
            value={data.workPreference || ""}
            onChange={(e) => onChange("workPreference", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Preference</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Summary
        </label>
        <textarea
          value={data.summary || ""}
          onChange={(e) => onChange("summary", e.target.value)}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            GitHub
          </label>
          <input
            type="text"
            value={data.github || ""}
            onChange={(e) => onChange("github", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="text"
            value={data.linkedin || ""}
            onChange={(e) => onChange("linkedin", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Twitter
          </label>
          <input
            type="text"
            value={data.twitter || ""}
            onChange={(e) => onChange("twitter", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="text"
            value={data.website || ""}
            onChange={(e) => onChange("website", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
    </div>
  );
}

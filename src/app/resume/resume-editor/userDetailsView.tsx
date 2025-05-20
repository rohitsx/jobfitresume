export default function UserDetailsView({ data }: { data: any }) {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold">{data.name}</h2>
			<p>{data.currentTitle}</p>
			<p>
				{data.email} • {data.phone}
			</p>
			<p>
				{data.city}, {data.state}, {data.country}
			</p>
			<p>Preferred Work Style: {data.workPreference}</p>

			{data.summary && (
				<div className="mt-4">
					<h3 className="font-medium">Summary</h3>
					<p className="mt-1">{data.summary}</p>
				</div>
			)}

			<div className="mt-4">
				<h3 className="font-medium">Links</h3>
				<div className="flex flex-wrap gap-4 mt-1">
					{data.github && <p>GitHub: {data.github}</p>}
					{data.linkedin && <p>LinkedIn: {data.linkedin}</p>}
					{data.twitter && <p>Twitter: {data.twitter}</p>}
					{data.website && <p>Website: {data.website}</p>}
				</div>
			</div>
		</div>
	);
}

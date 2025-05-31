import { SectionHeader } from "./components";

export default function Summary({ summary }: { summary: string | undefined }) {
	return (
		<div>
			<SectionHeader title="Summary" />
			<p>{summary}</p>
		</div>
	);
}

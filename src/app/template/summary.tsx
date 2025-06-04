import { SectionHeader } from "./components";

export default function Summary({ summary }: { summary: string | undefined }) {
  return (
    <div>
      <SectionHeader title="Summary" />
      <p dangerouslySetInnerHTML={{ __html: `${summary?.trim()}` }}></p>
    </div>
  );
}

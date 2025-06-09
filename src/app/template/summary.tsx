import { convertToStrong } from "@/lib/convertToStrong";
import { SectionHeader } from "./components";

export default function Summary({ summary }: { summary: string }) {
  return (
    <div>
      <SectionHeader title="Summary" />
      <p
        dangerouslySetInnerHTML={{
          __html: `${convertToStrong(summary.trim())}`,
        }}
      ></p>
    </div>
  );
}

import { Skill } from "@/types/types";
import { SectionHeader } from "./components";

export default function ResumeSkills({ skills }: { skills: Skill[] }) {
  const technicalSkills = skills
    .filter((skill) => skill.category === "Technical")
    .map((skill) => skill.name);

  const frontEndSkills = technicalSkills.filter((skill) =>
    [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Svelte",
      "WebRTC",
      "Vite",
    ].some((tech) => skill.includes(tech)),
  );

  const backEndSkills = technicalSkills.filter((skill) =>
    [
      "Deno",
      "Node.js",
      "Python",
      "Express",
      "FastAPI",
      "SQL",
      "NoSQL",
      "Redis",
      "Prisma",
    ].some((tech) => skill.includes(tech)),
  );

  const devOpsSkills = technicalSkills.filter((skill) =>
    ["Git", "GitHub", "Docker", "Nginx", "AWS", "Google Cloud"].some((tech) =>
      skill.includes(tech),
    ),
  );

  return (
    <div>
      <SectionHeader title="Skills" />
      <p>
        ‣ <span className="font-semibold">Front-end:</span>{" "}
        {frontEndSkills.join(", ")}
        {frontEndSkills.length
          ? ""
          : "TypeScript / JavaScript (React, Next.js)"}
      </p>
      <p>
        ‣ <span className="font-semibold">Back-end:</span>{" "}
        {backEndSkills.join(", ")}
        {backEndSkills.length ? "" : "Node.js, Python, SQL, NoSQL"}
      </p>
      <p>
        ‣ <span className="font-semibold">DevOps:</span>{" "}
        {devOpsSkills.join(", ")}
        {devOpsSkills.length ? "" : "Git, Docker, Cloud Services"}
      </p>
    </div>
  );
}

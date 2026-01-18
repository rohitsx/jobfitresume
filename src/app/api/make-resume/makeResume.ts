import { ai } from "@/lib/ai";

export async function makeResume(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  });

  if (!response.text) return "error parse resume";

  return JSON.parse(response.text);
}

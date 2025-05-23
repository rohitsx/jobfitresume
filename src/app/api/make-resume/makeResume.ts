import env from "@/lib/env";
import { GoogleGenAI } from "@google/genai";

export async function makeResume(contents: string) {
  const ai = new GoogleGenAI({
    apiKey: env.geminiApiKey,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents,
    config: {
      responseMimeType: "application/json",
    },
  });

  if (!response.text) return "error parse resume";

  return JSON.parse(response.text);
}

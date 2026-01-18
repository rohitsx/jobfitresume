import { geminiApiKey } from "@/lib/env";
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
});

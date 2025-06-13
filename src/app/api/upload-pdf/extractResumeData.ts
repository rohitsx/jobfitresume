import env from "@/lib/env";
import { GoogleGenAI } from "@google/genai";
import { json } from "stream/consumers";

export async function extractResumeData(text: string) {
	const ai = new GoogleGenAI({
		apiKey: env.geminiApiKey,
	});

	const response = await ai.models.generateContent({
		model: "gemini-1.5-flash-8b",
		contents: `Extract structured data from the following resume text and return it as JSON that matches this TypeScript interface:
export interface WorkExperience {
  companyName: string;
  jobTitle: string;
  location: string;
  workStyle:
    | "Freelance"
    | "Contract"
    | "Self-employed"
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Volunteer";
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies?: string[];
  roleLevel:
    | "Junior"
    | "Mid-level"
    | "Senior"
    | "Lead"
    | "Manager"
    | "Founder"
    | "CTO";
  link?: {
    repo?: string;
    live?: string;
    demo?: string;
  };
  keywords?: [string, string, string, string?];
}

export interface Education {
  degree: string;
  major: string;
  university: string;
  location?: string;
  institutionType?:
    | "University"
    | "College"
    | "Bootcamp"
    | "Online Course"
    | "Certification Program";
  startDate?: string;
  endDate?: string;
  graduationDate?: string;
  completed: boolean;
  gpa?: string | null;
}

export interface Project {
  title: string;
  description?: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  type?: "Personal" | "Academic" | "Freelance" | "Hackathon";
  technologies?: string[];
  link?: {
    repo?: string;
    live?: string;
    demo?: string;
  };
  keywords?: [string, string, string, string?];
}

export interface UserDetails {
  name: string;
  currentTitle?: string;
  summary?: string;
  email: string;
  country: string;
  workPreference?: "Remote" | "Hybrid" | "On-site";
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Skill {
  name: string;
  category?: string;
}

export interface ResumeData {
  userDetails: UserDetails;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

  Rules:
  1. Return only valid JSON that matches this structure
  2. Fill in as many fields as you can find in the text
  3. For missing optional fields, omit them from the JSON (don't include null/undefined values)
  4. For dates, use YYYY-MM-DD format when possible
  5. For boolean fields like 'current' or 'completed', set true/false based on the text
  6. For arrays, include all items you can find in the text

  Resume text:
  ${text}
  `,
		config: {
			responseMimeType: "application/json",
		},
	});

	if (!response.text) return "error parse resume";

	console.log(response.text);

	return JSON.parse(response.text);
}

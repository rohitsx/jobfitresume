import { GoogleGenAI } from "@google/genai";

export async function extractResumeData(text: string) {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});

	const response = await ai.models.generateContent({
		model: "gemini-1.5-flash-8b",
		contents: `Extract structured data from the following resume text and return it as JSON that matches this TypeScript interface:
  interface ResumeData {
    userDetails: {
      name: string;
      email: string;
      phone?: string;
      country: string;
      city?: string;
      state?: string;
      currentTitle?: string;
      summary?: string;
      workPreference?: "Remote" | "Hybrid" | "On-site";
      github?: string;
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
    workExperience: Array<{
      jobTitle: string;
      companyName: string;
      location?: string;
      WorkStyle: "Freelance" | "Contract" | "Self-employed" | "Full-time" | "Part-time" | "Internship" | "Volunteer";
      projectName?: string;
      workLink?: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description: string;
      technologies?: string[];
      achievements?: string[];
      industry?: string;
      teamSize?: number;
      roleLevel?: "Junior" | "Mid-level" | "Senior" | "Lead" | "Manager";
    }>;
    education: Array<{
      degree: string;
      major: string;
      university: string;
      location?: string;
      institutionType?: "University" | "College" | "Bootcamp" | "Online Course" | "Certification Program";
      startDate?: string;
      endDate?: string;
      graduationDate?: string;
      completed: boolean;
      gpa?: string | null;
      honors?: string;
      relevantCourses?: string[];
      keyLearnings?: string[];
    }>;
    projects: Array<{
      title: string;
      description: string;
      outcome: string;
      startDate: string;
      endDate: string;
      type?: "Personal" | "Academic" | "Freelance" | "Hackathon" | "Client";
      role?: string;
      technologies?: string[];
      teamSize?: number;
      repoLink?: string;
      liveDemoLink?: string;
      keyLearnings?: string[];
    }>;
    skills: Array<{
      name: string;
      category: "Technical" | "Soft Skill" | "Language" | "Other";
      proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
      yearsOfExperience?: number;
    }>;
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

	return JSON.parse(response.text);
}

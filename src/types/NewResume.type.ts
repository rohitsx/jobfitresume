export interface UserDetails {
  name: string;
  summary: string;
  email: string;
  number?: string;
  country: string;
  state: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

interface Section {
  sectionTitle: string;
  // e.g., Education, Experience, Projects, Hackathons & Competitions, Achievements, or any other valid category.

  lHeader: string;
  // Title of the job, project, or experience. Include keywords, if section blong if url present.
  // Examples:
  // "Junior Embedded Engineer | Python, Groq, OpenAI Whisper"
  // "Summer of Scribbling 2025 - 3rd Place Winner | B-Bot – Emotion-Aware AI Companion"
  // "AI Doctor | Python, Groq, OpenAI Whisper, Llama 3 Vision, Docker, Gradio, ElevenLabs"

  rHeader: string | [string, string][];
  // Can be a single string for date ranges (e.g., "Sept. 2024 – Feb. 2025") for experience,
  // or a list of labeled URLs for demos, GitHub, live links, etc for project and other section which which important to have url rather then dates.
  // Example: [["Demo", "videoUrl"], ["Live", "www.website.com"], ["GitHub", "repoUrl"]]

  lSubHeader?: string;
  // Optional. Includes company name or degree name.
  // e.g., "Bachelor of Technology in Computer Science Engineering", "XYZ Company"

  rSubHeader?: string;
  // Optional. Includes location if applicable.

  description?: string[];
  // Optional. Add a list of description points relevant to the section item.
}

interface Skill {
  name: string;
  category?: string;
  // Optional category to group skills (e.g., "Frontend", "Backend", "AI", etc.)
}

export interface NewResumeData {
  userDetails: UserDetails;

  section: {
    sectionTitle: string;
    // Title of the section (e.g., Education, Projects, Experience, Hackathons, etc.)

    sectionData: Section[];
    // Array of section items. Each item can represent a project, an experience,
    // a hackathon, an education entry, or any other relevant information.
  }[];

  skill: Skill[];
  // List of skills, optionally grouped by category.
}

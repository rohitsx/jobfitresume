type FourAchievements = [string, string, string, string];

export interface WorkExperience {
  jobTitle: string;
  companyName: string;
  location?: string;
  WorkStyle:
    | "Freelance"
    | "Contract"
    | "Self-employed"
    | "Full-time"
    | "Part-time"
    | "Internship"
    | "Volunteer";
  workLink?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: FourAchievements;
  technologies?: string[];
  roleLevel?: "Junior" | "Mid-level" | "Senior" | "Lead" | "Manager";
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
  keyLearnings?: string[];
}

export interface Project {
  title: string;
  description?: string;
  outcome?: string;
  startDate: string;
  endDate: string;
  type?: "Personal" | "Academic" | "Freelance" | "Hackathon" | "Client";
  role?: string;
  technologies?: string[];
  teamSize?: number;
  repoLink?: string;
  liveDemoLink?: string;
  keyLearnings?: string[];
  achievements?: FourAchievements;
}

export interface UserDetails {
  name: string;
  email: string;
  phone?: string;
  country: string;
  state?: string;
  currentTitle?: string;
  summary?: string;
  workPreference?: "Remote" | "Hybrid" | "On-site";
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Skill {
  name: string;
  category: "Technical" | "Soft Skill" | "Language" | "Other";
  proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  yearsOfExperience?: number;
}

export interface ResumeData {
  userDetails: UserDetails;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export type IconName =
  | "AI"
  | "TIME"
  | "STAR"
  | "EASY"
  | "UPLOAD"
  | "EDIT"
  | "PASTE"
  | "MAGIC";

export interface IconProps {
  name: IconName;
}

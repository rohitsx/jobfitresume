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

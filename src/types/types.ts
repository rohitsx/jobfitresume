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
  description: string[];
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
}

export interface UserDetails {
  country: string;
  name: string;
  email: string;
  currentTitle?: string;
  summary?: string;
  workPreference?: "Remote" | "Hybrid" | "On-site";
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface Skill {
  name: string;
  category: string;
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

export type EditableData =
  | UserDetails
  | WorkExperience[]
  | Education[]
  | Project[]
  | Skill[];

export type ChangeValue =
  | string
  | boolean
  | number
  | string[]
  | WorkExperience
  | Education
  | Project
  | Skill;

// export type ViewComponent =
//   | React.FC<{ data: UserDetails }>
//   | React.FC<{ data: WorkExperience[] }>
//   | React.FC<{ data: Education[] }>
//   | React.FC<{ data: Skill[] }>
//   | React.FC<{ data: Project[] }>;

export type ViewComponent<T = any> = React.FC<{ data: T }>;

export type FormComponent<T = any> = React.FC<{
  data: T;
  onChange: (...args: T[]) => void;
}>;

// UserDetails keys
export const userDetailsKeys = [
  "name",
  "currentTitle",
  "email",
  "country",
  "workPreference",
  "github",
  "linkedin",
  "website",
  "summary",
] as const;

// WorkExperience keys
export const workExperienceKeys = [
  "companyName",
  "jobTitle",
  "location",
  "workStyle",
  "startDate",
  "endDate",
  "current",
  "description",
  "technologies",
  "roleLevel",
  "link",
  "keywords",
] as const;

// Education keys
export const educationKeys = [
  "degree",
  "major",
  "university",
  "location",
  "institutionType",
  "startDate",
  "endDate",
  "graduationDate",
  "completed",
  "gpa",
] as const;

// Project keys
export const projectKeys = [
  "title",
  "description",
  "startDate",
  "endDate",
  "current",
  "type",
  "technologies",
  "link",
  "keywords",
] as const;

// Skill keys
export const skillKeys = ["name", "category"] as const;

// ResumeData keys
export const resumeDataKeys = [
  "userDetails",
  "workExperience",
  "education",
  "projects",
  "skills",
] as const;

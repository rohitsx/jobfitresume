type ThreeAchievements = [string, string, string];

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
	projectName?: string;
	workLink?: string;
	startDate: string;
	endDate?: string;
	current: boolean;
	description: string;
	technologies?: string[];
	achievements?: ThreeAchievements;
	industry?: string;
	teamSize?: number;
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
	honors?: string;
	relevantCourses?: string[];
	keyLearnings?: string[];
}

export interface Project {
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
}

export interface UserDetails {
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

import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			// You can extend your theme here if needed
			// e.g. custom colors, fonts
			colors: {
				sky: {
					// Example for sky color, Tailwind has it by default
					50: "#f0f9ff",
					100: "#e0f2fe",
					// ... add other shades if you use them and they aren't default
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
				},
				indigo: {
					// Example for indigo, Tailwind has it by default
					600: "#4f46e5",
				},
			},
		},
	},
	plugins: [],
};
export default config;

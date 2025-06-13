import { useEffect } from "react";

export const useScrollHash = () => {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const sections = document.querySelectorAll("section[id]");
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute("id");
						if (id) {
							history.replaceState(null, "", `#${id}`);
						}
					}
				});
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.5,
			},
		);

		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);
};

import React from "react";
import Link from "next/link";

export default function NavBar() {
	return (
		<nav className="mt-4 mb-16">
			<ul className="flex flex-row space-x-8">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/resume">Resume</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
				<li>
					<Link href="/login">Login</Link>
				</li>
			</ul>
		</nav>
	);
}

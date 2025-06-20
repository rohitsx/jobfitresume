"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { deleteAuthCookies } from "@/lib/authAction";

interface UserData {
	uid: string | undefined;
	email: string | undefined;
	displayName: string | undefined;
}

const MenuIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M4 6h16M4 12h16M4 18h16"
		/>
	</svg>
);

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M6 18L18 6M6 6l12 12"
		/>
	</svg>
);

export default function NavBar({ userData }: { userData: UserData }) {
	const [user] = useState<{
		uid: string;
		displayName: string;
		email: string;
	} | null>(() => {
		return userData.uid && userData.displayName && userData.email
			? {
				uid: userData.uid,
				displayName: userData.displayName,
				email: userData.email,
			}
			: null;
	});

	const [showUserMenu, setShowUserMenu] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const openUserMenu = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
		setShowUserMenu(true);
	};

	const closeUserMenuWithDelay = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		hoverTimeoutRef.current = setTimeout(() => {
			setShowUserMenu(false);
		}, 300); // Increased delay for better UX
	};

	const closeUserMenuImmediately = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
		setShowUserMenu(false);
	};

	const handleTriggerMouseEnter = () => {
		openUserMenu();
	};

	const handleDropdownMouseEnter = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	};

	const toggleUserMenuOnClick = () => {
		if (showUserMenu) {
			closeUserMenuImmediately();
		} else {
			openUserMenu();
		}
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target as Node)
			) {
				closeUserMenuImmediately();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			closeUserMenuImmediately();
			await deleteAuthCookies();
			localStorage.clear();
			window.location.replace("/");
		} catch (error) {
			console.error("Logout failed:", error);
			setIsLoggingOut(false);
		}
	};

	const closeMobileMenu = () => setIsMobileMenuOpen(false);

	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 print:hidden">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link
					href="/"
					onClick={closeMobileMenu}
					className="flex items-center gap-2"
				>
					<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
						JF
					</div>
					<span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
						JobFit Resume
					</span>
				</Link>

				{/* Desktop Navigation Links */}
				<div className="hidden md:flex items-center space-x-8">
					<Link
						href="/#how-it-works"
						className="text-gray-600 hover:text-indigo-600 transition-colors"
					>
						How It Works
					</Link>
					<Link
						href="/resume#job-description"
						className="text-gray-600 hover:text-indigo-600 transition-colors"
					>
						Resume
					</Link>
					<Link
						href="/beta"
						className="text-gray-600 hover:text-indigo-600 transition-colors"
					>
						Demo
					</Link>
				</div>

				{/* Login/Profile Section */}
				<div className="flex items-center space-x-4">
					{user ? (
						<div className="relative hidden md:block" ref={userMenuRef}>
							<button
								className="focus:outline-none"
								onClick={toggleUserMenuOnClick}
								onMouseEnter={handleTriggerMouseEnter}
								aria-haspopup="true"
								aria-expanded={showUserMenu}
								aria-controls="user-menu-dropdown"
								disabled={isLoggingOut}
							>
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow">
									{user.displayName?.[0]?.toUpperCase() || "U"}
								</div>
							</button>
							{showUserMenu && (
								<div
									id="user-menu-dropdown"
									className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-100"
									onMouseEnter={handleDropdownMouseEnter}
									onMouseLeave={closeUserMenuWithDelay}
								>
									<div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
										{user.email}
									</div>
									<button
										onClick={handleLogout}
										disabled={isLoggingOut}
										className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{isLoggingOut ? "Logging out..." : "Logout"}
									</button>
								</div>
							)}
						</div>
					) : (
						<Link
							href="/login"
							className="hidden md:inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
						>
							Get Started
						</Link>
					)}

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Toggle menu"
							aria-expanded={isMobileMenuOpen}
							className="text-gray-700 hover:text-indigo-600 focus:outline-none p-1 rounded-md hover:bg-gray-50"
						>
							{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu Dropdown */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-white/80 border-t border-gray-100 shadow-lg">
					<div className="container mx-auto px-6 py-4 space-y-4">
						<div className="flex flex-col space-y-3">
							<Link
								href="/#how-it-works"
								onClick={closeMobileMenu}
								className="text-gray-600 hover:text-indigo-600 transition-colors py-1"
							>
								How It Works
							</Link>
							{/* <Link */}
							{/* 	href="/#pricing" */}
							{/* 	onClick={closeMobileMenu} */}
							{/* 	className="text-gray-600 hover:text-indigo-600 transition-colors py-1" */}
							{/* > */}
							{/* 	Pricing */}
							{/* </Link> */}
							<Link
								href="/resume"
								onClick={closeMobileMenu}
								className="text-gray-600 hover:text-indigo-600 transition-colors py-1"
							>
								Resume
							</Link>
						</div>
						<hr className="border-gray-100" />
						{user ? (
							<div className="py-2">
								<div className="flex items-center space-x-3 mb-2">
									<div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
										{user.displayName?.[0]?.toUpperCase() || "U"}
									</div>
									<div>
										<div className="text-sm font-medium">
											{user.displayName}
										</div>
										<div className="text-xs text-gray-500">{user.email}</div>
									</div>
								</div>
								<button
									onClick={async () => {
										closeMobileMenu();
										await handleLogout();
									}}
									disabled={isLoggingOut}
									className="mt-2 w-full text-center py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{isLoggingOut ? "Logging out..." : "Logout"}
								</button>
							</div>
						) : (
							<div className="flex flex-col space-y-3 py-2">
								<Link
									href="/login"
									onClick={closeMobileMenu}
									className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg text-center"
								>
									Get Started
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}

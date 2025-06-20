import { cookies } from "next/headers";
import LoginBtn from "./loginBtn";

export default async function Login() {
	const handleAuth = async ({
		uid,
		email,
		displayName,
	}: {
		uid: string;
		email: string;
		displayName: string;
	}) => {
		"use server";

		const cookieStore = await cookies();

		cookieStore.set({
			name: "uid",
			value: uid,
		});

		cookieStore.set({
			name: "email",
			value: email || "email not found",
		});

		cookieStore.set({
			name: "displayName",
			value: displayName || "displayName not found",
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-12">
			<LoginBtn onLoginClickAction={handleAuth} />
		</div>
	);
}

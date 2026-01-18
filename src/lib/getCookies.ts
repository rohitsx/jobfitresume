import { cookies } from "next/headers";
export async function getCookies() {
	"use server";

	const cookieStore = await cookies();
	const uid = cookieStore.get("uid")?.value;
	const displayName = cookieStore.get("displayName")?.value;
	const email = cookieStore.get("email")?.value;

	return { uid, displayName, email };
}

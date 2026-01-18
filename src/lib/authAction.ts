"use server";

import { cookies } from "next/headers";

export async function deleteAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("uid");
  cookieStore.delete("displayName");
  cookieStore.delete("email");
}

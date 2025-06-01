import { cookies } from "next/headers";
import Menu from "./menu";
import { getDbRef } from "@/lib/dbRef";
import { get } from "firebase/database";
import AuthGaurd from "@/components/AuthGuard";
import { ResumeData } from "@/types/types";

export default async function ResumePage() {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) return <AuthGaurd />;

  const dbRef = getDbRef(uid);
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  const resumeData: ResumeData | undefined = data.resumeData;

  return <Menu uid={uid} resumeData={resumeData} />;
}

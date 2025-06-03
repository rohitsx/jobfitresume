import { cookies } from "next/headers";
import Menu from "./menu";
import AuthGaurd from "@/components/AuthGuard";

interface ResumePageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResumePage({ searchParams }: ResumePageProps) {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) return <AuthGaurd />;

  const resolvedSearchParams = await searchParams;
  const edit = resolvedSearchParams?.edit;

  return <Menu uid={uid} edit={edit === "true"} />;
}

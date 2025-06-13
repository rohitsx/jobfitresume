"use client";

import { useEffect } from "react";
import { useHashStore } from "@/store/store.hash";
import { JobDescription } from "./cvComponent/JobDescription";
import { CvEdit } from "./cvComponent/cvEdit/CvEdit";
import { UploadResume } from "./cvComponent/UploadResume";

const hashRoute: Record<string, string> = {
  "#job-description": "1",
  "#edit-resume": "2",
  "#experience": "2",
  "#projects": "2",
  "#education": "2",
  "#skills": "2",
  "#upload-resume": "3",
};

export default function Page() {
  const { hash, setHash, initializeHash } = useHashStore();

  useEffect(() => {
    initializeHash();
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="w-full bg-white border border-gray-200 lg:rounded-tl-2xl shadow-sm h-full min-h-screen overflow-auto">
      {hashRoute[hash] === "1" && <JobDescription />}
      {hashRoute[hash] === "2" && <CvEdit />}
      {hashRoute[hash] === "3" && <UploadResume />}
    </div>
  );
}

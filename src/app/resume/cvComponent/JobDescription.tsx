"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { FileText, Loader2Icon, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TierPopup } from "../cvUtil/TierPopup";
import { SnapSection } from "../cvUtil/SnapSection";
import { useErrorStore } from "@/store/store.error";

export const JobDescription = () => {
  const router = useRouter();
  const { resumeData, uid } = useResumeStore();
  const { setError } = useErrorStore();
  const [jd, setJd] = useState<string>("");
  const [tierPopup, setTierPopup] = useState(false);
  const [isCreatingResume, setIsCreatingResume] = useState(false);

  const handleClick = async () => {
    if (!jd.trim()) return setError("Please enter the job description first");

    if (!resumeData)
      return setError("Please add your resume before proceeding");

    setIsCreatingResume(true);
    localStorage.setItem(
      "jobDescription",
      JSON.stringify({ jobDescription: jd, resumeData, uid }),
    );

    router.push("/new-cv");
  };

  return (
    <>
      {tierPopup && <TierPopup open={tierPopup} setOpen={setTierPopup} />}
      <SnapSection Icon={FileText} value="Job Description" id="job-description">
        <div className="space-y-3">
          <h1 className="text-4xl text-black">Job Description</h1>
          <p>
            Copy the entire job posting including requirements, responsibilities
            and qualifications.
          </p>
        </div>
        <div className="text-center">
          <div className="h-80 xl:h-100 mt-16 space-y-10 justify-center px-4 lg:px-20 flex flex-col">
            <textarea
              onChange={(e) => setJd(e.target.value)}
              className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-auto h-full p-4 placeholder:text-gray-400"
              placeholder="Paste the complete job description here"
            />
            <button
              onClick={() => handleClick()}
              className={`border border-gray-200 rounded-xl w-3/4 text-white p-3 shadow-lg hover:shadow-xl transition mx-auto flex justify-center items-center gap-2 cursor-pointer duration-300 ease-in-out ${jd ? "bg-indigo-600 " : "bg-indigo-500"}`}
            >
              {isCreatingResume ? (
                <>
                  <Loader2Icon className="animate-spin size-5" />
                  Your Resume is on the Way...
                </>
              ) : (
                <>
                  <Zap className="size-5" />
                  Generate AI-Tailored resume
                </>
              )}
            </button>
          </div>
        </div>
      </SnapSection>
    </>
  );
};

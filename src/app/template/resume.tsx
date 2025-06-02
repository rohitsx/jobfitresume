"use client";

import { useEffect } from "react";
import { ResumeJsonStore } from "@/store/useGeneratedResumeStore";
import ResumeHeader from "./header";
import Summary from "./summary";
import { DowloadPdf, GreyLine } from "./components";
import Experience from "./experience";
import ResumeProject from "./project";
import ResumeSkills from "./skills";
import ResumeEducation from "./education";

export default function ResumeComponent() {
  const { resumeData, isLoading, fetchResumeData } = ResumeJsonStore();

  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading resume...
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex justify-center items-center h-screen ">
        No resume data found
      </div>
    );
  }

  const { userDetails, workExperience, education, projects, skills } =
    resumeData;
  return (
    <div className="max-w-4xl mx-auto  p-6  bg-white print:w-4xl print:p-0 print:m-0 ">
      <DowloadPdf username={userDetails.name} />
      <div className=" bg-white font-serif break-words p-6 px-8 text-sm space-y-4 text-gray-600   border border-gray-200 print:border-none print:w-[1120px] print:mt-6">
        <GreyLine>
          <ResumeHeader userDetails={userDetails} />
        </GreyLine>
        <GreyLine>
          <Summary summary={userDetails.summary} />
        </GreyLine>
        {workExperience.length > 0 && (
          <GreyLine>
            <Experience experience={workExperience} />
          </GreyLine>
        )}
        {projects.length > 0 && (
          <GreyLine>
            <ResumeProject project={projects} />
          </GreyLine>
        )}
        <GreyLine>
          <ResumeSkills skills={skills} />
        </GreyLine>
        <ResumeEducation education={education} />
      </div>
    </div>
  );
}

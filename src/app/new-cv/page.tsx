"use client";
import React, { useEffect, useState } from "react";
import { NewResumeData } from "@/types/NewResume.type";
import { DowloadPdf, GoBack } from "./newCv.components/NewCv.Components";
import NewCvHeader from "./newCv.components/NewCv.Header";
import { NewCvSection } from "./newCv.components/NewCv.Section";
import { NewCvSkills } from "./newCv.components/NewCv.Skills";

export default function Page() {
  const [newCv, setNewCv] = useState<NewResumeData>();

  useEffect(() => {
    const localData = localStorage.getItem("generatedResumeData");
    if (!localData) return;

    setNewCv(JSON.parse(localData).resume);
  }, []);

  if (!newCv) return;

  const { userDetails, section, skill } = newCv;
  console.log({ newCv });

  return (
    <div className="p-8 print:p-0">
      <div className="flex gap-2 justify-end">
        <GoBack />
        <DowloadPdf username={userDetails.name} />
      </div>
      <div className="w-4xl p-12 border rounded-2xl text-center bg-white space-y-3 shadow-sm print:shadow-none print:w-4xl print:border-none">
        <NewCvHeader userDetails={userDetails} />
        <NewCvSection section={section} />
        <NewCvSkills skill={skill} />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { NewResumeData } from "@/types/NewResume.type";
import {
  DowloadPdf,
  GoBack,
  RecreateResume,
} from "./newCv.components/NewCv.Components";
import NewCvHeader from "./newCv.components/NewCv.Header";
import { NewCvSection } from "./newCv.components/NewCv.Section";
import { NewCvSkills } from "./newCv.components/NewCv.Skills";
import { useErrorStore } from "@/store/store.error";
import { TierPopup } from "../resume/cvUtil/TierPopup";
import { ErrorAlert } from "@/components/ErrorAlert";
import { NewCvSkeleton } from "./newCv.components/NewCv.Skeleton";

export default function Page() {
  const [newCv, setNewCv] = useState<NewResumeData>();
  const [tierPopup, setTierPopup] = useState(false);
  const { setError, error } = useErrorStore();
  const [backUpJd, setBackUpJd] = useState<any>();

  useEffect(() => {
    const jobDescription = localStorage.getItem("jobDescription");
    const localData = localStorage.getItem("generatedResumeData");

    setBackUpJd(jobDescription);

    const CreateNewCv = async () => {
      try {
        const response = await fetch("/api/make-resume", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jobDescription,
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error === "Free tier limit reached") {
            setTierPopup(true);
            return;
          }
          setError("Failed to create resume. Please try again.");
          return;
        }

        localStorage.removeItem("generatedResumeData");
        localStorage.removeItem("jobDescription");
        localStorage.setItem("generatedResumeData", JSON.stringify(data));

        setNewCv(data.resume);
      } catch (err) {
        setError("server error please refresh the page and try again");

        console.log(err);
      }
    };

    if (!jobDescription && localData) {
      setError(
        "No job description found. Press 'Go Back' to create a new resume.",
      );

      setNewCv(JSON.parse(localData).resume);
    }
    if (!jobDescription && !localData) {
      setError("Error Proccesiing");
    } else CreateNewCv();
  }, []);

  const handleRecreate = () => {
    localStorage.setItem("jobDescription", backUpJd);
    window.location.reload();
  };

  return (
    <>
      {tierPopup && <TierPopup open={tierPopup} setOpen={setTierPopup} />}
      {!newCv ? (
        <>
          {error && <ErrorAlert err={error} />}
          <NewCvSkeleton />
        </>
      ) : (
        <div className="p-8 print:p-0">
          <div className="flex gap-2 justify-between">
            <GoBack />
            <RecreateResume handleOnClick={handleRecreate} />
            <DowloadPdf username={newCv.userDetails.name} />
          </div>
          {error && <ErrorAlert err={error} />}
          <div className="w-4xl p-12 border rounded-2xl text-center bg-white space-y-3 shadow-sm print:shadow-none print:w-4xl print:border-none">
            <NewCvHeader userDetails={newCv.userDetails} />
            <NewCvSection section={newCv.section} />
            <NewCvSkills skill={newCv.skill} />
          </div>
        </div>
      )}
    </>
  );
}

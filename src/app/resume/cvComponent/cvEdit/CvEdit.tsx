"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { useEffect } from "react";
import { SnapSection } from "../../cvUtil/SnapSection";
import { Pencil } from "lucide-react";
import { commonClass } from "./cvEdithelp/CommonUi";
import { UserDetailsForm } from "./cvEditComponet/userDetailsForm";
import { useHashStore } from "@/store/store.hash";
import { ExperienceForm } from "./cvEditComponet/experienceForm";
import { ProjectForm } from "./cvEditComponet/projectForm";
import { EducationForm } from "./cvEditComponet/educationForm";
import { SkillsForm } from "./cvEditComponet/skillsForm";
import { ActionBar } from "./cvEdithelp/ActionBar";
import { getDbRef } from "@/lib/dbRef";
import { update } from "firebase/database";

const heading: Record<string, string> = {
  "#edit-resume": "User",
  "#user": "User",
  "#experience": "Experience",
  "#projects": "Projects",
  "#education": "Education",
  "#skills": "Skills",
};

export const CvEdit = () => {
  const { hash } = useHashStore();
  const {
    resumeData,
    uid,
    draftData,
    startEditing,
    addWorkExperience,
    saveChanges,
    removeWorkExperience,
    addEducation,
    removeEducation,
    addProject,
    removeProject,
  } = useResumeStore();

  useEffect(() => {
    startEditing();
  }, [startEditing]);

  const dataForEditor = draftData || resumeData;
  const { removeBtnClass, addBtnClass, commonDivClass } = commonClass();

  if (!dataForEditor) {
    return (
      <div className="text-center p-8 text-lg ">Loading Resume Data...</div>
    );
  }

  const NoData = () => (
    <div className="text-center p-8 text-lg">No Data on {heading[hash]}</div>
  );

  const handleSaveChanges = async () => {
    if (!uid) throw new Error("User ID (uid) not found. Cannot save.");

    const dbRef = getDbRef(uid);
    await update(dbRef, { resumeData: draftData });
    saveChanges();
  };

  const hasChanges = draftData !== null;
  const { userDetails, education, workExperience, projects, skills } =
    dataForEditor;

  return (
    <SnapSection Icon={Pencil} value="Edit Resume" id="edit-resume">
      <h2 className="text-black text-2xl ">{heading[hash]}</h2>
      <div className="overflow-x-auto px-12 ">
        {heading[hash] === "User" && (
          <UserDetailsForm userDetails={userDetails} />
        )}
        {hash === "#experience" && workExperience && (
          <div>
            {workExperience ? (
              <div className="space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={`exp-${index}`} className={commonDivClass}>
                    <ExperienceForm experience={exp} index={index} />
                    <button
                      onClick={() => removeWorkExperience(index)}
                      className={removeBtnClass}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <NoData />
            )}
            <button onClick={addWorkExperience} className={addBtnClass}>
              + Add Work Experience
            </button>
          </div>
        )}
      </div>

      {hash === "#projects" && (
        <div>
          {projects ? (
            <div className="space-y-6">
              {projects.map((proj, index) => (
                <div key={`proj-${index}`} className={commonDivClass}>
                  <ProjectForm project={proj} index={index} />
                  <button
                    onClick={() => removeProject(index)}
                    className={removeBtnClass}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )}
          <button onClick={addProject} className={addBtnClass}>
            + Add Project
          </button>
        </div>
      )}

      {hash === "#education" && (
        <div>
          {education && (
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={`edu-${index}`} className={commonDivClass}>
                  <EducationForm education={edu} index={index} />
                  <button
                    onClick={() => removeEducation(index)}
                    className={removeBtnClass}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={addEducation} className={addBtnClass}>
            + Add Education
          </button>

          <SkillsForm
            key={draftData ? "draft-skills" : "saved-skills"}
            skills={skills}
          />
        </div>
      )}

      <ActionBar hasChanges={hasChanges} onSave={handleSaveChanges} />
    </SnapSection>
  );
};

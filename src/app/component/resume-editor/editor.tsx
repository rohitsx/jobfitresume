"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "../../lib/types";
import WorkExperienceView from "./workExperienceView";
import EducationView from "./educationView";
import ProjectsView from "./projectView";
import SkillsView from "./skillsView";
import UserDetailsForm from "./userDetailsForm";
import WorkExperienceForm from "./workExperienceForm";
import EducationForm from "./educationForm";
import SkillsForm from "./skillForm";
import UserDetailsView from "./userDetailsView";
import ProjectsForm from "./projectForm";

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTab, setActiveTab] = useState("userDetails");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("resumeData");
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    }
  }, []);

  const handleSave = () => {
    if (!editData || !resumeData) return;

    let updatedData: ResumeData;

    if (activeTab === "userDetails") {
      updatedData = { ...resumeData, userDetails: editData };
    } else if (activeTab === "workExperience" && Array.isArray(editData)) {
      updatedData = { ...resumeData, workExperience: editData };
    } else if (activeTab === "education" && Array.isArray(editData)) {
      updatedData = { ...resumeData, education: editData };
    } else if (activeTab === "projects" && Array.isArray(editData)) {
      updatedData = { ...resumeData, projects: editData };
    } else if (activeTab === "skills" && Array.isArray(editData)) {
      updatedData = { ...resumeData, skills: editData };
    } else {
      return;
    }

    // Save to localStorage
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
    setResumeData(updatedData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!resumeData) return;

    let dataToEdit;
    if (activeTab === "userDetails") {
      dataToEdit = resumeData.userDetails;
    } else {
      dataToEdit = resumeData[activeTab as keyof typeof resumeData];
    }

    setEditData(JSON.parse(JSON.stringify(dataToEdit)));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleChange = (
    value: any,
    section?: string,
    index?: number,
    field?: string,
  ) => {
    if (!editData) return;

    if (activeTab === "userDetails") {
      setEditData({ ...editData, [field as string]: value });
    } else if (Array.isArray(editData) && typeof index === "number" && field) {
      const newData = [...editData];
      newData[index] = { ...newData[index], [field]: value };
      setEditData(newData);
    }
  };

  const renderTab = () => {
    if (!resumeData || isEditing) return null;

    switch (activeTab) {
      case "userDetails":
        return <UserDetailsView data={resumeData.userDetails} />;
      case "workExperience":
        return <WorkExperienceView data={resumeData.workExperience} />;
      case "education":
        return <EducationView data={resumeData.education} />;
      case "projects":
        return <ProjectsView data={resumeData.projects} />;
      case "skills":
        return <SkillsView data={resumeData.skills} />;
      default:
        return null;
    }
  };

  const renderEditForm = () => {
    if (!isEditing || !editData) return null;

    switch (activeTab) {
      case "userDetails":
        return (
          <UserDetailsForm
            data={editData}
            onChange={(field, value) =>
              handleChange(value, undefined, undefined, field)
            }
          />
        );
      case "workExperience":
        return (
          <WorkExperienceForm
            data={editData}
            onChange={(index, field, value) =>
              handleChange(value, "workExperience", index, field)
            }
          />
        );
      case "education":
        return (
          <EducationForm
            data={editData}
            onChange={(index, field, value) =>
              handleChange(value, "education", index, field)
            }
          />
        );
      case "projects":
        return (
          <ProjectsForm
            data={editData}
            onChange={(index, field, value) =>
              handleChange(value, "projects", index, field)
            }
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={editData}
            onChange={(index, field, value) =>
              handleChange(value, "skills", index, field)
            }
          />
        );
      default:
        return null;
    }
  };

  if (!resumeData) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <p>No resume data found. Please upload a PDF first.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Resume Editor</h1>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        {[
          "userDetails",
          "workExperience",
          "education",
          "projects",
          "skills",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setIsEditing(false);
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Edit/Save/Cancel Buttons */}
      <div className="mb-6 flex space-x-2">
        {!isEditing ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        {isEditing ? renderEditForm() : renderTab()}
      </div>
    </div>
  );
}

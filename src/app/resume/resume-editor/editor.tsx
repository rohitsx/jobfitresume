"use client";

import { useState, useMemo, useCallback } from "react";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Lightbulb,
  Edit3,
  Save,
  X,
  AlertTriangle,
  FileText,
  LucideIcon,
} from "lucide-react";
import { update } from "firebase/database";

import WorkExperienceView from "./view/workExperienceView";
import EducationView from "./view/educationView";
import ProjectsView from "./view/projectView";
import SkillsView from "./view/skillsView";
import UserDetailsView from "./view/userDetailsView";
import UserDetailsForm from "./form/userDetailsForm";
import WorkExperienceForm from "./form/workExperienceForm";
import EducationForm from "./form/educationForm";
import ProjectsForm from "./form/projectForm";
import SkillsForm from "./form/skillForm";

import {
  ResumeData,
  UserDetails,
  WorkExperience,
  Education,
  Project,
  Skill,
  EditableData,
  ChangeValue,
  ViewComponent,
  FormComponent,
} from "@/types/types";
import { getDbRef } from "@/lib/dbRef";
import { useResumeStore } from "@/store/useResumeStore";

type TabKey =
  | "userDetails"
  | "workExperience"
  | "education"
  | "projects"
  | "skills";

interface TabConfig {
  label: string;
  icon: LucideIcon;
  dataKey: keyof ResumeData;
  ViewComponent: ViewComponent;
  FormComponent: FormComponent;
  isList: boolean;
}

const TAB_CONFIG: Record<TabKey, TabConfig> = {
  userDetails: {
    label: "Personal Details",
    icon: User,
    dataKey: "userDetails",
    ViewComponent: UserDetailsView,
    FormComponent: UserDetailsForm,
    isList: false,
  },
  workExperience: {
    label: "Work Experience",
    icon: Briefcase,
    dataKey: "workExperience",
    ViewComponent: WorkExperienceView,
    FormComponent: WorkExperienceForm,
    isList: true,
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    dataKey: "education",
    ViewComponent: EducationView,
    FormComponent: EducationForm,
    isList: true,
  },
  projects: {
    label: "Projects",
    icon: FolderOpen,
    dataKey: "projects",
    ViewComponent: ProjectsView,
    FormComponent: ProjectsForm,
    isList: true,
  },
  skills: {
    label: "Skills",
    icon: Lightbulb,
    dataKey: "skills",
    ViewComponent: SkillsView,
    FormComponent: SkillsForm,
    isList: true,
  },
};

const TAB_ORDER: TabKey[] = [
  "userDetails",
  "workExperience",
  "education",
  "projects",
  "skills",
];

export default function ResumeEditor() {
  const [activeTab, setActiveTab] = useState<TabKey>("userDetails");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<EditableData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { resumeData, uid, setResumeData } = useResumeStore();

  const currentTabConfig = useMemo(() => TAB_CONFIG[activeTab], [activeTab]);

  const handleSave = useCallback(async () => {
    if (!editData || !resumeData || !currentTabConfig) return;

    setIsSaving(true);
    try {
      if (!uid) throw new Error("User ID (uid) not found. Cannot save.");

      const updatedResumeData: ResumeData = {
        ...resumeData,
        [currentTabConfig.dataKey]: editData,
      };

      const dbRef = getDbRef(uid);
      await update(dbRef, { resumeData: updatedResumeData });

      setResumeData(updatedResumeData);
      setIsEditing(false);
      setEditData(null);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  }, [editData, resumeData, currentTabConfig, uid, setResumeData]);

  const handleEdit = useCallback(() => {
    if (!resumeData || !currentTabConfig) return;

    const dataToEdit = resumeData[currentTabConfig.dataKey];
    const clonedData = JSON.parse(
      JSON.stringify(dataToEdit || (currentTabConfig.isList ? [] : {})),
    );
    setEditData(clonedData as EditableData);
    setIsEditing(true);
  }, [resumeData, currentTabConfig]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditData(null);
  }, []);

  const handleChange = useCallback(
    (
      value: ChangeValue,
      _section?: string, // section is now implicitly activeTab, kept for signature compatibility if needed
      index?: number,
      field?: string,
    ) => {
      if (!editData || !currentTabConfig) return;

      if (
        currentTabConfig.isList &&
        Array.isArray(editData) &&
        typeof index === "number" &&
        field
      ) {
        const newList = [...editData] as (
          | WorkExperience
          | Education
          | Project
          | Skill
        )[];
        newList[index] = { ...newList[index], [field]: value };
        setEditData(newList as EditableData);
      } else if (
        !currentTabConfig.isList &&
        !Array.isArray(editData) &&
        field
      ) {
        setEditData({ ...editData, [field]: value } as UserDetails);
      }
    },
    [editData, currentTabConfig],
  );

  const renderContent = () => {
    if (!resumeData || !currentTabConfig) return null;

    if (isEditing && editData) {
      const FormComponent = currentTabConfig.FormComponent;
      const formOnChange = currentTabConfig.isList
        ? (index: number, field: string, value: ChangeValue) =>
            handleChange(value, activeTab, index, field)
        : (field: string, value: ChangeValue) =>
            handleChange(value, activeTab, undefined, field);

      return <FormComponent data={editData} onChange={formOnChange} />;
    }

    const ViewComponent = currentTabConfig.ViewComponent;
    const viewData = resumeData[currentTabConfig.dataKey];
    return <ViewComponent data={viewData} />;
  };

  if (!resumeData) {
    return (
      <div
        id="resume-editor"
        className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Resume Data Found
          </h3>
          <p className="text-gray-600">
            Please upload or create a resume to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="resume-editor" className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
          <p className="text-gray-600">Edit and manage your resume sections</p>
        </header>

        <nav className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {TAB_ORDER.map((tabKey) => {
              const tab = TAB_CONFIG[tabKey];
              const IconComponent = tab.icon;
              return (
                <button
                  key={tabKey}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tabKey
                      ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setActiveTab(tabKey);
                    setIsEditing(false); // Reset editing state when switching tabs
                    setEditData(null);
                  }}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  onClick={handleEdit}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Section
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Editing Mode
              </div>
            )}
          </div>
        </div>

        <main className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-96">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

"use client";
import { useCallback, useEffect, useState } from "react";
import PDFUploader from "./PDFUploader";
import HandleJd from "./handleJd";
import { FileText, Briefcase } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import ResumeEditor from "./resume-editor/editor";

import { getDbRef } from "@/lib/dbRef";
import { get } from "firebase/database";

export default function Menu({ uid, edit }: { uid: string; edit: boolean }) {
  const { setUid, setResumeData, resumeData } = useResumeStore();
  const [hasResumeData, setHasResumeData] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"resume" | "jd">(() =>
    edit ? "resume" : "jd",
  );

  useEffect(() => {
    setUid(uid);
    const getResumeData = async () => {
      const dbRef = getDbRef(uid);
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      setResumeData(data.resumeData);
    };

    getResumeData();
  }, []);

  useEffect(() => {
    if (resumeData) {
      console.log(resumeData);
      setResumeData(resumeData);
      setHasResumeData(true);
    }
  }, [resumeData]);

  const handleUploadSuccess = () => {
    setHasResumeData(true);
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-xl shadow-inner">
              <div className="flex space-x-1" role="group">
                <button
                  type="button"
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                    activeTab === "jd"
                      ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm"
                  }`}
                  onClick={() => setActiveTab("jd")}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Job Description
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                    activeTab === "resume"
                      ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm"
                  }`}
                  onClick={() => setActiveTab("resume")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Edit Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 flex-shrink-0 min-h-screen">
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            </div>
            <nav className="space-y-2">
              <button
                type="button"
                className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                  activeTab === "jd"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("jd")}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                Job Description
              </button>
              <button
                type="button"
                className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                  activeTab === "resume"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("resume")}
              >
                <FileText className="w-5 h-5 mr-3" />
                Edit Resume
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6">
          <div className="transition-all duration-300 ease-in-out mt-6 lg:mt-2">
            {activeTab === "resume" && (
              <div className="resume-section animate-fadeIn">
                <PDFUploader onUploadSuccess={handleUploadSuccess} />
                {hasResumeData && <ResumeEditor />}
              </div>
            )}
            {activeTab === "jd" && (
              <div className="jd-section animate-fadeIn">
                <HandleJd />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

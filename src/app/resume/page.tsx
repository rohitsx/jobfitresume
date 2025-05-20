"use client";
import { useEffect, useState } from "react";
import ResumeEditor from "./resume-editor/editor";
import PDFUploader from "./PDFUploader";
import HandleJd from "./handleJd";

export default function PDFUploadPage() {
  const [hasResumeData, setHasResumeData] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"resume" | "jd">("jd");

  useEffect(() => {
    const storedResumeData = localStorage.getItem("resumeData");
    setHasResumeData(!!storedResumeData);
  }, []);

  const handleUploadSuccess = () => {
    setHasResumeData(true);
  };

  if (hasResumeData === null) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-center  ">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              activeTab === "jd"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("jd")}
          >
            Job Description
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              activeTab === "resume"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("resume")}
          >
            Edit Resume
          </button>
        </div>
      </div>
      {/* Tab Content */}
      <div>
        {activeTab === "resume" && (
          <div className="resume-section">
            <PDFUploader onUploadSuccess={handleUploadSuccess} />
            {hasResumeData && <ResumeEditor />}
          </div>
        )}
        {activeTab === "jd" && (
          <div className="jd-section">
            <HandleJd />
          </div>
        )}
      </div>
    </div>
  );
}

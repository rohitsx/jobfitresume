import { getDbRef } from "@/lib/dbRef";
import { useResumeStore } from "@/store/useResumeStore";
import { update } from "firebase/database";
import { useState, useRef } from "react";

interface PDFUploaderProps {
  onUploadSuccess: () => void;
}

export default function PDFUploader({ onUploadSuccess }: PDFUploaderProps) {
  const { setResumeData, uid } = useResumeStore();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const res = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { resume: resumeData } = await res.json();

        if (!uid) throw new Error("No uid found");

        const dbRef = getDbRef(uid);
        update(dbRef, {
          resumeData,
        });

        console.log(resumeData);
        setResumeData(resumeData);

        alert("PDF uploaded and parsed successfully!");
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        onUploadSuccess();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Upload Resume</h2>
          <p className="text-sm text-gray-600">
            Upload your PDF resume to parse and extract information.
          </p>
        </div>
      </div>
      {/* --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* Changed to form and added onSubmit */}
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : selectedFile
                ? "border-green-400 bg-green-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="space-y-4">
            {selectedFile ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.size)} • Ready to upload
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    dragActive ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      dragActive ? "text-blue-600" : "text-gray-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {dragActive
                      ? "Drop your PDF here"
                      : "Choose PDF file or drag and drop"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF files up to 10MB supported
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">💡</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800 font-medium">Pro Tip</p>
              <p className="text-sm text-blue-700 mt-1">
                Please check and update any missing information in the{" "}
                <a href="/resume#resume-editor" className="font-bold underline">
                  Resume Editor
                </a>
                . The more detailed the data, the better the resume that can be
                created.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit" // Changed type to "submit"
            disabled={!selectedFile || isUploading}
            className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Processing...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Upload Resume
              </>
            )}
          </button>
        </div>
      </form>{" "}
      {/* Closing form tag */}
      {isUploading && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}

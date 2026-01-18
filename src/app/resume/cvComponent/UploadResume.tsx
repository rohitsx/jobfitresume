"use client";
import { useErrorStore } from "@/store/store.error";
import { SnapSection } from "../cvUtil/SnapSection";
import { Loader2Icon, Upload, UploadCloud, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export const UploadResume = () => {
  const [parseResume, setParseResume] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { setError } = useErrorStore();
  const [isDragging, setIsDragging] = useState(false);
  const { setResumeData } = useResumeStore();

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }
    setPdfFile(file);
    setError(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!pdfFile) return setError("Please select a PDF file first.");
    setParseResume(true);

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);

      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload and parse PDF");
      }

      const data = await response.json();
      setResumeData(data.resume);

      alert("PDF uploaded and parsed successfully!");
      setPdfFile(null);
      window.location.href = "/resume#job-description";
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setParseResume(false);
    }
  };

  return (
    <SnapSection Icon={Upload} value="Upload Resume" id="upload-resume">
      <div className="space-y-3">
        <h1 className="text-4xl text-black">Upload Resume</h1>
        <p>Upload your PDF resume to parse and extract information. </p>
      </div>
      <div className="h-80 xl:h-100 mt-20 space-y-10 justify-center px-4 lg:px-20 flex flex-col">
        <div
          className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-white shadow-sm h-full p-4 mx-10 ${
            isDragging ? "border-indigo-600" : "border-gray-200"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <UploadCloud className="w-10 h-10 mb-4 text-gray-400" />
          <p className="text-center font-medium">
            {pdfFile
              ? `Selected: ${pdfFile.name}`
              : "Click or drag & drop PDF here"}
          </p>
          <p className="text-sm text-gray-400">(Only .pdf files are allowed)</p>

          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <button
          className={`border border-gray-200 rounded-xl w-3/4 text-white p-3 shadow-lg hover:shadow-xl transition mx-auto flex justify-center items-center gap-2 cursor-pointer duration-300 ease-in-out ${
            pdfFile ? "bg-indigo-600 " : "bg-indigo-500"
          }`}
          onClick={handleSubmit}
          disabled={parseResume}
        >
          {parseResume ? (
            <>
              <Loader2Icon className="animate-spin size-5" />
              Processing Resume...
            </>
          ) : (
            <>
              <UploadIcon className="size-5" />
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </SnapSection>
  );
};

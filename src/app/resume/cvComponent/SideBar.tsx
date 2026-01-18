"use client";

import { getDbRef } from "@/lib/dbRef";
import { useHashStore } from "@/store/store.hash";
import { useResumeStore } from "@/store/useResumeStore";
import { get } from "firebase/database";
import {
  LucideIcon,
  FileText,
  Pencil,
  Upload,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

interface CvNavbarProps {
  url: string;
  value: string;
  Icon?: LucideIcon;
}

export const SideBar = ({ uid }: { uid: string }) => {
  const { setUid, setResumeData, resumeData } = useResumeStore();
  const { hash } = useHashStore();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUid(uid);
    if (resumeData) return;
    const getResumeData = async () => {
      const dbRef = getDbRef(uid);
      const snapshot = await get(dbRef);
      const data = snapshot.val();
      if (data) {
        setResumeData(data.resumeData);
      }
    };

    getResumeData();
  }, [uid, resumeData, setResumeData, setUid]);

  const Btn = ({ url, value, Icon }: CvNavbarProps) => {
    let selected;
    selected = hash === `#${value.toLowerCase().replace(/\s+/g, "-")}`;
    if (value === "Education & Skills" && hash === "#education")
      selected = true;

    return (
      <a
        href={url}
        className={`flex items-center gap-6 p-3 rounded-xl hover:bg-white hover:text-black transition duration-300 ease-in-out ${selected && "bg-white text-black shadow-sm"}`}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-5" />}
          {value}
        </div>
      </a>
    );
  };

  function ToggleButton({ url, Icon, value }: any) {
    return (
      <a
        href={isOpen ? hash : url}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-6 p-3 rounded-xl hover:bg-white hover:text-black transition duration-300 ease-in-out `}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="size-5" />}
          {value}
        </div>
        <ChevronRight
          className={`size-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-90 animate-spin-slow" : ""
          }`}
        />{" "}
      </a>
    );
  }

  return (
    <div className="h-full p-6 pr-3 w-65 xl:w-75 2xl:w-85">
      <div>
        <a href="/" className="mb-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-base">
            JF
          </div>
          <div className="text-black text-xl font-semibold">JobFit Resume</div>
        </a>
      </div>

      <div className="text-black text-xl px-3 py-7">Menu</div>
      <div className="space-y-3">
        <Btn url="#job-description" value="Job Description" Icon={FileText} />
        <div className="space-y-2">
          <ToggleButton url="#user" value="Edit Resume" Icon={Pencil} />
          {isOpen && (
            <div className="flex flex-col ml-4 border-l-gray-300 space-y-2 border-l-4 pl-6">
              <Btn value="User" url="#user" />
              <Btn value="Experience" url="#experience" />
              <Btn value="Projects" url="#projects" />
              <Btn value="Education & Skills" url="#education " />
            </div>
          )}
        </div>
        <Btn url="#upload-resume" value="Upload Resume" Icon={Upload} />
      </div>
    </div>
  );
};

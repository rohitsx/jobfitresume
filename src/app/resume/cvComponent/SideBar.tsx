"use client";

import { getDbRef } from "@/lib/dbRef";
import { useHashStore } from "@/store/store.hash";
import { useResumeStore } from "@/store/useResumeStore";
import { get } from "firebase/database";
import { LucideIcon, FileText, Pencil, Upload, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CvNavbarProps {
  url: string;
  value: string;
  Icon: LucideIcon;
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const Btn = ({ url, value, Icon }: CvNavbarProps) => {
    return (
      <a
        href={url}
        className={`flex items-center gap-2 p-3 rounded-xl hover:bg-white hover:text-black transition duration-300 ease-in-out ${
          hash === url && "bg-white text-black shadow-sm"
        }`}
        onClick={() => setIsOpen(false)} // Close sidebar on link click
      >
        <Icon className="size-5" />
        {value}
      </a>
    );
  };

  return (
    <>
      <div className="lg:hidden p-4">
        <button onClick={toggleSidebar}>
          <Menu className="size-6 text-black" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full border-r border-gray-200 p-6 pr-3 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:h-auto lg:bg-transparent lg:border-none transition-transform duration-300 ease-in-out z-50 w-64`}
      >
        <div className="flex justify-between items-center lg:hidden mb-6">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-base">
              JF
            </div>
            <div className="text-black text-xl font-semibold">
              JobFit Resume
            </div>
          </a>
          <button onClick={toggleSidebar}>
            <X className="size-6 text-black" />
          </button>
        </div>

        <div className="hidden lg:block">
          <a href="/" className="mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-base">
              JF
            </div>
            <div className="text-black text-xl font-semibold">
              JobFit Resume
            </div>
          </a>
        </div>

        <div className="text-black text-xl px-3 py-7">Menu</div>
        <div className="space-y-3">
          <Btn url="#job-description" value="Job Description" Icon={FileText} />
          <Btn url="#edit-resume" value="Edit Resume" Icon={Pencil} />
          <Btn url="#upload-resume" value="Upload Resume" Icon={Upload} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

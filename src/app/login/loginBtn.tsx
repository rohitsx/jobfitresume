"use client";
import { FirebaseApp } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { set, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { Loader2, LogIn } from "lucide-react";
import { useCallback, useState } from "react";
import { getDbRef } from "@/lib/dbRef";
import { useResumeStore } from "@/store/useResumeStore";

export default function LoginBtn({
  onLoginClickAction,
}: {
  onLoginClickAction: ({
    uid,
    email,
    displayName,
  }: {
    uid: string;
    email: string;
    displayName: string;
  }) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setUid, setResumeData } = useResumeStore();

  const handleAuth = useCallback(async () => {
    setIsLoading(true);
    const auth = getAuth(FirebaseApp);
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    provider.addScope("profile");

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) throw new Error("No credential");

      const { email, displayName, uid } = result.user;
      if (!email || !displayName) throw new Error("No credential");

      const dbRef = getDbRef(uid);
      const snapshot = await get(dbRef);
      const data = snapshot.val();

      if (!data || !data.email) {
        await set(dbRef, {
          name: displayName,
          email,
          tier: {
            count: 0,
            date: new Date().toISOString().split("T")[0],
            type: "free",
          },
        });
      }

      setUid(uid);
      setResumeData(data.resumeData);

      await onLoginClickAction({
        uid,
        email,
        displayName,
      });

      if (data.resumeData) return (window.location.href = "/resume");
      return (window.location.href = "/resume?edit=true");
    } catch (e) {
      console.error("Authentication or data storage error:", e);
    } finally {
      setIsLoading(false);
    }
  }, [onLoginClickAction]);

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl mt-30 shadow-lg overflow-hidden p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your account and continue your journey
          </p>
        </div>

        <button
          onClick={handleAuth}
          disabled={isLoading}
          className="flex items-center justify-center w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 font-medium"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="animate-spin h-5 w-5 text-white" />
              <span>Signing in...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <LogIn className="h-5 w-5" />
              <span>Sign in with Google</span>
            </div>
          )}
        </button>

        <div className="text-center text-sm text-gray-500">
          By continuing, you agree to our{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Loader2, Clock, Zap } from "lucide-react";

export const NewCvSkeleton = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Analyzing job requirements...",
    "Processing your experience...",
    "Optimizing content for ATS...",
    "Formatting your resume...",
    "Finalizing details...",
  ];

  // Predefined durations to avoid Math.random()
  const skillAnimationDurations = [
    "1.2s",
    "1.4s",
    "1.1s",
    "1.3s",
    "1.5s",
    "1.2s",
    "1.4s",
    "1.1s",
    "1.3s",
    "1.5s",
    "1.2s",
    "1.4s",
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 2.5; // Fixed increment
      });
    }, 200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="p-8 print:p-0">
      {/* Enhanced Progress Header */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-800">
            Creating Your Resume
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Current Step */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="animate-pulse">{steps[currentStep]}</span>
        </div>

        {/* Progress Percentage */}
        <div className="text-right text-sm font-medium text-gray-700 mt-2">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {/* Animated Resume Preview */}
      <div className="w-4xl p-12 border rounded-2xl bg-white shadow-sm space-y-8 relative overflow-hidden">
        {/* Shimmer overlay effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

        {/* Header Section */}
        <div className="space-y-4 relative">
          <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded mx-auto animate-pulse delay-75"></div>
        </div>

        {/* Projects Section with staggered animations */}
        <div className="text-left space-y-6 relative">
          <div className="h-6 w-24 bg-gradient-to-r from-blue-200 to-blue-300 rounded animate-pulse"></div>

          {[1, 2, 3].map((projectNum, index) => (
            <div
              key={projectNum}
              className="space-y-3"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-between items-center">
                <div
                  className={`h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse ${
                    projectNum === 1
                      ? "w-64"
                      : projectNum === 2
                        ? "w-56"
                        : "w-60"
                  }`}
                ></div>
                <div className="flex gap-2">
                  {Array.from({ length: projectNum === 2 ? 3 : 2 }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className={`h-4 bg-gradient-to-r from-purple-200 to-purple-300 rounded animate-pulse ${
                          i === 0 ? "w-12" : i === 1 ? "w-16" : "w-10"
                        }`}
                      ></div>
                    ),
                  )}
                </div>
              </div>
              <div className="space-y-2 ml-4">
                {Array.from({ length: 4 + (projectNum === 2 ? 1 : 0) }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className={`h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse ${
                        i === 0
                          ? "w-full"
                          : i === 1
                            ? projectNum === 2
                              ? "w-11/12"
                              : "w-5/6"
                            : i === 2
                              ? "w-4/5"
                              : i === 3
                                ? projectNum === 2
                                  ? "w-5/6"
                                  : "w-3/4"
                                : "w-3/4"
                      }`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="text-left space-y-4 relative">
          <div className="h-6 w-24 bg-gradient-to-r from-green-200 to-green-300 rounded animate-pulse"></div>
          <div className="flex justify-between items-center">
            <div className="h-5 w-72 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse delay-100"></div>
          </div>
        </div>

        {/* Skills Section with fixed durations */}
        <div className="text-left space-y-4 relative">
          <div className="h-6 w-16 bg-gradient-to-r from-orange-200 to-orange-300 rounded animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse"
                style={{
                  animationDelay: `${i * 50}ms`,
                  animationDuration: skillAnimationDurations[i],
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-1">Pro Tip</h3>
            <p className="text-sm text-yellow-700">
              We're analyzing your experience and the job requirements to create
              the perfect match. This usually takes 15-30 seconds for the best
              results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

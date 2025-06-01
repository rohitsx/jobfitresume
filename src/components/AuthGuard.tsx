import { LogIn } from "lucide-react";

export default function AuthGaurd() {
  return (
    <div className="bg-purple-50 h-screen">
      {" "}
      <div className=" flex items-center justify-center mt-32">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600">
              Please log in to access your resume editor and job description
              tools.
            </p>
          </div>

          {/* <button */}
          {/*   onClick={() => (window.location.href = "/login")} */}
          {/*   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2" */}
          {/* > */}
          {/*   <LogIn className="w-5 h-5" /> */}
          {/*   <span>Get Started</span> */}
          {/* </button> */}
        </div>
      </div>
    </div>
  );
}

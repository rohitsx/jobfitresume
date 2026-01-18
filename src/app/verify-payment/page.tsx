import Link from "next/link";

interface ResumePageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyPayment({ searchParams }: ResumePageProps) {
  const params = await searchParams;
  const subscriptionId = params?.subscription_id as string;
  const status = params?.status as string;

  // Check if payment was successful
  const isPaymentSuccessful = status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {isPaymentSuccessful ? (
            <>
              {/* Success Icon */}
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-8">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Successful! 🎉
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Welcome to JobFit Resume! Your subscription is now active.
              </p>

              {/* Subscription Details */}
              <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Subscription Details
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600 capitalize">
                      {status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscription ID:</span>
                    <span className="font-mono text-sm text-gray-900 break-all">
                      {subscriptionId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <Link
                  href="/resume"
                  className="bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl text-white px-12 py-4 rounded-xl font-semibold text-lg  transition-all duration-200 shadow-lg transform hover:-translate-y-0.5"
                >
                  Start Building Your Resume →
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Error Icon */}
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-8">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              {/* Error Message */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Issue
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                There seems to be an issue with your payment. Please contact our
                support team or try again.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Try Again
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-200"
                >
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Send an email on{" "}
            <a
              href="mailto:rohitbindw@gmail.com"
              className="text-purple-600 hover:underline"
            >
              rohitbindw@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

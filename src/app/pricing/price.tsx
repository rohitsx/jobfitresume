"use client";

import React, { useState } from "react";
import { halfYearlyPlans, monthlyPlans } from "./plans";

const PricingCard = ({
  plan,
  popular,
  uid,
}: {
  plan: {
    name: string;
    price: string;
    priceSuffix?: string;
    features: string[];
    cta: string;
    paymentLink?: string;
  };
  popular: boolean;
  uid: string | undefined;
}) => {
  const handleClick = () => {
    if (uid) return (window.location.href = plan.paymentLink + uid);

    window.location.href = "/login";
  };

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-lg ${
        popular
          ? "border-2 border-indigo-500 relative transform hover:-translate-y-1"
          : "border border-gray-200 hover:border-indigo-300"
      } transition-all duration-300`}
    >
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-indigo-500 text-white text-xs font-semibold py-1 text-center">
          Recommended
        </div>
      )}
      <div className={`p-8 ${popular ? "pt-10" : ""}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-indigo-600">
            {plan.price}
          </span>
          {plan.priceSuffix && (
            <span className="text-lg text-gray-500 ml-1">
              {plan.priceSuffix}
            </span>
          )}
        </div>
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClick}
          className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition duration-300 cursor-pointer
            ${
              popular
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                : "bg-gray-100 text-indigo-700 hover:bg-indigo-100"
            }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ uid }: { uid: string | undefined }) => {
  const [isHalfYearly, setIsHalfYearly] = useState(false);

  const plansToDisplay = isHalfYearly ? halfYearlyPlans : monthlyPlans;

  return (
    <section id="pricing" className="py-24 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 md:text-lg">
            Choose the plan that fits your needs. Start free or upgrade for more
            features.
          </p>

          {/* Monthly/Half-Yearly Toggle */}
          <div className="flex justify-center items-center mt-8 mb-8">
            <span
              className={`mr-3 text-lg font-semibold ${
                !isHalfYearly ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <label
              htmlFor="toggle"
              className="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle"
                className="sr-only peer"
                checked={isHalfYearly}
                onChange={() => setIsHalfYearly(!isHalfYearly)}
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
            <span
              className={`ml-3 text-lg font-semibold ${
                isHalfYearly ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              Half-Yearly
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansToDisplay.map((plan) => (
            <PricingCard
              key={plan.name + (isHalfYearly ? "-half-yearly" : "-monthly")}
              plan={plan}
              popular={plan.popular}
              uid={uid}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

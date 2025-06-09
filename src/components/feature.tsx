import { IconName } from "@/types/Ui.type";
import Icon from "./icon";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: IconName;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 flex items-center justify-center w-14 h-14 mb-4">
        <div className="text-indigo-600">
          <Icon name={icon} />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features: Array<{
    icon: IconName;
    title: string;
    description: string;
  }> = [
    {
      icon: "AI",
      title: "AI-Powered Precision",
      description:
        "Leverage Gemini and other top-tier AI to analyze job descriptions and highlight your most relevant skills and experiences.",
    },
    {
      icon: "TIME",
      title: "Save Hours of Work",
      description:
        "Stop manually tweaking your resume for every application. Get a tailored version in minutes, not hours.",
    },
    {
      icon: "STAR",
      title: "Stand Out from the Crowd",
      description:
        "Impress recruiters with a resume that speaks directly to their needs, increasing your chances of landing an interview.",
    },
    {
      icon: "EASY",
      title: "Incredibly Easy to Use",
      description:
        "A simple, intuitive process: upload, paste job description, and generate. Optional enhancements for even better results.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M11.5 3C7.36 3 4 6.36 4 10.5c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5C19 6.36 15.64 3 11.5 3z"></path>
              <rect x="3" y="15" width="18" height="7" rx="2" ry="2"></rect>
            </svg>
            The JobFit Advantage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose JobFit Resume?
          </h2>
          <p className="text-gray-600 md:text-lg">
            Our AI-powered platform gives you the edge in today&apos;s
            competitive job market, making your resume stand out for every
            application.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

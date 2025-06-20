export const GreyLine = ({ children }: { children: React.ReactNode }) => (
  <div className=" border-b border-gray-200 pb-3">{children}</div>
);

export const BlackLine = ({ children }: { children: React.ReactNode }) => (
  <div className=" border-b border-gray-600 pb-1 mb-1 ">{children}</div>
);

export const SectionHeader = ({ title }: { title: string }) => (
  <BlackLine>
    <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
  </BlackLine>
);

export const DowloadPdf = ({ username }: { username: string }) => (
  <div className="flex justify-center mb-4 print:hidden">
    <button
      onClick={() => {
        const originalTitle = document.title;
        const title = username + " Resume";
        document.title = title.replace(/ /g, "_");
        window.print();

        window.addEventListener(
          "afterprint",
          () => {
            document.title = originalTitle;
          },
          { once: true },
        );
      }}
      className="bg-indigo-600 hover:bg-indigo-700 text-white  py-2 px-4 rounded cursor-pointer"
    >
      Download PDF
    </button>
  </div>
);

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const UrlHtml = ({ link, text }: { link: string; text: string }) => {
  return (
    <p>
      [
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600"
      >
        {text}
      </a>
      ]
    </p>
  );
};

export const GoBack = () => (
  <div className="flex justify-center mb-4 print:hidden ">
    <a
      href="/beta/resume#job-description"
      className="bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-grey-800  py-2 px-4 rounded cursor-pointer"
    >
      Go Back
    </a>
  </div>
);

export const RecreateResume = ({
  handleOnClick,
}: {
  handleOnClick: () => void;
}) => (
  <div className="flex justify-center mb-4 print:hidden ">
    <button
      onClick={handleOnClick}
      className="bg-white border border-gray-200 shadow-sm hover:bg-gray-100 text-grey-800  py-2 px-4 rounded cursor-pointer"
    >
      Not happy with your resume? Create a new one.
    </button>
  </div>
);

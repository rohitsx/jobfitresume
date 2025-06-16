import { NewResumeData } from "@/types/NewResume.type";

export const NewCvSection = ({
  section,
}: {
  section: NewResumeData["section"];
}) => {
  return (
    <div className="text-left">
      {section.map(({ sectionTitle, sectionData }, index) => (
        <div key={index}>
          <h1 className="text-xl border-b-2 border-gray-500  mb-1">
            {sectionTitle}
          </h1>
          <div className="px-3 space-y-2">
            {sectionData.map(
              (
                { lHeader, rHeader, lSubHeader, rSubHeader, description },
                index,
              ) => (
                <div key={index}>
                  <div>
                    <div className="flex justify-between w-full">
                      <p className="text-left  font-semibold">{lHeader}</p>
                      <div className="flex gap-2">
                        {Array.isArray(rHeader) ? (
                          rHeader.map(([urlName, url], index) => (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4"
                              key={index}
                            >
                              {urlName}
                            </a>
                          ))
                        ) : (
                          <p>{rHeader}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between w-full italic px-2">
                      <p className="text-left">{lSubHeader}</p>
                      <div className="flex gap-2">
                        {Array.isArray(rSubHeader) ? (
                          rSubHeader.map(([urlName, url], index) => (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-4"
                              key={index}
                            >
                              {urlName}
                            </a>
                          ))
                        ) : (
                          <p>{rSubHeader}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-5">
                    {description &&
                      description.map((str, index) => (
                        <div key={index} className="flex gap-1.5">
                          <a>•</a>
                          <p>{str}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

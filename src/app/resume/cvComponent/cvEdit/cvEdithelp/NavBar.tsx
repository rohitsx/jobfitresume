import { useHashStore } from "@/store/store.hash";

const aTagsData = ["User", "Experience", "Projects", "Skills", "Education"];

export const NavBar = () => {
  const { hash } = useHashStore();

  return (
    <div className="border-2 h-14  md:mx-15 lg:mx-18 lx:mx-38 text-sm md:text-lg  rounded-4xl shadow-lg flex  gap-4 md:gap-8 xl:gap-14 justify-center items-center mb-18">
      {aTagsData.map((href) => {
        const h = `#${href}`;
        const aClass = `hover:text-black  transition-all duration-300 hover:scale-110   ease-in-out ${hash === h && "scale-110 text-black "}`;
        return (
          <a href={h} className={aClass} key={h}>
            {href}
          </a>
        );
      })}
    </div>
  );
};

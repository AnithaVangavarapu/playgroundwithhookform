import { Link, useLocation } from "react-router-dom";
import { ChevronRight, BookText } from "lucide-react";

const SideMenu = () => {
  const location = useLocation();
  const links = [
    {
      to: "/dynamicForm/study-drug-dose",
      label: "Study Drug Dose Diary",
      matchPaths: ["/", "/dynamicForm/study-drug-dose"],
    },
    { to: "/insulineDiary", label: "Insuline Diary" },
    { to: "/dynamicForm/hypoglycemia", label: "Hypoglycemia Diary" },
    { to: "/dynamicForm", label: "Dynamic Form" },
    { to: "/sf36", label: "SF-36" },
  ];
  console.log(location.pathname);
  return (
    <div className="text-[10px] font-medium">
      {links.map((link) => {
        const paths: Array<string> | string = link.matchPaths || link.to;
        const isActive = Array.isArray(paths)
          ? paths.includes(location.pathname)
          : location.pathname === paths;
        return (
          <Link
            to={link.to}
            className={`p-2  border-b border-gray-200 grid grid-cols-8 items-center ${
              isActive && "bg-gray-100"
            }`}
            key={link.to}
          >
            <BookText width={15} color="gray" className=" col-span-1" />
            <p className="col-span-6">{link.label}</p>
            <ChevronRight
              width={12}
              color="gray"
              className="col-span-1 justify-self-end"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SideMenu;

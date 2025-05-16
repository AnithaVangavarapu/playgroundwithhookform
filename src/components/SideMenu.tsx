import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, BookText } from "lucide-react";

const SideMenu = () => {
  const [activeLink, setActiveLink] = useState<string>("studyDrugDoseDiary");
  return (
    <div className="text-[10px] font-medium">
      <Link
        to={"/studyDrugDoseDiary"}
        className={`p-2  border-b border-gray-200 grid grid-cols-8 items-center ${
          activeLink.match("studyDrugDoseDiary") && "bg-gray-100"
        }`}
        onClick={() => setActiveLink("studyDrugDoseDiary")}
      >
        <BookText width={15} color="gray" className=" col-span-1" />
        <p className="col-span-6">Study Drug Dose Diary</p>
        <ChevronRight
          width={12}
          color="gray"
          className="col-span-1 justify-self-end"
        />
      </Link>
      <Link
        to={"/insulineDiary"}
        className={`p-2 grid grid-cols-8 items-center border-b border-gray-200 ${
          activeLink.match("insulineDiary") && "bg-gray-100"
        }`}
        onClick={() => setActiveLink("insulineDiary")}
      >
        <BookText width={15} color="gray" className="col-span-1" />
        <p className="col-span-6">Insuline Diary</p>
        <ChevronRight
          width={12}
          color="gray"
          className="col-span-1 justify-self-end"
        />
      </Link>
      <Link
        to={"/hypoglycemiaDiary"}
        className={`p-2 grid grid-cols-8 items-center border-b border-gray-200 ${
          activeLink.match("hypoglycemiaDiary") && "bg-gray-100"
        }`}
        onClick={() => setActiveLink("hypoglycemiaDiary")}
      >
        <BookText width={15} color="gray" className="col-span-1" />
        <p className="col-span-6">Hypoglycemia Diary</p>
        <ChevronRight
          width={12}
          color="gray"
          className="col-span-1 justify-self-end"
        />
      </Link>
      <Link
        to={"/dynamicForm"}
        className={`p-2 grid grid-cols-8 items-center  border-b border-gray-200 ${
          activeLink.match("dynamicForm") && "bg-gray-100"
        }`}
        onClick={() => setActiveLink("dynamicForm")}
      >
        <BookText width={15} color="gray" className="col-span-1" />
        <p className="col-span-6">Dynamic Form</p>
        <ChevronRight
          width={12}
          color="gray"
          className="col-span-1 justify-self-end"
        />
      </Link>
      <Link
        to={"/sf36"}
        className={`p-2 grid grid-cols-8 items-center  border-b border-gray-200 ${
          activeLink.match("sf36") && "bg-gray-100"
        }`}
        onClick={() => setActiveLink("sf36")}
      >
        <BookText width={15} color="gray" className="col-span-1" />
        <p className="col-span-6">SF-36</p>
        <ChevronRight
          width={12}
          color="gray"
          className="col-span-1 justify-self-end"
        />
      </Link>
    </div>
  );
};

export default SideMenu;

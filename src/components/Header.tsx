import { User } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center p-2 justify-between border-b-[2px] border-gray-200 ">
      <img src="/clinion-logo.jpg" alt="clinion-logo" width={40} />

      <div className="flex gap-4 items-center ">
        <p className="text-sm">Playground</p>
        <div className="relative cursor-pointer">
          <User width={30} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default Header;

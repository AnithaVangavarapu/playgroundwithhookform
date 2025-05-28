import type React from "react";
import { Button } from "../commonComponents";
interface Props {
  title?: string;
  message: string;
  handleConfirmation: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmModal = ({ title, message, handleConfirmation }: Props) => {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] top-0 left-0 z-10 w-[100vw] h-[100vh] fixed">
      <div className="border bg-white  fixed top-0 bottom-0 left-0 right-0 m-auto  w-[30%] h-fit py-4 px-5 border-white rounded-lg shadow-md">
        {/* <h1>{title}</h1> */}
        <p className="text-[14px] mb-4">{message}</p>
        <Button
          label="Ok"
          type="button"
          onClick={handleConfirmation}
          classnames={{
            div: "text-right",
            button: "w-[20%] text-[14px]",
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;

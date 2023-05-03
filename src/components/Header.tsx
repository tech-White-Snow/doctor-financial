import { FC } from "react";

import backwardIcon from "../assets/backward_ico.svg";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="relative h-32">
      <div className="relative w-full bg-[#64B3EC] h-32 text-center text-base text-white font-bold pt-8">
        <div className="pt-1">{title}</div>
        <div className="absolute left-4 top-8 border border-white p-2 rounded-md">
          <img src={backwardIcon} />
        </div>
      </div>
      <div className="absolute bottom-[-8px] w-full h-8 bg-white rounded-xl"></div>
    </div>
  );
};

export default Header;

import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";

import backwardIcon from "../assets/icons/backward_ico.svg";
import homeIcon from "../assets/icons/home_ico.svg";
import homeIcon1 from "../assets/icons/home_ico1.svg";
import patientIcon from "../assets/icons/patient_ico.svg";
import patientIcon1 from "../assets/icons/patient_ico1.svg";
import searchIcon from "../assets/icons/search_ico.svg";
import searchIcon1 from "../assets/icons/search_ico1.svg";
import adminIcon from "../assets/icons/admin_ico.svg";
import adminIcon1 from "../assets/icons/admin_ico1.svg";

interface NavBarProps {
  status: number;
}

const NavBar: FC<NavBarProps> = ({ status }) => {
  const navigate = useNavigate();

  return (
    <div
      className="absolute w-full h-[75px] bg-white z-10 bottom-0 text-center text-xs font-mont flex items-center rounded-tl-lg rounded-tr-lg"
      style={{ color: Theme.COLOR_DEFAULT }}
    >
      <div className="grow">
        <div className="flex justify-center">
          <img src={status != 1 ? homeIcon : homeIcon1} />
        </div>
        <div
          className="pt-1"
          style={{
            color: status != 1 ? Theme.COLOR_DEFAULT : Theme.COLOR_SELECTED,
          }}
        >
          Home
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <img src={status != 2 ? patientIcon : patientIcon1} />
        </div>
        <div
          className="pt-1"
          style={{
            color: status != 2 ? Theme.COLOR_DEFAULT : Theme.COLOR_SELECTED,
          }}
        >
          Patient
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <img src={status != 3 ? searchIcon : searchIcon1} />
        </div>
        <div
          className="pt-1"
          style={{
            color: status != 3 ? Theme.COLOR_DEFAULT : Theme.COLOR_SELECTED,
          }}
        >
          Search
        </div>
      </div>
      <div className="grow">
        <div className="flex justify-center">
          <img src={status != 4 ? adminIcon : adminIcon1} />
        </div>
        <div
          className="pt-1"
          style={{
            color: status != 4 ? Theme.COLOR_DEFAULT : Theme.COLOR_SELECTED,
          }}
        >
          Admin
        </div>
      </div>
    </div>
  );
};

export default NavBar;

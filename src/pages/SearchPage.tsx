import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";
import searchIcon from "../assets/icons/search_ico.svg";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientThumbnail from "../components/patient/PatientThumbnail";

const SearchPage: FC = () => {
  const temp_db = [
    {
      name: "陳小明",
      newdiease: true,
      telephone: "671234561",
      age: 52,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: false,
      telephone: "671234562",
      age: 52,
      sex: 1,
      doctor: "黃文智醫",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: true,
      telephone: "671234563",
      age: 52,
      sex: 1,
      doctor: "黃文醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: true,
      telephone: "671234564",
      age: 52,
      sex: 1,
      doctor: "黃文醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: true,
      telephone: "671234565",
      age: 52,
      sex: 1,
      doctor: "黃文醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: true,
      telephone: "671234566",
      age: 52,
      sex: 1,
      doctor: "黃文醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Search" />
        {/* Main Page */}
        <div className="w-full px-3 pb-8">
          {/* Scheduled Patient List */}
          <div>
            <div className="pt-2 relative">
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-center p-2 pr-8" />
              <div
                className="absolute right-3 top-[26px] text-[10px] text-[#25747B]"
                onClick={() => console.log("Show Password")}
              >
                <img src={searchIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full bottom-[80px] px-3">
          <div
            className="rounded-[10px] bg-[#64B3EC] hover:bg-[#6D7D8B] text-white text-center text-sm p-3"
            onClick={() => navigate("/searchresult")}
          >
            Search
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={3} />
      </div>
    </div>
  );
};

export default SearchPage;

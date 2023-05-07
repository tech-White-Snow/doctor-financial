import { FC } from "react";

import Theme from "../assets/color";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";
import editIcon from "../assets/icons/edit_ico1.svg";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientResultItem from "../components/patient/PatientResultItem";

const PastHistoryPage: FC = () => {
  const temp_data = {
    name: "陳小明",
    newdiease: true,
    telephone: "671234561",
    age: 52,
    sex: 1,
    doctor: "黃文智醫師",
    date: "9-9-2022 / 10:30 a.m.",
    content:
      "這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史。",
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="既往史" />
        {/* Main Page */}
        <div className="p-4">
          {/* Title */}
          <div className="flex flex-row justify-between">
            <div
              className="flex flex-row text-base font-bold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>
                {temp_data.name}({temp_data.sex == 1 ? "男" : "女"})
              </div>
              <div className="pl-3">{temp_data.age}歲</div>
            </div>
            <div className="text-sm text-[#0C2036] text-opacity-80">
              {temp_data.date}
            </div>
          </div>
          {/* Content */}
          <div
            className="text-xs pt-8 px-3"
            style={{ color: Theme.COLOR_DEFAULT }}
          >
            {temp_data.content}
          </div>
        </div>
        {/* Edit Box */}
        <div className="absolute bottom-[80px] right-3 p-4">
          <div className="flex justify-end p-1">
            <img src={editIcon} />
          </div>
          <div className="pt-3" style={{ color: Theme.COLOR_DEFAULT }}>
            最後更新：12-8-2022
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PastHistoryPage;

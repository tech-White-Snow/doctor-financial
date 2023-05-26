import { FC, useState } from "react";

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
    date: "9-9-2022",
    content: "既往史：有高血压病、冠心病病史。",
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [contentText, setContentText] = useState(temp_data.content);

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
            <textarea
              className="w-full h-[240px] resize-h-none focus:outline-none p-2 rounded-lg"
              value={contentText}
              onChange={(ev) => setContentText(ev.target.value)}
              readOnly={!isEditMode}
            />
          </div>
        </div>
        {/* Edit Box */}
        <div className="absolute w-full bottom-[70px] right-3 p-4">
          {isEditMode ? (
            <div className="w-full text-sm text-center pl-3 flex flex-row">
              <div
                className="grow rounded-lg bg-[#D3E7F6] p-2 text-[#64B3EC]"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </div>
              <div
                className="grow rounded-lg bg-[#64B3EC] p-2 text-white ml-4"
                onClick={() => setIsEditMode(false)}
              >
                Confirm
              </div>
            </div>
          ) : (
            <div>
              <div
                className="flex justify-end p-1"
                onClick={() => setIsEditMode(true)}
              >
                <img src={editIcon} className="max-w-none" />
              </div>
              <div
                className="pt-3 text-right text-[15px]"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                最後更新：12-8-2022
              </div>
            </div>
          )}
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PastHistoryPage;

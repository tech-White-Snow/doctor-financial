import { FC } from "react";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import closeIcon from "../../assets/icons/close_ico2.svg";
import removeIcon from "../../assets/icons/remove_ico1.svg";
import prevIcon from "../../assets/icons/prev_ico1.svg";
import nextIcon from "../../assets/icons/next_ico1.svg";
import blankImgIcon from "../../assets/icons/blankimg_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const UpdateAlbumPage: FC = () => {
  const temp_data = {
    name: "陳小明",
    newdiease: true,
    telephone: "671234561",
    age: 52,
    sex: 1,
    doctor: "黃文智醫師",
    date: "9-9-2022",
    content: "皮膚發紅，初有斑點",
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="病歷相簿" />
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
          {/* Image */}
          <div className="relative h-[432px] w-full bg-[#F6F9FC] flex flex-col justify-center">
            <div className="absolute w-full p-2 top-2 flex flex-row justify-between items-center">
              <div>
                <img src={closeIcon} />
              </div>
              <div className="flex flex-row">
                <div>
                  <img src={editIcon} />
                </div>
                <div className="pl-3">
                  <img src={removeIcon} />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center w-full justify-between px-2">
              <div>
                <img src={prevIcon} />
              </div>
              <div>
                <img src={blankImgIcon} />
              </div>
              <div>
                <img src={nextIcon} />
              </div>
            </div>
          </div>
          <div
            className="pt-4 pb-[75px]"
            style={{ color: Theme.COLOR_DEFAULT }}
          >
            <div className="p-2 text-[15px]">{temp_data.date}</div>
            <div className="px-4 py-2 text-[11px]">{temp_data.content}</div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default UpdateAlbumPage;

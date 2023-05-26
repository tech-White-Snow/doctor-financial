import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import uploadIcon from "../../assets/icons/upload_ico.svg";
import cameraIcon from "../../assets/icons/camera_ico.svg";
import BlankImage from "../../assets/img/blank_image.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PatientAlbumPage: FC = () => {
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

  const navigate = useNavigate();

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
          {/* Content */}
          <div
            className="text-xs pt-8 px-3"
            style={{ color: Theme.COLOR_DEFAULT }}
          >
            <div className="relative">
              <div className="text-[#276D36]">{temp_data.content}</div>
              <div className="flex flex-row pt-2 justify-between">
                <div className="flex flex-row">
                  <div className="px-2">
                    <img src={BlankImage} className="max-w-none" />
                  </div>
                  <div className="px-2">
                    <img src={BlankImage} className="max-w-none" />
                  </div>
                </div>
                <div className="flex flex-row items-end">
                  <div className="px-1 pb-1">
                    <img src={uploadIcon} className="max-w-none" />
                  </div>
                  <div className="px-1">
                    <img src={cameraIcon} className="max-w-none" />
                  </div>
                </div>
              </div>
              <div
                className="absolute top-2 right-1"
                onClick={() => navigate("/editalbum")}
              >
                <img src={editIcon} className="max-w-none" />
              </div>
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PatientAlbumPage;

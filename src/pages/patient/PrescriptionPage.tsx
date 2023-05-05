import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import shareIcon from "../../assets/icons/share_ico.svg";
import printIcon from "../../assets/icons/print_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PrescriptionPage: FC = () => {
  const temp_data = {
    name: "陳小明",
    newdiease: true,
    telephone: "671234561",
    age: 52,
    sex: 1,
    doctor: "黃文智醫師",
    date: "9-9-2022",
    diagnosis: "這是既往史",
    doctorID: "006073",
  };

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div className="p-4 pb-[80px]">
          {/* Title */}
          <div className="text-center">
            <div
              className="font-bold font-sans text-5xl"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              福氣堂
            </div>
            <div
              className="font-bold font-sans text-lg tracking-[1rem] pl-4 pt-2"
              style={{ color: Theme.COLOR_GRAY }}
            >
              忠醫診所
            </div>
            <div
              className="font-bold font-mont text-lg pt-2"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <span className="border-b border-b-[#64B3EC]">到診證明書</span>
            </div>
          </div>
          {/* User Info */}
          <div>
            <div className="text-sm p-2 mt-3 pb-5 border-b border-b-[#64B3EC]">
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診症日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {temp_data.date}
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>病人姓名:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {temp_data.name}
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診斷:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {temp_data.diagnosis}
                </span>
              </div>
              {/* Diagnosis */}
              <div
                className="h-40 flex flex-col justify-center"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                <div>醫師簽名：</div>
              </div>
              <div className="py-1 text-black text-opacity-60">
                <span>醫師編號:</span>
                <span className="pl-2">{temp_data.doctorID}</span>
              </div>
              <div className="py-1 text-black text-opacity-60">
                <span style={{ color: Theme.COLOR_DEFAULT }}>簽發日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  {temp_data.date}
                </span>
              </div>
            </div>
            <div className="p-3 text-xs" style={{ color: Theme.COLOR_DEFAULT }}>
              地址: 油麻地彌敦道546號旺角大樓5D 電話: 2788 2951
            </div>
          </div>
          {/* Assistant Tools */}
          <div className="flex flex-row justify-end">
            <div className="p-3" onClick={() => navigate("/prescription")}>
              <img src={editIcon} />
            </div>
            <div className="p-3" onClick={() => navigate("/receipt")}>
              <img src={shareIcon} />
            </div>
            <div className="p-3" onClick={() => navigate("/recipe")}>
              <img src={printIcon} />
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PrescriptionPage;

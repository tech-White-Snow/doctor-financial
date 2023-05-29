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

const PreviewMedicinePage: FC = () => {
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
      <div className="h-screen overflow-y-auto bg-[#FAFCFF]">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div className="m-4 p-3 mb-[160px] rounded-lg shadow-lg">
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
              className="font-bold text-lg pt-2"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <span className="border-b border-b-[#64B3EC]">處方</span>
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
                <div style={{ color: Theme.COLOR_DEFAULT }}>診斷:</div>
                <div className="pl-2 h-48 text-black text-opacity-60"></div>
                <div className="text-center text-xs text-[#666666]">
                  <span className="px-4">日藥/每日</span>
                  <span className="px-4">次/共</span>
                  <span className="px-4">包</span>
                </div>
                <div className="text-xs text-[#666666] pt-3">
                  <span>餐</span>
                  <span className="pl-3">服</span>
                </div>
              </div>
              {/* Diagnosis */}
              <div className="py-1 pt-3 text-black text-opacity-60">
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
            <div
              className="p-3 text-xs flex flex-row justify-between"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>地址: 油麻地彌敦道546號旺角大樓5D</div>
              <div>電話: 2788 2951</div>
            </div>
          </div>
        </div>
        <div className="absolute w-full px-5 py-3 bottom-[80px]">
          <div
            className="p-3 text-center text-white rounded-xl"
            style={{ backgroundColor: Theme.COLOR_DEFAULT }}
            onClick={() => navigate("/admin")}
          >
            Confirm
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PreviewMedicinePage;

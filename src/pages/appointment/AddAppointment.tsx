import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientThumbnail from "../../components/patient/PatientThumbnail";

const AddAppointment: FC = () => {
  const temp_db = [
    {
      name: "陳小明",
      newdiease: true,
      telephone: "A123456(7)",
      age: 22,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022",
    },
    {
      name: "小明陳",
      newdiease: false,
      telephone: "671234562",
      age: 19,
      sex: 1,
      doctor: "黃文智醫",
      date: "9-9-2022",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="New Appointment" />
        {/* Patient Record */}
        <div
          className="w-full px-3 pt-2 pb-8 text-[13px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="text-right">DD-MM-YYYY</div>
          <div className="px-4 py-2">
            <div className="font-semibold">電話號碼 或 身份證號碼</div>
            <div className="pt-2 relative">
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                placeholder="請輸入關鍵字"
              />
              <div
                className="absolute right-3 top-[26px] text-[10px] text-[#25747B]"
                onClick={() => navigate("/scheduleappointment")}
              >
                <img src={searchIcon} className="max-w-none" />
              </div>
            </div>
            <div className="font-semibold text-center py-2">或</div>
            <div
              className="rounded-lg w-full p-3 text-white text-center"
              style={{ background: Theme.COLOR_DEFAULT }}
              onClick={() => navigate("/addappointmentpatient")}
            >
              新增病人
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={2} />
      </div>
    </div>
  );
};

export default AddAppointment;

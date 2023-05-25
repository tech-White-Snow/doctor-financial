import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientThumbnail from "../../components/patient/PatientThumbnail";

const AddAppointmentPatient: FC = () => {
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
        <Header title="New Patient" />
        {/* Patient Record */}
        <div
          className="w-full px-3 pt-2 pb-[140px] text-[13px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="text-right">DD-MM-YYYY</div>
          <div className="px-4 py-2 text-black text-opacity-60">
            {/*  */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              姓名
            </div>
            <div>
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8" />
            </div>
            {/*  */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              性別
            </div>
            <div>
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8" />
            </div>
            {/*  */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              出生日期
            </div>
            <div>
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8" />
            </div>
            {/*  */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              電話號碼
            </div>
            <div>
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8" />
            </div>
            {/*  */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              身份證號碼
            </div>
            <div>
              <input className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8" />
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Asset Tools Information */}
      <div className="absolute w-full bottom-[80px] px-3">
        <div className="w-full font-mont text-sm text-center pl-3 flex flex-row">
          <div
            className="grow rounded-lg bg-[#D3E7F6] p-3 text-[#64B3EC]"
            onClick={() => navigate(-1)}
          >
            Cancel
          </div>
          <div
            className="grow rounded-lg bg-[#64B3EC] p-3 text-white ml-4"
            onClick={() => navigate("/scheduleappointment")}
          >
            Confirm
          </div>
        </div>
      </div>
      {/* NavBar */}
      <NavBar status={2} />
    </div>
  );
};

export default AddAppointmentPatient;

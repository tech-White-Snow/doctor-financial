import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientThumbnail from "../../components/patient/PatientThumbnail";

const ScheduleAppointment: FC = () => {
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
            <div className="py-2 border-b border-b-[#B6DBF5] mb-2">
              <div className="">病人紀錄</div>
            </div>
            {temp_db.map((idx, kkk) => (
              <div className="px-3 py-1 flex justify-between">
                <div
                  className="flex flex-row"
                  key={idx.name + idx.telephone + kkk}
                >
                  <div>{idx.name}</div>
                  <div className="pl-2">{idx.telephone}</div>
                </div>
                <div className="border-b border-[#B6DBF5]">view</div>
              </div>
            ))}
            <div className="py-2 border-b border-b-[#B6DBF5]"></div>
          </div>
        </div>
        {/* Appointment Asset Tools Information */}
        <div className="absolute w-full bottom-[80px] px-3">
          <div className="w-full font-mont text-sm text-center pl-3 flex flex-row">
            <div
              className="grow rounded-lg bg-[#D3E7F6] p-3 text-[#64B3EC]"
              onClick={() => navigate("/home")}
            >
              Cancel
            </div>
            <div
              className="grow rounded-lg bg-[#64B3EC] p-3 text-white ml-4"
              onClick={() => navigate("/addappointment")}
            >
              Confirm
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={2} />
      </div>
    </div>
  );
};

export default ScheduleAppointment;

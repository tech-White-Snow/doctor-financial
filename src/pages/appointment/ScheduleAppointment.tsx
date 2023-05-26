import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";
import checkIcon from "../../assets/icons/check_ico.svg";
import downIcon from "../../assets/icons/down_ico.svg";

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
  const [recordStatus, setRecordStatus] = useState<boolean[]>([]);

  useEffect(() => {
    setRecordStatus(Array(recordStatus.length).fill(false));
  }, []);

  const setRecordStatusAtIndex = (id: number) => {
    const newRecordStatus = [...recordStatus];
    newRecordStatus.map((idx, kkk) => {
      newRecordStatus[kkk] = false;
    });
    newRecordStatus[id] = true;
    setRecordStatus(newRecordStatus);
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Add Appointment" />
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
              <div
                className="px-3 py-1 flex justify-between"
                key={idx.name + idx.telephone + kkk}
              >
                <div className="flex flex-row">
                  <div
                    className="relative w-[18px] h-[18px] rounded border border-[#64B3EC] p-[1px]"
                    onClick={() => setRecordStatusAtIndex(kkk)}
                  >
                    {recordStatus[kkk] ? (
                      <div className="w-full h-full rounded bg-[#64B3EC]"></div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="px-2">{idx.name}</div>
                  <div>{idx.telephone}</div>
                </div>
                <div
                  className="border-b border-[#B6DBF5]"
                  onClick={() =>
                    navigate("/pastpatientrecord", {
                      state: {
                        name: "張小梅",
                        newdiease: true,
                        telephone: "A12345678(9)",
                        age: 38,
                        sex: 1,
                        doctor: "張大玉",
                        date: "9-9-2022",
                      },
                    })
                  }
                >
                  view
                </div>
              </div>
            ))}
            <div className="py-2 border-b border-b-[#B6DBF5]"></div>
          </div>
        </div>
        {/* Scheduling the appointment date */}
        <div className="px-7 pt-4 mb-[160px]">
          <div>
            <div
              className="text-base font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              預約到診日期
            </div>
            <div className="relative rounded-lg border border-[#25617B] mt-2">
              <div className="text-xs">
                <input
                  className="w-full h-full rounded-lg py-3 px-2"
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div className="absolute top-4 right-2">
                <img src={downIcon} className="max-w-none" />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div
              className="text-base font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              預約到診時間
            </div>
            <div className="relative rounded-lg border border-[#25617B] mt-2">
              <div className="text-xs">
                <input
                  className="w-full h-full rounded-lg py-3 px-2"
                  placeholder="HH : MM"
                />
              </div>
              <div className="absolute top-4 right-2">
                <img src={downIcon} className="max-w-none" />
              </div>
            </div>
          </div>
        </div>
        {/* Appointment Asset Tools Information */}
        <div className="absolute w-full bottom-[80px] px-3">
          <div className="w-full text-sm text-center flex flex-row">
            <div
              className="grow rounded-lg bg-[#D3E7F6] p-3 text-[#64B3EC] mr-1"
              onClick={() => navigate("/home")}
            >
              Cancel
            </div>
            <div
              className="grow rounded-lg bg-[#64B3EC] p-3 text-white ml-1"
              onClick={() => navigate("/patient")}
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

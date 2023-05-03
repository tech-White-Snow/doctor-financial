import { FC } from "react";

import Theme from "../assets/color";

import Avatar1 from "../assets/avatar1.svg";

import DashBack from "../assets/img/alert_board.png";

import NavBar from "../components/NavBar";
import PatientThumbnail from "../components/patient/PatientThumbnail";

const Home: FC = () => {
  const temp_db = [
    {
      name: "陳小明",
      newdiease: true,
      telephone: "67123456",
      age: 52,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: false,
      telephone: "67123456",
      age: 52,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
    {
      name: "陳小明",
      newdiease: true,
      telephone: "67123456",
      age: 52,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022 / 10:30 a.m.",
    },
  ];

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <div
          className="relative w-full h-40 text-center text-base text-white flex items-center pb-2"
          style={{ background: Theme.COLOR_DEFAULT }}
        >
          <div className="w-full flex flex-row justify-between p-5">
            <div>
              <div className="font-bold font-mont text-5xl">福氣堂</div>
              <div className="font-bold font-sans text-lg tracking-[1rem] ml-4">
                忠醫診所
              </div>
            </div>
            <div className="relative">
              <div className="w-12 h-12 rounded-full border border-white">
                <img src={Avatar1} />
              </div>
              <div
                className="absolute w-2 h-2 top-1 right-1 rounded-full"
                style={{ background: Theme.COLOR_RED }}
              ></div>
              <div className="text-sm text-white pt-1">Ryan</div>
            </div>
          </div>
          <div className="absolute bottom-[-8px] w-full h-8 bg-white rounded-xl"></div>
        </div>
        {/* Main Page */}
        <div className="px-3">
          {/* Dashboard */}
          <div className="relative w-full h-40">
            <div>
              <img src={DashBack} className="w-full h-40" />
            </div>
            <div className="absolute w-full h-40 top-0 left-0 flex flex-col justify-center text-sm text-white text-center font-mont">
              <div>今天已預約的病人： 12人</div>
              <div className="pt-1">最近的預約時間：10:30 a.m.</div>
            </div>
          </div>
          {/* Recent Schedule */}
          <div className="w-full mt-2">
            <div className="text-black text-sm font-mont text-600 py-2 font-bold">
              最近的預約病人
            </div>
            <div className="pb-[75px]">
              {temp_db.map((idx: any) => (
                <PatientThumbnail
                  key={idx.name + idx.telephone}
                  name={idx.name}
                  newdiease={idx.newdiease}
                  telephone={idx.telephone}
                  age={idx.age}
                  sex={idx.sex}
                  doctor={idx.doctor}
                  date={idx.date}
                />
              ))}
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={1} />
      </div>
    </div>
  );
};

export default Home;

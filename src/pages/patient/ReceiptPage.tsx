import { FC, useState } from "react";

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

const ReceiptPage: FC = () => {
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
    toll: 5,
  };
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [curDate, setCurDate] = useState("9-9-2022");
  const [curName, setCurName] = useState("陳小明");
  const [curDiagnosis, setCurDiagnosis] = useState("這是既往史");
  const [curToll, setCurToll] = useState(5);
  const [curDoctorID, setCurDoctorID] = useState("006073");

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="到診證明書" />
        {/* Main Page */}
        <div className="m-4 p-3 shadow-lg rounded-lg">
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
              <span className="border-b border-b-[#64B3EC]">收據</span>
            </div>
          </div>
          {/* User Info */}
          <div>
            <div className="text-sm p-2 mt-3 pb-5 border-b border-b-[#64B3EC]">
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診症日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDate}
                    onChange={(ev) => setCurDate(ev.target.value)}
                    readOnly={!isEditMode}
                  />
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>病人姓名:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curName}
                    onChange={(ev) => setCurName(ev.target.value)}
                  />
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>診斷:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDiagnosis}
                    onChange={(ev) => setCurDiagnosis(ev.target.value)}
                  />
                </span>
              </div>
              <div className="py-1">
                <span style={{ color: Theme.COLOR_DEFAULT }}>收費:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curToll}
                    onChange={(ev: any) => setCurToll(ev.target.value)}
                  />
                </span>
              </div>
              {/* Diagnosis */}
              <div
                className="h-40 flex flex-row justify-center items-center"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                <div>醫師簽名：</div>
                <div className="grow h-40">
                  <textarea
                    className="w-full h-40 p-2 border-black border-opacity-60 resize-none rounded-xl focus:outline-none"
                    style={{ color: Theme.COLOR_GRAY }}
                    readOnly={!isEditMode}
                  />
                </div>
              </div>
              <div className="py-1 text-black text-opacity-60">
                <span>醫師編號:</span>
                <span className="pl-2">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDoctorID}
                    onChange={(ev) => setCurDoctorID(ev.target.value)}
                  />
                </span>
              </div>
              <div className="py-1 text-black text-opacity-60">
                <span style={{ color: Theme.COLOR_DEFAULT }}>簽發日期:</span>
                <span className="pl-2 text-black text-opacity-60">
                  <input
                    type="text"
                    className="focus:outline-none"
                    value={curDate}
                    onChange={(ev) => setCurDate(ev.target.value)}
                  />
                </span>
              </div>
            </div>
            <div
              className="flex flex-row justify-between p-3 text-xs"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>地址: 油麻地彌敦道546號旺角大樓5D</div>
              <div>電話: 2788 2951</div>
            </div>
          </div>
        </div>
        {/* Assistant Tools */}
        <div className="mb-[70px] p-4 flex flex-row justify-end">
          <div className="p-3" onClick={() => setIsEditMode(!isEditMode)}>
            <img src={editIcon} />
          </div>
          <div className="p-3" onClick={() => navigate("/receipt")}>
            <img src={shareIcon} />
          </div>
          <div className="p-3" onClick={() => navigate("/recipe")}>
            <img src={printIcon} />
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default ReceiptPage;

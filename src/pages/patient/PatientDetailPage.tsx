import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";

import shareIcon from "../../assets/icons/share_ico.svg";
import printIcon from "../../assets/icons/print_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PatientDetailPage: FC = () => {
  const location = useLocation();
  const context = location.state;

  const navigate = useNavigate();

  const docHistory = ["處方", "收據", "到診症明書"];

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Admin" />
        {/* Main Page */}
        <div className="px-4 py-3 pb-[80px]">
          {/* Patient Detail Information */}
          <div className="w-full font-mont">
            {/* Name + Age + Date */}
            <div className="flex flex-row justify-between py-2">
              <div
                className="flex flex-row text-base font-bold"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                <div>
                  {context.name}({context.sex == 1 ? "男" : "女"})
                </div>
                <div className="pl-3">{context.age}歲</div>
              </div>
              <div className="text-[#0C2036] text-opacity-80 text-sm">
                {context.date}
              </div>
            </div>
            {/* Details */}
            <div className="flex flex-row text-sm py-1">
              <div style={{ color: Theme.COLOR_DEFAULT }}>身份證號碼:</div>
              <div className="pl-2 text-black text-opacity-60">
                (A123456789)
              </div>
            </div>
            <div className="flex flex-row text-sm py-1">
              <div style={{ color: Theme.COLOR_DEFAULT }}>出生日期:</div>
              <div className="pl-2 text-black text-opacity-60">4-3-1985</div>
            </div>
            <div className="flex flex-row text-sm py-1">
              <div style={{ color: Theme.COLOR_DEFAULT }}>電話:</div>
              <div className="pl-2 text-black text-opacity-60">65123456</div>
            </div>
            <div className="flex flex-row text-sm py-1">
              <div style={{ color: Theme.COLOR_DEFAULT }}>地址:</div>
              <div className="pl-2 text-black text-opacity-60">
                九龍乜乜道31號2樓A室
              </div>
            </div>
            {/* Additional Detail */}
            <div className="flex flex-row text-sm py-5">
              <div className="grow flex flex-row">
                <div style={{ color: Theme.COLOR_DEFAULT }}>緊急聯絡人:</div>
                <div className="pl-2 text-black text-opacity-60">張大玉</div>
              </div>
              <div className="grow flex flex-row">
                <div style={{ color: Theme.COLOR_DEFAULT }}>緊急聯絡電話:</div>
                <div className="pl-2 text-black text-opacity-60">555555</div>
              </div>
            </div>
            {/* Document + Action */}
            <div>
              <div
                className="w-full rounded-lg p-3 text-white text-sm flex flex-row"
                style={{ backgroundColor: Theme.COLOR_DEFAULT }}
              >
                <div className="grow">Document</div>
                <div className="grow">Action</div>
              </div>
              <div className="text-xs px-3">
                {docHistory.map((idx: any) => (
                  <div className="py-1.5 my-1 flex flex-row" key={idx}>
                    <div className="w-1/2 text-black text-opacity-60">
                      {idx}
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <div className="grow text-[#25747B]">
                        <span
                          onClick={() =>
                            navigate(
                              idx == "處方"
                                ? "/recipe"
                                : idx == "收據"
                                ? "/receipt"
                                : "/prescription"
                            )
                          }
                          className="hover:cursor-pointer"
                        >
                          View
                        </span>
                      </div>
                      <div className="grow">
                        <img src={shareIcon} />
                      </div>
                      <div className="grow">
                        <img src={printIcon} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 過往紀錄  */}
              <div className="text-xs">
                <div
                  className="font-bold p-2"
                  style={{ color: Theme.COLOR_DEFAULT }}
                >
                  過往紀錄
                </div>
                <div className="w-full rounded-lg p-3 text-[#64B3EC] bg-[#D3E7F6] flex flex-row">
                  <div className="grow">Document</div>
                  <div className="grow">Action</div>
                </div>
                <div className="px-3">
                  <div className="py-1.5 my-1 flex flex-row">
                    <div className="w-1/2 text-[#0C2036] text-opacity-60">
                      既往史
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <div
                        className="border-b border-b-[#25747B] text-[#25747B] ml-2 hover:cursor-pointer"
                        onClick={() => navigate("/pasthistory")}
                      >
                        View
                      </div>
                    </div>
                  </div>
                  <div className="py-1.5 my-1 flex flex-row">
                    <div className="w-1/2 text-[#0C2036] text-opacity-60">
                      現病史
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <div
                        className="border-b border-b-[#25747B] text-[#25747B] ml-2 hover:cursor-pointer"
                        onClick={() => navigate("/patientrecord")}
                      >
                        View
                      </div>
                    </div>
                  </div>
                  <div className="py-1.5 my-1 flex flex-row">
                    <div className="w-1/2 text-[#0C2036] text-opacity-60">
                      病歷相簿
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <div
                        className="border-b border-b-[#25747B] text-[#25747B] ml-2 hover:cursor-pointer"
                        onClick={() => navigate("/patientalbum")}
                      >
                        View
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Nav Bar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PatientDetailPage;

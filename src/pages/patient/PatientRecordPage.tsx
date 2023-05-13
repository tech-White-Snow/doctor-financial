import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import prevvIcon from "../../assets/icons/prevv_ico.svg";
import nexttIcon from "../../assets/icons/nextt_ico.svg";
import searchIcon from "../../assets/icons/search_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PatientRecordPage: FC = () => {
  const temp_data = [
    {
      name: "陳小明",
      age: 52,
      sex: 1,
      date: "3-2-2022",
      content:
        "這是既往史，這是既往史，往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史。",
    },
    {
      name: "陳小明1",
      age: 25,
      sex: 1,
      date: "5-6-2022",
      content:
        "這是既往史，這是既往史，這是既往史，這是既史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史。",
    },
    {
      name: "陳小明2",
      age: 44,
      sex: 1,
      date: "8-9-2022",
      content:
        "這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史。",
    },
    {
      name: "陳小明3",
      age: 52,
      sex: 1,
      date: "10-12-2022",
      content:
        "是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史，這是既往史。",
    },
  ];

  const [currentSelected, setCurrentSelected] = useState(temp_data.length - 1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const searchPatientRecordHandle = () => {
    if (searchTerm == "") return;
    // show search result
    setIsSearched(true);
  };

  const showCurrentSearchSelectedHandle = (context: any, idx: any) => {
    setIsSearched(false);
    setCurrentSelected(idx);
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header title="現病史" />
        {/* Main Page */}
        <div className="p-4">
          {/* Title */}
          <div className="flex flex-row justify-between font-mont w-full">
            <div
              className="flex flex-row text-base font-bold px-1"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>
                {temp_data[currentSelected].name}(
                {temp_data[currentSelected].sex == 1 ? "男" : "女"})
              </div>
              <div className="pl-3">{temp_data[currentSelected].age}歲</div>
            </div>
            {isSearched ? (
              <div className="text-sm text-[#25617B] text-opacity-80">
                4 項搜尋結果
              </div>
            ) : (
              <div className="text-sm text-[#0C2036] text-opacity-80">
                {temp_data[currentSelected].date}
              </div>
            )}
          </div>
          {/* Content */}
          {!isSearched ? (
            // Searchable ...
            <div
              className="text-xs pt-8 px-3 flex justify-between"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              {currentSelected > 0 ? (
                <div
                  className="px-2 flex items-center"
                  onClick={() =>
                    setCurrentSelected(
                      currentSelected > 0 ? currentSelected - 1 : 0
                    )
                  }
                >
                  <img src={prevvIcon} className="w-20" />
                </div>
              ) : (
                <div className="w-20 mx-2"></div>
              )}
              <div>{temp_data[currentSelected].content}</div>
              {currentSelected < temp_data.length - 1 ? (
                <div
                  className="px-2 flex items-center"
                  onClick={() =>
                    setCurrentSelected(
                      currentSelected < temp_data.length - 1
                        ? currentSelected + 1
                        : temp_data.length - 1
                    )
                  }
                >
                  <img src={nexttIcon} className="w-20" />
                </div>
              ) : (
                <div className="w-20 mx-2"></div>
              )}
            </div>
          ) : (
            // Searched Result Boxes
            <div className="w-full p-4">
              <div className="relative">
                {temp_data.map((idx: any, kkk: any) => (
                  <div
                    className="absolute p-4 rounded-xl border border-[#D3E7F6] shadow-lg bg-white"
                    key={idx.date + kkk}
                    style={{ top: kkk * 75 + 20, zIndex: kkk }}
                    onClick={() => showCurrentSearchSelectedHandle(idx, kkk)}
                  >
                    <div>
                      診症日期：
                      <span className="px-1">{idx.date}</span>
                    </div>
                    <div className="p-2">{idx.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Search Box */}
      <div className="absolute w-full bottom-[60px] px-3 z-20">
        <div className="w-full px-3 pb-8">
          {/* Scheduled Patient List */}
          <div>
            <div className="pt-2 relative">
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-center p-2 pr-8"
                placeholder="請輸入關鍵字"
                onChange={(ev) => setSearchTerm(ev.target.value)}
              />
              <div
                className="absolute right-3 top-[26px] text-[10px] text-[#25747B]"
                onClick={() => searchPatientRecordHandle()}
              >
                <img src={searchIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* NavBar */}
      <NavBar status={4} />
    </div>
  );
};

export default PatientRecordPage;

import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";
import { BACKEND_URL } from "../../constants";

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
  const location = useLocation();

  const _context = location.state.context;

  const [ptCardList, setPtCardList] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const getPatientMedicalHistory = async () => {
    const patientID = _context.patientid;
    const doctorID = "";
    const data = { patientID, doctorID };
    await fetch(BACKEND_URL + "/getpthistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get Patient Detail by ID successfully!");
        if (data.data.length > 0) {
          setPtCardList(data.data);
          setCurrentSelected(data.data.length - 1);
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
      if (_context) getPatientMedicalHistory();
    }
  }, [navigate]);

  const searchPatientRecordHandle = () => {
    // show search result
    setIsSearched(true);
  };

  const showCurrentSearchSelectedHandle = (context: any, idx: any) => {
    setIsSearched(false);
    setCurrentSelected(idx);
  };

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="relative">
      <div className="relative h-screen overflow-y-auto">
        {/* Header */}
        <Header title="現病史" />
        {/* Main Page */}
        <div className="p-4">
          {/* Title */}
          <div className="flex flex-row justify-between w-full">
            <div
              className="flex flex-row text-base font-bold px-1"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>
                {_context ? _context.name : ""} (
                {_context ? (_context.sex == 1 ? "男" : "女") : ""})
              </div>
              <div className="pl-3">{_context ? _context.age : ""}歲</div>
            </div>
            {isSearched ? (
              <div className="text-sm text-[#25617B] text-opacity-80">
                {
                  ptCardList.filter((idx: any) =>
                    idx.detail.includes(searchTerm)
                  ).length
                }{" "}
                項搜尋結果
              </div>
            ) : (
              <div className="text-sm text-[#0C2036] text-opacity-80">
                {ptCardList && ptCardList.length > 0
                  ? getOnlyDate1((ptCardList[currentSelected] as any).date)
                  : ""}
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
                  className="px-2 flex items-center justify-left"
                  onClick={() =>
                    setCurrentSelected(
                      currentSelected > 0 ? currentSelected - 1 : 0
                    )
                  }
                >
                  <img src={prevvIcon} className="max-w-none" />
                </div>
              ) : (
                <div className="w-7"></div>
              )}
              <div className="w-2/3" style={{ overflowWrap: "break-word" }}>
                {ptCardList && ptCardList.length > 0
                  ? (ptCardList[currentSelected] as any).detail
                  : ""}
              </div>
              {currentSelected < ptCardList.length - 1 ? (
                <div
                  className="px-2 flex items-center justify-right"
                  onClick={() =>
                    setCurrentSelected(
                      currentSelected < ptCardList.length - 1
                        ? currentSelected + 1
                        : ptCardList.length - 1
                    )
                  }
                >
                  <img src={nexttIcon} className="max-w-none" />
                </div>
              ) : (
                <div className="w-7"></div>
              )}
            </div>
          ) : (
            // Searched Result Boxes
            <div className="w-full p-4">
              <div className="relative hover:cursor-pointer text-[#0C2036] text-opacity-80">
                {ptCardList
                  .filter((idx: any) => idx.detail.includes(searchTerm))
                  .map((idx: any, kkk: any) => (
                    <div
                      className="absolute p-4 rounded-xl border border-[#D3E7F6] shadow-lg bg-white w-full"
                      key={idx.date + kkk}
                      style={{ top: kkk * 75 + 20, zIndex: kkk }}
                      onClick={() => showCurrentSearchSelectedHandle(idx, kkk)}
                    >
                      <div>
                        診症日期：
                        <span className="px-1">{getOnlyDate1(idx.date)}</span>
                      </div>
                      <div
                        className="p-3"
                        style={{ width: "100%", overflowWrap: "break-word" }}
                      >
                        {idx.detail}
                      </div>
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
                <img src={searchIcon} className="max-w-none" />
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

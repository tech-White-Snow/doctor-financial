import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../assets/color";
import { BACKEND_URL } from "../constants";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";
import editIcon from "../assets/icons/edit_ico1.svg";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientResultItem from "../components/patient/PatientResultItem";

const PastHistoryPage: FC = () => {
  const location = useLocation();
  const context = location.state.context;
  console.log("pasthistory -> ", context);

  const [isEditMode, setIsEditMode] = useState(false);
  const [contentText, setContentText] = useState("");
  const [contentDate, setContentDate] = useState("");

  const getPatientPastHistory = async () => {
    const cardid = context.cardid;
    const data = { cardid };
    await fetch(BACKEND_URL + "/getptcardsbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get Patient Card Information successfully!");
        console.log("--", data.data[0]);
        if (data.data.length > 0) {
          setContentText(data.data[0].pasthistory);
          setContentDate(data.data[0].pasthistorydate);
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
    setIsEditMode(false);
  };

  const navigate = useNavigate();
  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
      getPatientPastHistory();
    }
  }, [navigate]);

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  const updatePatientHistoryHandler = async () => {
    const cardid = context.cardid;
    const historydata = contentText;
    const historydate = getOnlyDate1(new Date());
    const data = { cardid, historydata, historydate };
    await fetch(BACKEND_URL + "/updateptcardpasthistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Patient Past History successfully!");
        setContentDate(historydate);
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
    setIsEditMode(false);
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="既往史" />
        {/* Main Page */}
        <div className="p-4">
          {/* Title */}
          <div className="flex flex-row justify-between">
            <div
              className="flex flex-row text-base font-bold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              <div>
                {context ? context.name : ""} (
                {context ? (context.sex == 1 ? "男" : "女") : ""})
              </div>
              <div className="pl-3">{context ? context.age : ""}歲</div>
            </div>
            <div className="text-sm text-[#0C2036] text-opacity-80">
              {context ? getOnlyDate1(new Date().toString()) : ""}
            </div>
          </div>
          {/* Content */}
          <div
            className="text-xs pt-4 px-3"
            style={{ color: Theme.COLOR_DEFAULT }}
          >
            <textarea
              className="w-full h-[240px] resize-h-none focus:outline-none p-2 rounded-lg border border-[#64B3EC]"
              value={contentText}
              onChange={(ev) => setContentText(ev.target.value)}
              readOnly={!isEditMode}
            />
          </div>
        </div>
        {/* Edit Box */}
        <div className="absolute w-full bottom-[70px] right-3 p-4">
          {isEditMode ? (
            <div className="w-full text-sm text-center pl-3 flex flex-row">
              <div
                className="grow rounded-lg bg-[#D3E7F6] p-2 text-[#64B3EC]"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </div>
              <div
                className="grow rounded-lg bg-[#64B3EC] p-2 text-white ml-4"
                onClick={() => updatePatientHistoryHandler()}
              >
                Confirm
              </div>
            </div>
          ) : (
            <div>
              <div
                className="flex justify-end p-1"
                onClick={() => setIsEditMode(true)}
              >
                <img src={editIcon} className="max-w-none" />
              </div>
              <div
                className="pt-3 text-right text-[15px]"
                style={{ color: Theme.COLOR_DEFAULT }}
              >
                最後更新：
                {contentDate}
              </div>
            </div>
          )}
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PastHistoryPage;

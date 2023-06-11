import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";
import { BACKEND_URL } from "../constants";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";
import searchIcon from "../assets/icons/search_ico.svg";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientThumbnail from "../components/patient/PatientThumbnail";

const SearchPage: FC = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    }
  }, [navigate]);

  const updateDateTimeFormat = (dateTimeString: any) => {
    const isoString = dateTimeString.toISOString();
    const formattedDate = isoString.replace("T", " ").replace(/\.\d+Z$/, "");
    return formattedDate;
  };

  const viewSearchResultHandler = async () => {
    const curDate = updateDateTimeFormat(new Date());
    const data = { searchText, curDate };
    await fetch(BACKEND_URL + "/getptcardpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get searched patient card for payment successfully!");
        console.log("ptcardspayment -> ", data);
        if (data.data.length > 0)
          navigate("/searchresult", {
            state: { context: data.data, searchtext: searchText },
          });
        else setErrorMessage("Search data not found!");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Search" />
        {/* Main Page */}
        <div className="w-full px-3 pb-8">
          {/* Scheduled Patient List */}
          <div>
            <div className="pt-2 relative">
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs text-center p-2 pr-8"
                placeholder="請輸入關鍵字"
                value={searchText}
                onChange={(ev) => setSearchText(ev.target.value)}
              />
              <div
                className="absolute right-3 top-[26px] text-[10px] text-[#25747B]"
                onClick={() => viewSearchResultHandler()}
              >
                <img src={searchIcon} className="max-w-none" />
              </div>
            </div>
            <div className="py-2 text-center text-red-500">{errorMessage}</div>
          </div>
        </div>
        <div className="absolute w-full bottom-[80px] px-3">
          <div
            className="rounded-[10px] bg-[#64B3EC] hover:bg-[#6D7D8B] text-white text-center text-sm p-3"
            onClick={() => viewSearchResultHandler()}
          >
            Search
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={3} />
      </div>
    </div>
  );
};

export default SearchPage;

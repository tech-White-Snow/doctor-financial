import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";
import { BACKEND_URL } from "../constants";

import Avatar1 from "../assets/avatar1.svg";
import DashBack from "../assets/img/alert_board.png";

import NavBar from "../components/NavBar";
import Header from "../components/Header";
import PatientResultItem from "../components/patient/PatientResultItem";

const AdminPage: FC = () => {
  const navigate = useNavigate();

  const [context, setContext] = useState([]);

  const updateDateTimeFormat = (dateTimeString: any) => {
    const isoString = dateTimeString.toISOString();
    const formattedDate = isoString.replace("T", " ").replace(/\.\d+Z$/, "");
    return formattedDate;
  };

  const viewSearchResultHandler = async () => {
    const curDate = updateDateTimeFormat(new Date());
    const searchText = null;
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
        setContext(data.data);
        console.log("--->", data.data);
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
      viewSearchResultHandler();
    }
  }, [navigate]);

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="Admin" />
        {/* Main Page */}
        <div className="px-3">
          {/* Scheduled Patient List */}
          <div className="w-full">
            <div className="pb-[75px]">
              {context
                .sort(
                  (a: any, b: any) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((idx: any) => (
                  <PatientResultItem
                    key={idx.name + idx.telephone + idx.doctor}
                    cardid={1}
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
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default AdminPage;

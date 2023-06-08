import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../assets/color";

import Avatar1 from "../assets/avatar1.svg";
import AvatarSample from "../assets/img/profile_sample.jpeg";

import DashBack from "../assets/img/alert_board.png";

import NavBar from "../components/NavBar";
import PatientThumbnail from "../components/patient/PatientThumbnail";

interface UserData {
  username: string;
}

const Home: FC = () => {
  const [cardsArray, setCardsArray] = useState([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate();

  const updateDateTimeFormat = (dateTimeString: any) => {
    const isoString = dateTimeString.toISOString();
    const formattedDate = isoString.replace("T", " ").replace(/\.\d+Z$/, "");
    return formattedDate;
  };

  // get patient cards from backend
  const getPatientCards = async (user: any) => {
    const doctorID = user.doctorid;
    const curDate = updateDateTimeFormat(new Date());
    const data = { doctorID, curDate };
    await fetch("http://localhost:8000/getptcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("homedata -> ", data.data);
        setCardsArray(data.data.slice(0, 4));
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
      setUserData(JSON.parse(token).user);
      // fetch patient card information from backend
      getPatientCards(JSON.parse(token).user);
    }
  }, [navigate]);

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <div
          className="relative w-full h-40 text-center text-base text-white flex items-center pb-2"
          style={{ background: Theme.COLOR_DEFAULT }}
        >
          <div className="w-full flex flex-row justify-between p-8">
            <div className="font-bold text-5xl">福氣堂</div>
            <div className="relative">
              <div
                className="rounded-full border-none"
                onClick={() => navigate("/viewaccount", { state: { mode: 1 } })}
              >
                <img
                  src={AvatarSample}
                  className="w-12 h-12 max-w-none rounded-full"
                />
              </div>
              <div
                className="absolute w-2 h-2 top-1 right-1 rounded-full"
                style={{ background: Theme.COLOR_RED }}
              ></div>
              <div className="text-sm text-white pt-1">
                {userData && userData.username ? userData.username : ""}
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-8px] w-full h-8 bg-white rounded-xl"></div>
        </div>
        {/* Main Page */}
        <div className="px-3">
          {/* Dashboard */}
          <div className="p-4" onClick={() => navigate("/addappointment")}>
            <div
              className="w-full rounded-xl text-sm text-white text-center p-3"
              style={{ background: Theme.COLOR_DEFAULT }}
            >
              登 記
            </div>
          </div>
          {/* Recent Schedule */}
          <div className="w-full mt-2">
            <div className="text-black text-sm text-600 py-2 font-bold">
              最近的預約病人
            </div>
            <div className="pb-[75px]">
              {cardsArray.map((idx: any) => (
                <PatientThumbnail
                  key={idx.name + idx.telephone + idx.doctor}
                  context={idx}
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

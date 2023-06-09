import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import uploadIcon from "../../assets/icons/upload_ico.svg";
import cameraIcon from "../../assets/icons/camera_ico.svg";
import BlankImage from "../../assets/img/blank_image.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const PatientAlbumPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = location.state.context;

  const [patientCardList, setPatientCardList] = useState([]);

  const getPatientAlbumHistory = async () => {
    const patientID = context.patientid;
    const data = { patientID };
    await fetch("http://localhost:8000/getptcardbypatientid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get Patient Detail by patientID successfully!");
        if (data.data.length > 0) setPatientCardList(data.data);
        console.log("patient album info -->", data.data);
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
      if (context) getPatientAlbumHistory();
    }
  }, [navigate]);

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="病歷相簿" />
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
              <div className="pl-3">{context ? context.age : ""} 歲</div>
            </div>
            <div className="text-sm text-[#0C2036] text-opacity-80">
              {context ? getOnlyDate1(context.date) : ""}
            </div>
          </div>
          {/* Content */}
          <div
            className="text-xs pt-5 px-3 pb-[80px]"
            style={{ color: Theme.COLOR_DEFAULT }}
          >
            {patientCardList.map((idx: any, kkk: any) => (
              <div className="relative py-2" key={"ptcardlist" + kkk}>
                {kkk != 0 ? (
                  <div className="text-[#64B3EC] text-sm font-bold py-1">
                    {getOnlyDate1(idx.date)}
                  </div>
                ) : (
                  <></>
                )}
                <div className="text-[#276D36] px-2">{idx.albumtext}</div>
                <div className="flex flex-row pt-2 justify-between">
                  {idx.album ? (
                    <div className="flex flex-row overflow-x-auto">
                      {idx.album.split(", ").map((idxx: any, kkkk: any) =>
                        kkkk != 0 ? (
                          <div className="px-2" key={"kkkk" + kkkk}>
                            <img
                              src={"http://localhost:8000/uploads/" + idxx}
                              className="h-24 max-w-none"
                            />
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-row">
                      <div className="px-2">
                        <img src={BlankImage} className="max-w-none" />
                      </div>
                      <div className="px-2">
                        <img src={BlankImage} className="max-w-none" />
                      </div>
                    </div>
                  )}
                  {kkk == 0 ? (
                    <div className="flex flex-row items-end">
                      <div className="px-1 pb-1">
                        <img src={uploadIcon} className="max-w-none" />
                      </div>
                      <div className="px-1">
                        <img src={cameraIcon} className="max-w-none" />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {kkk == 0 ? (
                  <div
                    className="absolute top-2 right-1"
                    onClick={() =>
                      navigate("/editalbum", {
                        state: {
                          context: context,
                          album: patientCardList ? patientCardList[0] : null,
                        },
                      })
                    }
                  >
                    <img src={editIcon} className="max-w-none" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default PatientAlbumPage;

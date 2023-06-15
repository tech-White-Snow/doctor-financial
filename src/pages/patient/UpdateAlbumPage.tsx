import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Theme from "../../assets/color";
import { BACKEND_URL } from "../../constants";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import editIcon from "../../assets/icons/edit_ico1.svg";
import closeIcon from "../../assets/icons/close_ico2.svg";
import removeIcon from "../../assets/icons/remove_ico1.svg";
import prevIcon from "../../assets/icons/prev_ico1.svg";
import nextIcon from "../../assets/icons/next_ico1.svg";
import blankImgIcon from "../../assets/icons/blankimg_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientResultItem from "../../components/patient/PatientResultItem";

const UpdateAlbumPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // get requested data
  const context = location.state.context;
  const context_extra = location.state.context_extra;
  // const _albumdata = location.state.album;

  const [currentSelect, setCurrentSelect] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [albumData, setAlbumData] = useState<any>({});

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
      // calc total album count
      if (context) {
        updateAlbumDataHandler();
      }
    }
  }, [navigate]);

  const updateAlbumDataHandler = async () => {
    // update album data
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
        console.log("Update Album Image Data successfully!");
        console.log("albumdata->", data.data);
        if (data.data.length > 0) {
          setAlbumData(data.data[0]);
          setTotalCount(data.data[0].album.split(", ").length);
        }
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  // Remove Current Select Album Image
  const removeCurrentAlbumImageHandler = async () => {
    const cardID = albumData.cardid;
    const rmImgName = albumData.album.split(", ")[currentSelect];
    // remove on backend
    const data = { cardID, rmImgName };
    await fetch(BACKEND_URL + "/removealbumimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Remove Current Select Album Image successfully!");
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
    updateAlbumDataHandler();
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
                {context
                  ? context.name
                    ? context.name
                    : context_extra.name
                  : ""}{" "}
                (
                {context
                  ? context.sex
                    ? context.sex == 1
                      ? "男"
                      : "女"
                    : context_extra.sex == 1
                    ? "男"
                    : "女"
                  : ""}
                )
              </div>
              <div className="pl-3">
                {context ? (context.age ? context.age : context_extra.age) : ""}
                歲
              </div>
            </div>
            <div className="text-sm text-[#0C2036] text-opacity-80">
              {context ? getOnlyDate1(context.date) : ""}
            </div>
          </div>
          {/* Image */}
          <div className="relative w-full flex flex-col justify-center">
            <div className="absolute w-full p-2 top-2 flex flex-row justify-between items-center">
              <div onClick={() => navigate(-1)}>
                <img src={closeIcon} className="max-w-none" />
              </div>
              <div className="flex flex-row">
                {/* <div>
                  <img src={editIcon} className="max-w-none" />
                </div> */}
                {context && context.name ? (
                  <div
                    className="pl-3"
                    onClick={() => removeCurrentAlbumImageHandler()}
                  >
                    <img src={removeIcon} className="max-w-none" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-center w-full justify-between overflow-x-auto items-center">
              {currentSelect > 1 ? (
                <div
                  onClick={() => setCurrentSelect(currentSelect - 1)}
                  className="absolute left-0"
                >
                  <img src={prevIcon} className="max-w-none" />
                </div>
              ) : (
                <></>
              )}
              <div className="w-full py-2">
                {albumData && albumData.album ? (
                  <img
                    src={
                      BACKEND_URL +
                      "/uploads/" +
                      albumData.album.split(", ")[currentSelect]
                    }
                    className="max-w-none w-full"
                  />
                ) : (
                  <div className="w-full h-[400px] flex justify-center">
                    <div className="flex justify-center items-center">
                      <img src={blankImgIcon} className="max-w-none w-6 h-6" />
                    </div>
                  </div>
                )}
              </div>
              {currentSelect < totalCount - 1 ? (
                <div
                  onClick={() => setCurrentSelect(currentSelect + 1)}
                  className="absolute right-0"
                >
                  <img src={nextIcon} className="max-w-none" />
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="pb-[80px] text-[#64B3EC] text-xs px-3">
              {albumData.albumtext}
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={4} />
      </div>
    </div>
  );
};

export default UpdateAlbumPage;

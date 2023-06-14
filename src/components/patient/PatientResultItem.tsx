import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Theme from "../../assets/color";
import { BACKEND_URL } from "../../constants";

import nextIcon from "../../assets/icons/next_ico.svg";
import tickBlueIcon from "../../assets/icons/tick_blue_ico.svg";

import PatientResultItemIcon from "../../assets/icons/patient_thumbnail.svg";
import SelectedResultItemIcon from "../../assets/icons/selected_ico.svg";

interface PatientResultItemProps {
  mode: number; // 1 : searchresult, 2 : admin page
  cardid: number;
  name: string;
  newdiease: boolean;
  telephone: string;
  age: number;
  sex: number;
  doctor: string;
  date: string;
}

const PatientResultItem: FC<PatientResultItemProps> = ({
  mode,
  cardid,
  name,
  newdiease,
  telephone,
  age,
  sex,
  doctor,
  date,
}) => {
  const navigate = useNavigate();

  const browsePatientDetail = () => {
    navigate("/patientdetail", {
      state: {
        cardid: cardid,
        date: date,
      },
    });
  };

  const [isLongClick, setIsLongClick] = useState(false);
  const [isPaidClick, setIsPaidClick] = useState(false);
  const [isHideCard, setIsHideCard] = useState(false);

  let timeout: NodeJS.Timeout;

  const handleMouseDown = () => {
    if (mode == 1) {
      if (!isLongClick) {
        // setIsLongClick(false);
        timeout = setTimeout(() => {
          setIsLongClick(true);
        }, 1000); // set the duration of the long click here
      }
    }
  };

  const handleMouseUp = () => {
    clearTimeout(timeout);
    // setIsLongClick(false);
  };

  // remove and hide paid card after click
  const removePaidCardHandler = async () => {
    // update backend for paid
    const data = { cardid };
    await fetch(BACKEND_URL + "/updatecardpaid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Card Paid Status successfully!");
        setIsHideCard(true);
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const getOnlyDate1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}-${(
      "0" + date.getDate()
    ).slice(-2)}-${date.getFullYear()}`;

    return formattedDate;
  };

  const checkPaymentCardExist = async () => {
    const data = { cardid };
    await fetch(BACKEND_URL + "/checkptcardpaymentstate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Get searched patient card for payment successfully!");
        if (data.status == "false") setIsHideCard(true);
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    } else {
      // update search result
      if (mode == 1) {
        checkPaymentCardExist();
      }
    }
  }, [navigate]);

  return !isHideCard ? (
    <div
      className="my-3 shadow-lg rounded-xl"
      onClick={() => {
        // if (!isLongClick) browsePatientDetail();
      }}
    >
      <div className="relative h-full flex flex-col justify-center">
        {/* Image */}
        <div className="flex flex-row justify-center text-center">
          <div
            className="flex justify-center w-[72px]"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          >
            {isLongClick ? (
              isPaidClick ? (
                <div
                  onClick={() => {
                    if (mode == 1) {
                      setIsPaidClick(false);
                      setIsLongClick(false);
                    }
                  }}
                  className="w-[61px] h-[61px] bg-[#64B3EC] rounded-full m-1 flex justify-center items-center"
                >
                  <div>
                    <img src={tickBlueIcon} className="max-w-none" />
                  </div>
                </div>
              ) : (
                <div
                  className="w-[61px] h-[61px] m-1 border-4 border-[#64B3EC] bg-transparent rounded-full"
                  onClick={() => setIsPaidClick(true)}
                ></div>
              )
            ) : (
              <div className="h-[69px] flex justify-center items-center">
                <div>
                  <img
                    src={PatientResultItemIcon}
                    className="w-[26px] h-[35px] max-w-none"
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className={
              "grow flex flex-row justify-between items-center text-xs text-left pl-2 " +
              (isPaidClick ? "bg-[#64B3EC28]" : "bg-white")
            }
            onClick={() => {
              if (!isPaidClick) browsePatientDetail();
              else removePaidCardHandler();
            }}
          >
            <div className="grow flex flex-row justify-between">
              <div>
                <div style={{ color: Theme.COLOR_DEFAULT }}>{name}</div>
                <div className="pt-1">
                  <span className="text-black">電話:</span>
                  <span className="text-black text-opacity-60">
                    {telephone}
                  </span>
                </div>
              </div>
              <div className="h-full flex flex-col">
                <div className="text-black text-opacity-60">
                  {getOnlyDate1(date)}
                </div>
                {isPaidClick ? (
                  <div
                    className="grow text-[20px] font-medium text-right justify-center pt-2 z-10"
                    style={{ color: Theme.COLOR_DEFAULT }}
                  >
                    PAID
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="p-2 pl-4 flex justify-center">
              <img src={nextIcon} className="max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PatientResultItem;

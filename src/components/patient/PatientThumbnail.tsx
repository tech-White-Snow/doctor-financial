import { FC, useState } from "react";

import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../constants";

import closeIcon from "../../assets/icons/close_ico1.svg";
import subMenuItemIcon from "../../assets/icons/submenu_item_ico.svg";

import Theme from "../../assets/color";

import patientThumbnailIcon from "../../assets/icons/patient_thumbnail.svg";

interface PatientThumbnailProps {
  context: any;
}

const PatientThumbnail: FC<PatientThumbnailProps> = ({ context }) => {
  const navigate = useNavigate();

  const [isCheckPatientOpen, setIsCheckPatientOpen] = useState(false);
  const [isOpenItemMenu, setIsOpenItemMenu] = useState(false);
  const [isItemDeleteOpen, setIsItemDeleteOpen] = useState(false);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  // change date time format
  const changeDateTimeFormat = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()} /
${
  date.getHours() > 12
    ? date.getHours() - 12
    : date.getHours() === 0
    ? 12
    : date.getHours()
}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${
      date.getHours() >= 12 ? "p.m." : "a.m."
    }`;

    return formattedDate;
  };

  // change date time format - 1
  const changeDateTimeFormat1 = (dateString: any) => {
    const date = new Date(dateString);

    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()} ${(
      "0" +
      (date.getUTCHours() > 12
        ? date.getUTCHours() - 12
        : date.getUTCHours() === 0
        ? 12
        : date.getUTCHours())
    ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} ${
      date.getUTCHours() >= 12 ? "p.m." : "a.m."
    }`;

    return formattedDate;
  };

  // calculate age of patient with birthday
  const getPatientAge = (dateString: any) => {
    const birthDate = new Date(dateString);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  };

  // delete Thumbnail
  const deleteThumbnailHanlder = async () => {
    // call backend for delete current thumbnail
    const data = { context };
    await fetch(BACKEND_URL + "/deleteptcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete Patient Card Succeed!");

        setIsItemDeleted(true);
        setIsItemDeleteOpen(false);
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  return (
    <div className={isItemDeleted ? "hidden" : "block"}>
      <div
        className="px-2 py-4 my-3 shadow-lg rounded-xl hover:bg-[#D3E7F6]"
        onClick={() => setIsCheckPatientOpen(true)}
      >
        <div className="relative h-32 flex">
          {/* Image */}
          <div className="w-1/3 flex flex-col justify-center text-center">
            <div className="flex justify-center">
              <img src={patientThumbnailIcon} className="max-w-none" />
            </div>
            <div
              className="text-sm pt-2"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              {context.name}
            </div>
            <div
              className="text-xs pt-1"
              style={{ color: Theme.COLOR_SELECTED }}
            >
              {context.newdiease ? "新症" : ""}
            </div>
          </div>
          {/* Content */}
          <div className="w-2/3 text-xs">
            <div>
              <span>電話 ：</span>
              <span className="text-black text-opacity-60">
                {context.telephone}
              </span>
            </div>
            <div>
              <span>年齡 ：</span>
              <span className="text-black text-opacity-60">
                {getPatientAge(context.birthday)}
              </span>
            </div>
            <div>
              <span>性別 ：</span>
              <span className="text-black text-opacity-60">
                {context.sex == 1 ? "男" : "女"}
              </span>
            </div>
          </div>
          {/* Note */}
          <div className="absolute bottom-1 right-4 text-xs">
            <div>
              <span>主診醫師: </span>
              <span className="text-black text-opacity-60">
                {context.doctor}
              </span>
            </div>
            <div>{changeDateTimeFormat(context.date)}</div>
          </div>
          {/* Top-Right Sub Menu Item */}
          <div
            className="absolute right-1 top-0 w-3 h-3 z-10 flex flex-col justify-center"
            onClick={() => setIsOpenItemMenu(true)}
          >
            <div className="relative">
              <img src={subMenuItemIcon} className="max-w-none" />
              {isOpenItemMenu ? (
                <div className="absolute top-2 right-1 text-[#64B3EC] text-[11px] border border-[#64B3EC] w-20">
                  {/* <div
                    className="w-full px-3 py-1 border-b border-b-[#64B3EC] hover:bg-[#D3E7F6]"
                    onClick={() => navigate("/scheduleappointment")}
                  >
                    Edit
                  </div> */}
                  <div
                    className="w-full px-3 py-1 hover:bg-[#D3E7F6]"
                    onClick={() => setIsItemDeleteOpen(true)}
                  >
                    Delete
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {isCheckPatientOpen && !isOpenItemMenu ? (
        <div className="absolute w-full h-full bg-[#AAAAAAAA] z-20 top-0 left-0 flex flex-col justify-center">
          <div className="relative m-3 px-9 py-5 bg-[#D3E7F6] rounded-lg text-[#25617B]">
            <div className="flex flex-row bg-[#D3E7F6] bg-opacity-40 font-sans font-bold text-sm">
              <div>{context.name}</div>
              <div className="pl-2">{context.telephone}</div>
            </div>
            <div
              className="absolute top-5 right-5"
              onClick={() => setIsCheckPatientOpen(false)}
            >
              <img src={closeIcon} className="max-w-none" />
            </div>
            <div className="text-xs">
              預約時間：{changeDateTimeFormat1(context.date)}
            </div>
            <div
              className="text-xl font-bold text-center tracking-[.75rem] pl-2 py-2 border border-[#25617B] rounded-lg mt-3"
              onClick={() =>
                navigate("/checkpatient", {
                  state: {
                    context: context,
                  },
                })
              }
            >
              開始診斷
            </div>
            <div
              className="text-xl font-bold text-center tracking-[.75rem] pl-2 py-2 border border-[#25617B] rounded-lg mt-3"
              onClick={() => {
                navigate("/pastpatientrecord", {
                  state: {
                    context: context,
                  },
                });
              }}
            >
              查閱病歷
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isItemDeleteOpen ? (
        <div className="absolute w-full h-full bg-[#AAAAAAAA] z-20 top-0 left-0 flex flex-col justify-center">
          <div className="relative m-3 px-9 py-5 bg-[#D3E7F6] rounded-lg text-[#25617B]">
            <div className="flex flex-row bg-[#D3E7F6] bg-opacity-40 font-sans font-bold text-sm justify-center">
              <div>{context.name}</div>
              <div className="pl-2">{context.telephone}</div>
            </div>
            <div
              className="absolute top-5 right-5"
              onClick={() => setIsItemDeleteOpen(false)}
            >
              <img src={closeIcon} className="max-w-none" />
            </div>
            <div className="text-xs text-center">
              預約時間：{changeDateTimeFormat1(context.date)}
            </div>
            <div
              className="text-xl font-bold text-center tracking-[.75rem] pl-2 py-2 border border-[#25617B] rounded-lg mt-3"
              onClick={() => deleteThumbnailHanlder()}
            >
              取消預約
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PatientThumbnail;

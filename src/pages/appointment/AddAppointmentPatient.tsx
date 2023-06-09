import { FC, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";
import downIcon from "../../assets/icons/down_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientThumbnail from "../../components/patient/PatientThumbnail";

const AddAppointmentPatient: FC = () => {
  const temp_db = [
    {
      name: "陳小明",
      newdiease: true,
      telephone: "A123456(7)",
      age: 22,
      sex: 1,
      doctor: "黃文智醫師",
      date: "9-9-2022",
    },
    {
      name: "小明陳",
      newdiease: false,
      telephone: "671234562",
      age: 19,
      sex: 1,
      doctor: "黃文智醫",
      date: "9-9-2022",
    },
  ];

  const navigate = useNavigate();

  type PatientDataType = {
    chiname: string;
    engname: string;
    birthday: Date;
    sex: string;
    id: string;
    telephone: string;
    address: string;
    emergency: string;
    emergencynumber: string;
  };

  const defaultPatientData: PatientDataType = {
    chiname: "",
    engname: "",
    birthday: new Date(),
    sex: "男",
    id: "",
    telephone: "",
    address: "",
    emergency: "",
    emergencynumber: "",
  };

  const [newPatient, setNewPatient] =
    useState<PatientDataType>(defaultPatientData);
  const [genderOpenMenu, setGenderOpenMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const getCurrentDate = () => {
    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so we add 1
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const addNewPatientHandler = async () => {
    await fetch("http://localhost:8000/addnewpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        navigate("/scheduleappointment");
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
    }
  }, [navigate]);

  return (
    <div className="relative">
      <div className="h-screen overflow-y-auto">
        {/* Header */}
        <Header title="New Patient" />
        {/* Patient Record */}
        <div
          className="w-full px-3 pt-2 pb-[140px] text-[13px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="text-right">{getCurrentDate()}</div>
          <div className="px-4 py-2 text-black text-opacity-60">
            {/* Chinese Full Name */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              中文姓名
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.chiname}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    chiname: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* English Full Name */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              英文姓名
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.engname}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    engname: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* Birthday & Gender */}
            <div className="flex">
              <div className="w-1/2 pr-1">
                <div
                  className="p-2 font-semibold"
                  style={{ color: Theme.COLOR_DEFAULT }}
                >
                  出生日期
                </div>
                <div>
                  {/* Date Selection Field */}
                  <div className="w-full text-xs text-[#0C2036] font-bold justify-center">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => {
                        setSelectedDate(date);
                        setNewPatient((prevPatient: any) => ({
                          ...prevPatient,
                          birthday: date,
                        }));
                      }}
                      dateFormat="MM-dd-yyyy"
                      className="dp40vw h-[50px] rounded-[10px] border border-[#25617B] flex text-center text-black text-opacity-60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-1">
                <div
                  className="p-2 font-semibold"
                  style={{ color: Theme.COLOR_DEFAULT }}
                >
                  性別
                </div>
                <div className="relative">
                  <input
                    className={
                      "w-full focus:outline-none border border-[#25617B] text-xs p-4 pr-8 " +
                      (genderOpenMenu
                        ? "rounded-tl-[10px] rounded-tr-[10px]"
                        : "rounded-[10px]")
                    }
                    value={newPatient.sex}
                    readOnly
                    // onChange={(ev) => {
                    //   setNewPatient((prevPatient: any) => ({
                    //     ...prevPatient,
                    //     sex: ev.target.value,
                    //   }));
                    // }}
                  />
                  {genderOpenMenu ? (
                    <div className="absolute w-full">
                      <div
                        className="w-full z-10 text-xs text-center p-4 border border-[#25617B] bg-[#F5F5F5] hover:bg-[#D6E6F4]"
                        onClick={() => {
                          setNewPatient((prevPatient: any) => ({
                            ...prevPatient,
                            sex: "男",
                          }));
                          setGenderOpenMenu(false);
                        }}
                      >
                        男
                      </div>
                      <div
                        className="w-full z-10 text-xs text-center p-4 border-l border-r border-b border-[#25617B] rounded-bl-[10px] rounded-br-[10px] bg-[#F5F5F5] hover:bg-[#D6E6F4]"
                        onClick={() => {
                          setNewPatient((prevPatient: any) => ({
                            ...prevPatient,
                            sex: "女",
                          }));
                          setGenderOpenMenu(false);
                        }}
                      >
                        女
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="absolute right-3 top-5"
                    onClick={() => setGenderOpenMenu(!genderOpenMenu)}
                  >
                    <img src={downIcon} className="max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            {/* Unique, ID number */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              身份證號碼
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.id}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    id: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* Telephone number */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              電話號碼
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.telephone}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    telephone: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* Home Address */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              地址
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.address}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    address: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* Separate */}
            <div className="px-6 pt-10 pb-8">
              <div className="w-full border-b border-b-[#64B3EC]"></div>
            </div>
            {/* Emergency Contact Person */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              緊急聯絡人
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.emergency}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    emergency: ev.target.value,
                  }));
                }}
              />
            </div>
            {/* Emergency Contact Number */}
            <div
              className="p-2 font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              緊急聯絡人電話
            </div>
            <div>
              <input
                className="w-full focus:outline-none h-[50px] border border-[#25617B] rounded-[10px] text-xs p-2 pr-8"
                value={newPatient.emergencynumber}
                onChange={(ev) => {
                  setNewPatient((prevPatient: any) => ({
                    ...prevPatient,
                    emergencynumber: ev.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Asset Tools Information */}
      <div className="absolute w-full bottom-[80px] px-3">
        <div className="w-full text-sm text-center pl-3 flex flex-row">
          <div
            className="grow rounded-lg bg-[#D3E7F6] p-3 text-[#64B3EC]"
            onClick={() => navigate(-1)}
          >
            Cancel
          </div>
          <div
            className="grow rounded-lg bg-[#64B3EC] p-3 text-white ml-4"
            onClick={() => addNewPatientHandler()}
          >
            Confirm
          </div>
        </div>
      </div>
      {/* NavBar */}
      <NavBar status={2} />
    </div>
  );
};

export default AddAppointmentPatient;

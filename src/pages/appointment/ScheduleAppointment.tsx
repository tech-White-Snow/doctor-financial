import { FC, useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

import Theme from "../../assets/color";

import Avatar1 from "../../assets/avatar1.svg";
import DashBack from "../../assets/img/alert_board.png";
import searchIcon from "../../assets/icons/search_ico.svg";
import checkIcon from "../../assets/icons/check_ico.svg";
import downIcon from "../../assets/icons/down_ico.svg";

import NavBar from "../../components/NavBar";
import Header from "../../components/Header";
import PatientThumbnail from "../../components/patient/PatientThumbnail";

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = location.state.context;

  console.log("context --> ", context);

  const [recordStatus, setRecordStatus] = useState<boolean[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    setRecordStatus(Array(recordStatus.length).fill(false));
  }, []);

  // Hook for User Authentication
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      // Redirect to login page if token is not present
      navigate("/");
    }
  }, [navigate]);

  const setRecordStatusAtIndex = (id: number) => {
    const newRecordStatus = [...recordStatus];
    newRecordStatus.map((idx, kkk) => {
      newRecordStatus[kkk] = false;
    });
    newRecordStatus[id] = true;
    setRecordStatus(newRecordStatus);
  };

  const getCurrentDate = () => {
    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so we add 1
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addNewAppointmentHandler = async () => {
    console.log("date -> ", formatDate(selectedDate));
    console.log("time -> ", selectedTime);

    // get patient card information
    const token = localStorage.getItem("authToken");
    if (!token) return;
    const _user = JSON.parse(token).user;

    const doctorID = _user.doctorid;
    const doctorName = _user.username;
    const patientID = context[0].id;
    const dateTime = formatDate(selectedDate) + " " + selectedTime;

    // add new appointment to backend database
    const data = { doctorName, doctorID, patientID, dateTime };
    await fetch("http://localhost:8000/addnewappointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Add New Appointment succeed!");
        navigate("/patient");
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
        <Header title="Add Appointment" />
        {/* Patient Record */}
        <div
          className="w-full px-3 pt-2 pb-8 text-[13px]"
          style={{ color: Theme.COLOR_DEFAULT }}
        >
          <div className="text-right">{getCurrentDate()}</div>
          <div className="px-4 py-2">
            <div className="py-2 border-b border-b-[#B6DBF5] mb-2">
              <div className="">病人紀錄</div>
            </div>
            {context.map((idx: any, kkk: any) => (
              <div
                className="px-3 py-1 flex justify-between"
                key={idx.name + idx.telephone + kkk}
              >
                <div className="flex flex-row">
                  <div
                    className="relative w-[18px] h-[18px] rounded border border-[#64B3EC] p-[1px]"
                    onClick={() => setRecordStatusAtIndex(kkk)}
                  >
                    {recordStatus[kkk] ? (
                      <div className="w-full h-full rounded bg-[#64B3EC]"></div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="px-2">{idx.name}</div>
                  <div>{idx.telephone}</div>
                </div>
                <div
                  className="border-b border-[#B6DBF5]"
                  onClick={() =>
                    navigate("/pastpatientrecord", {
                      state: {
                        name: "張小梅",
                        newdiease: true,
                        telephone: "A12345678(9)",
                        age: 38,
                        sex: 1,
                        doctor: "張大玉",
                        date: "9-9-2022",
                      },
                    })
                  }
                >
                  view
                </div>
              </div>
            ))}
            <div className="py-2 border-b border-b-[#B6DBF5]"></div>
          </div>
        </div>
        {/* Scheduling the appointment date */}
        <div className="px-7 pt-4 mb-[160px]">
          <div>
            <div
              className="text-base font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              預約到診日期
            </div>
            <div className="relative rounded-lg border border-[#25617B] mt-2">
              <div className="text-xs">
                {/* <input
                  className="w-full h-full rounded-lg py-3 px-2"
                  placeholder="DD/MM/YYYY"
                /> */}
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  dateFormat="MM-dd-yyyy"
                  className="px-3 py-2 rounded-md border-gray-300 focus:outline-none dp80vw"
                />
              </div>
              {/* <div className="absolute top-4 right-2">
                <img src={downIcon} className="max-w-none" />
              </div> */}
            </div>
          </div>
          <div className="pt-2">
            <div
              className="text-base font-semibold"
              style={{ color: Theme.COLOR_DEFAULT }}
            >
              預約到診時間
            </div>
            <div className="relative rounded-lg border border-[#25617B] mt-2">
              <div className="text-xs">
                {/* <input
                  className="w-full h-full rounded-lg py-3 px-2"
                  placeholder="HH : MM"
                /> */}
                <TimePicker
                  defaultValue={moment()}
                  showSecond={false}
                  className="px-1"
                  onChange={(value) =>
                    setSelectedTime(value && value.format("HH:mm"))
                  }
                />
              </div>
              {/* <div className="absolute top-4 right-2">
                <img src={downIcon} className="max-w-none" />
              </div> */}
            </div>
          </div>
        </div>
        {/* Appointment Asset Tools Information */}
        <div className="absolute w-full bottom-[80px] px-3">
          <div className="w-full text-sm text-center flex flex-row">
            <div
              className="grow rounded-lg bg-[#D3E7F6] p-3 text-[#64B3EC] mr-1"
              onClick={() => navigate("/home")}
            >
              Cancel
            </div>
            <div
              className="grow rounded-lg bg-[#64B3EC] p-3 text-white ml-1"
              onClick={() => addNewAppointmentHandler()}
            >
              Confirm
            </div>
          </div>
        </div>
        {/* NavBar */}
        <NavBar status={2} />
      </div>
    </div>
  );
};

export default ScheduleAppointment;
